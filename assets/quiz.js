/* ============================================================
   CCAR-F Study Workspace — reusable quiz engine
   Pairs with assets/quiz.css.

   USAGE in a lesson:
     <div id="quiz" class="quiz"></div>
     <script src="../assets/quiz.js"></script>
     <script>
       CCAR.quiz('#quiz', {
         id: 'L01',                       // stable id — used for localStorage history
         title: 'Retrieval check',
         passMark: 0.72,                  // exam cut score is 720/1000
         questions: [
           {
             scenario: 'Optional scenario text framing the next run of questions.',
             ts: 'TS 1.1',                // blueprint task statement
             stem: 'Question text?',
             options: ['A text','B text','C text','D text'],
             answer: 0,                   // index, or [0,2] for multi-response
             why: 'Why the key is right.',
             trap: 'Why the attractive distractor is wrong.'
           }
         ]
       });
     </script>

   Notes:
   - `answer` as an array renders checkboxes and states "Select N."
   - Scores persist to localStorage under `ccarf.<id>` so a later review page
     can schedule spaced repetition. Nothing leaves the machine.
   ============================================================ */

(function (global) {
  'use strict';

  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  var STORE = 'ccarf.';

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function asArray(v) { return Array.isArray(v) ? v.slice() : [v]; }

  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    var x = a.slice().sort(), y = b.slice().sort();
    return x.every(function (v, i) { return v === y[i]; });
  }

  /* Fisher-Yates. Used on retry so position isn't what gets memorised. */
  function shuffled(n, seedless) {
    var idx = [];
    for (var i = 0; i < n; i++) idx.push(i);
    if (seedless === false) return idx;
    for (var j = n - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var t = idx[j]; idx[j] = idx[k]; idx[k] = t;
    }
    return idx;
  }

  function saveAttempt(id, pct, total) {
    if (!id) return;
    try {
      var key = STORE + id;
      var hist = JSON.parse(localStorage.getItem(key) || '[]');
      hist.push({ at: new Date().toISOString(), pct: pct, n: total });
      localStorage.setItem(key, JSON.stringify(hist.slice(-20)));
    } catch (e) { /* private mode — scores just don't persist */ }
  }

  function priorAttempts(id) {
    if (!id) return [];
    try { return JSON.parse(localStorage.getItem(STORE + id) || '[]'); }
    catch (e) { return []; }
  }

  function quiz(mount, cfg) {
    var root = typeof mount === 'string' ? document.querySelector(mount) : mount;
    if (!root) return;

    var qs = cfg.questions || [];
    var passMark = cfg.passMark == null ? 0.72 : cfg.passMark;
    var shuffle = cfg.shuffle !== false;
    var state = [];            // per-question: {order, answered, graded}
    var graded = false;

    /* Shuffle from the very first render: lesson configs tend to list the key first,
       and an unshuffled first pass would make every answer "A". */
    render(true);

    function render(doShuffle) {
      root.innerHTML = '';
      state = [];

      /* --- header --- */
      var head = el('div', 'quiz-head');
      head.appendChild(el('h2', null, cfg.title || 'Retrieval check'));
      var prior = priorAttempts(cfg.id);
      var scoreLine = qs.length + ' items · pass ' + Math.round(passMark * 100) + '%';
      if (prior.length) {
        var last = prior[prior.length - 1];
        scoreLine += ' · last attempt ' + Math.round(last.pct * 100) + '%';
      }
      head.appendChild(el('span', 'quiz-score', scoreLine));
      root.appendChild(head);

      /* --- questions --- */
      qs.forEach(function (q, qi) {
        if (q.scenario) {
          var sc = el('div', 'scenario');
          sc.appendChild(el('span', 'scen-label', q.scenarioLabel || 'Scenario'));
          sc.appendChild(el('p', null, q.scenario));
          root.appendChild(sc);
        }

        var keys = asArray(q.answer);
        var multi = keys.length > 1;
        var order = shuffled(q.options.length, doShuffle && shuffle);

        var box = el('div', 'q');
        box.dataset.qi = qi;

        var num = el('div', 'q-num');
        num.appendChild(el('span', null, 'Question ' + (qi + 1)));
        if (q.ts) num.appendChild(el('span', 'ts', q.ts));
        if (multi) num.appendChild(el('span', null, '· select ' + keys.length));
        box.appendChild(num);

        box.appendChild(el('p', 'q-stem', q.stem));

        var list = el('ul', 'opts');
        order.forEach(function (origIdx, pos) {
          var li = el('li', 'opt');
          li.dataset.orig = origIdx;

          var input = document.createElement('input');
          input.type = multi ? 'checkbox' : 'radio';
          input.name = 'q' + qi;
          input.value = origIdx;

          li.appendChild(input);
          li.appendChild(el('span', 'letter', LETTERS[pos] + '.'));
          li.appendChild(el('span', 'opt-text', q.options[origIdx]));

          li.addEventListener('click', function (ev) {
            if (graded) return;
            if (ev.target !== input) { input.checked = multi ? !input.checked : true; }
          });
          list.appendChild(li);
        });
        box.appendChild(list);

        var why = el('div', 'why');
        why.appendChild(el('span', 'why-label', 'Rationale'));
        why.appendChild(el('p', null, q.why || ''));
        if (q.trap) {
          why.appendChild(el('p', 'trap', '<b>Why the tempting wrong answer is wrong:</b> ' + q.trap));
        }
        box.appendChild(why);

        root.appendChild(box);
        state.push({ box: box, keys: keys, multi: multi });
      });

      /* --- actions --- */
      var actions = el('div', 'quiz-actions');
      var gradeBtn = el('button', 'btn', 'Grade');
      var againBtn = el('button', 'btn ghost', 'Try again');
      actions.appendChild(gradeBtn);
      actions.appendChild(againBtn);
      root.appendChild(actions);

      var result = el('div', 'result');
      root.appendChild(result);

      gradeBtn.addEventListener('click', function () {
        if (graded) return;
        grade(result, gradeBtn);
      });
      againBtn.addEventListener('click', function () {
        graded = false;
        render(true);
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    function grade(result, gradeBtn) {
      var correct = 0;

      state.forEach(function (s) {
        var chosen = [];
        s.box.querySelectorAll('input').forEach(function (inp) {
          if (inp.checked) chosen.push(parseInt(inp.value, 10));
        });

        var ok = sameSet(chosen, s.keys);
        if (ok) correct++;

        s.box.classList.add('graded', ok ? 'right' : 'wrong');
        s.box.querySelectorAll('.opt').forEach(function (li) {
          var orig = parseInt(li.dataset.orig, 10);
          var isKey = s.keys.indexOf(orig) !== -1;
          var wasChosen = chosen.indexOf(orig) !== -1;
          if (isKey) li.classList.add('correct');
          else if (wasChosen) li.classList.add('chosen-wrong');
          li.querySelector('input').disabled = true;
        });
      });

      graded = true;
      gradeBtn.disabled = true;

      var pct = state.length ? correct / state.length : 0;
      var passed = pct >= passMark;
      saveAttempt(cfg.id, pct, state.length);

      result.className = 'result show ' + (passed ? 'pass' : 'fail');
      result.innerHTML =
        '<span class="r-score">' + correct + ' / ' + state.length +
        '  (' + Math.round(pct * 100) + '%)</span>' +
        '<p>' + (passed
          ? 'Above the 72% cut line. Read the rationales on anything you guessed — a lucky guess is not storage strength.'
          : 'Below the 720/1000 cut line. Read every rationale, then hit <b>Try again</b> — options are reshuffled so you cannot pattern-match on position.') +
        '</p>' +
        '<p style="margin-top:.6rem;font-size:.88rem">Ask your teacher about anything below that still feels arbitrary rather than principled.</p>';
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  global.CCAR = global.CCAR || {};
  global.CCAR.quiz = quiz;
  global.CCAR.history = priorAttempts;
})(window);
