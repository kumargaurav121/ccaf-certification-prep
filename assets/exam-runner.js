/* ============================================================
   CCAR-F — timed mock exam runner
   Replicates the CCAR-F pattern: 60 items, 120 min, 4 scenarios,
   MC + multiple-response, scaled scoring (720/1000 cut),
   per-domain score report, full review with rationales.

   Usage:
     CCARExam.run('#mount', {
       id: 'MOCK2', title: 'Mock Exam 2', minutes: 120,
       weights: {1:.27, 2:.18, 3:.20, 4:.20, 5:.15},
       scenarios: [{name, blurb}, ...],
       questions: [{scen, d, ts, stem, opts, ans:[..], why}, ...]
     });
   ============================================================ */

(function (global) {
  'use strict';
  var LETTERS = 'ABCDEF';

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function shuffled(n) {
    var a = []; for (var i = 0; i < n; i++) a.push(i);
    for (var j = n - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var t = a[j]; a[j] = a[k]; a[k] = t;
    }
    return a;
  }
  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    var x = a.slice().sort(), y = b.slice().sort();
    return x.every(function (v, i) { return v === y[i]; });
  }
  function fmt(s) {
    var m = Math.floor(s / 60), ss = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (ss < 10 ? '0' : '') + ss;
  }

  function run(mount, cfg) {
    var root = typeof mount === 'string' ? document.querySelector(mount) : mount;
    var Q = cfg.questions;
    var N = Q.length;
    var state = {
      cur: 0, answers: [], flags: [], order: [],
      endAt: null, timerId: null, done: false
    };
    for (var i = 0; i < N; i++) {
      state.answers.push([]);
      state.flags.push(false);
      state.order.push(shuffled(Q[i].opts.length));
    }

    renderStart();

    /* ---------------- start screen ---------------- */
    function renderStart() {
      root.innerHTML = '';
      var box = el('div', 'rules');
      box.appendChild(el('h2', null, cfg.title));
      box.appendChild(el('ul', null,
        '<li><b>' + N + ' items · ' + cfg.minutes + ' minutes.</b> The timer starts when you begin and auto-submits at zero.</li>' +
        '<li><b>4 scenarios</b>, matching the official structure — each frames a block of questions.</li>' +
        '<li>Multiple-choice and multiple-response. <b>Multiple-response items state how many to select.</b></li>' +
        '<li>Flag questions to revisit; the palette shows answered / flagged.</li>' +
        '<li>Scored like the real exam: domain % × weight, scaled to 1000. <b>Pass: 720.</b></li>' +
        '<li>Closed book. No notes, no docs, no AI. Treat it as the real thing.</li>'));
      var b = el('button', 'btn', 'Begin exam');
      b.style.marginTop = '1rem';
      b.addEventListener('click', startExam);
      box.appendChild(b);
      root.appendChild(box);
    }

    function startExam() {
      state.endAt = Date.now() + cfg.minutes * 60 * 1000;
      state.timerId = setInterval(tick, 1000);
      renderQuestion();
    }

    function remaining() { return Math.max(0, Math.round((state.endAt - Date.now()) / 1000)); }

    function tick() {
      var r = remaining();
      var t = document.getElementById('exam-timer');
      if (t) {
        t.textContent = fmt(r);
        if (r <= 600) t.classList.add('low');
      }
      if (r <= 0) submit(true);
    }

    /* ---------------- question view ---------------- */
    function renderQuestion() {
      var qi = state.cur, q = Q[qi];
      root.innerHTML = '';

      var top = el('div', 'exam-top');
      top.appendChild(el('span', 'ttl', cfg.title));
      top.appendChild(el('span', 'progress-line',
        'Q' + (qi + 1) + ' / ' + N + ' · ' + state.answers.filter(function (a) { return a.length; }).length + ' answered'));
      var tm = el('span', 'timer', fmt(remaining()));
      tm.id = 'exam-timer';
      if (remaining() <= 600) tm.classList.add('low');
      top.appendChild(tm);
      root.appendChild(top);

      // scenario banner when it changes
      if (qi === 0 || Q[qi - 1].scen !== q.scen) {
        var sc = cfg.scenarios[q.scen];
        var ban = el('div', 'scen-banner');
        ban.appendChild(el('span', 'sn', 'Scenario · ' + sc.name));
        ban.appendChild(el('p', null, sc.blurb));
        root.appendChild(ban);
      }

      var box = el('div', 'exam-q');
      var head = el('div', 'q-head');
      head.appendChild(el('span', 'qnum', 'Question ' + (qi + 1)));
      head.appendChild(el('span', 'qmeta', 'Domain ' + q.d));
      if (q.ans.length > 1) head.appendChild(el('span', 'selectn', 'select ' + q.ans.length));
      var fb = el('button', 'flagbtn' + (state.flags[qi] ? ' on' : ''),
        state.flags[qi] ? '⚑ flagged' : '⚐ flag');
      fb.addEventListener('click', function () {
        state.flags[qi] = !state.flags[qi]; renderQuestion();
      });
      head.appendChild(fb);
      box.appendChild(head);

      box.appendChild(el('p', 'stem', q.stem));

      var list = el('ul', 'opts');
      var multi = q.ans.length > 1;
      state.order[qi].forEach(function (orig, pos) {
        var li = el('li', 'opt');
        var input = document.createElement('input');
        input.type = multi ? 'checkbox' : 'radio';
        input.name = 'exq';
        input.checked = state.answers[qi].indexOf(orig) !== -1;
        li.appendChild(input);
        li.appendChild(el('span', 'letter', LETTERS[pos] + '.'));
        li.appendChild(el('span', 'opt-text', q.opts[orig]));
        li.addEventListener('click', function (ev) {
          if (ev.target !== input) input.checked = multi ? !input.checked : true;
          if (multi) {
            var idx = state.answers[qi].indexOf(orig);
            if (input.checked && idx === -1) state.answers[qi].push(orig);
            if (!input.checked && idx !== -1) state.answers[qi].splice(idx, 1);
          } else {
            state.answers[qi] = [orig];
          }
          renderQuestion();
        });
        list.appendChild(li);
      });
      box.appendChild(list);
      root.appendChild(box);

      var nav = el('div', 'exam-nav');
      var prev = el('button', 'btn ghost', '← Previous');
      prev.disabled = qi === 0;
      prev.addEventListener('click', function () { state.cur--; renderQuestion(); });
      var next = el('button', 'btn ghost', 'Next →');
      next.disabled = qi === N - 1;
      next.addEventListener('click', function () { state.cur++; renderQuestion(); });
      var sub = el('button', 'btn', 'Submit exam');
      sub.addEventListener('click', function () {
        var un = state.answers.filter(function (a) { return !a.length; }).length;
        var msg = un ? un + ' questions are unanswered. Submit anyway?' : 'Submit and grade the exam?';
        if (confirm(msg)) submit(false);
      });
      nav.appendChild(prev); nav.appendChild(next);
      nav.appendChild(el('span', 'spacer'));
      nav.appendChild(sub);
      root.appendChild(nav);

      // palette
      var pal = el('div', 'palette');
      for (var p = 0; p < N; p++) {
        (function (p) {
          var c = el('button', 'pal-cell', p + 1);
          if (state.answers[p].length) c.classList.add('answered');
          if (state.flags[p]) c.classList.add('flagged');
          if (p === qi) c.classList.add('current');
          c.addEventListener('click', function () { state.cur = p; renderQuestion(); });
          pal.appendChild(c);
        })(p);
      }
      root.appendChild(pal);
      root.appendChild(el('div', 'pal-legend',
        '<span>■ green = answered</span><span>■ orange = flagged</span><span>outline = current</span>'));
      window.scrollTo(0, 0);
    }

    /* ---------------- scoring & review ---------------- */
    function submit(auto) {
      if (state.done) return;
      state.done = true;
      clearInterval(state.timerId);

      var per = {};
      Q.forEach(function (q, i) {
        per[q.d] = per[q.d] || { ok: 0, n: 0 };
        per[q.d].n++;
        if (sameSet(state.answers[i], q.ans)) per[q.d].ok++;
      });
      var score = 0, totW = 0;
      Object.keys(per).forEach(function (d) { totW += cfg.weights[d]; });
      Object.keys(per).forEach(function (d) {
        score += (per[d].ok / per[d].n) * (cfg.weights[d] / totW) * 1000;
      });
      score = Math.round(score);
      var correct = Q.reduce(function (s, q, i) { return s + (sameSet(state.answers[i], q.ans) ? 1 : 0); }, 0);
      var passed = score >= 720;

      try {
        var key = 'ccarf.' + cfg.id, hist = JSON.parse(localStorage.getItem(key) || '[]');
        hist.push({ at: new Date().toISOString(), score: score, correct: correct, n: N });
        localStorage.setItem(key, JSON.stringify(hist.slice(-10)));
      } catch (e) {}

      renderResults(score, correct, per, passed, auto);
    }

    function renderResults(score, correct, per, passed, auto) {
      root.innerHTML = '';
      root.appendChild(el('h2', null, 'Results' + (auto ? ' — time expired' : '')));

      var card = el('div', 'score-card ' + (passed ? 'pass' : 'fail'));
      card.appendChild(el('span', 'big', score + ' / 1000'));
      card.appendChild(el('span', 'verdict', passed ? 'PASSED' : 'NOT PASSED'));
      card.appendChild(el('span', 'sub', correct + ' of ' + N + ' correct (' +
        Math.round(100 * correct / N) + '%) · pass mark 720'));
      root.appendChild(card);

      root.appendChild(el('h3', null, 'Domain breakdown'));
      var names = { 1: 'Agentic Architecture & Orchestration', 2: 'Tool Design & MCP Integration',
        3: 'Claude Code Configuration & Workflows', 4: 'Prompt Engineering & Structured Output',
        5: 'Context Management & Reliability' };
      Object.keys(per).sort().forEach(function (d) {
        var pct = Math.round(100 * per[d].ok / per[d].n);
        var row = el('div', 'dom-row');
        row.appendChild(el('span', null, '<b>D' + d + '</b>'));
        row.appendChild(el('span', null, names[d]));
        var bw = el('div', 'bar-wrap');
        var bar = el('div', 'bar' + (pct < 72 ? ' weak' : ''));
        bar.style.width = pct + '%';
        bw.appendChild(bar);
        row.appendChild(bw);
        row.appendChild(el('span', 'pct', per[d].ok + '/' + per[d].n + ' (' + pct + '%)'));
        root.appendChild(row);
      });

      // review
      root.appendChild(el('h3', null, 'Question review'));
      var filters = el('div', 'rev-filters');
      var showAll = el('button', 'btn ghost', 'All');
      var showWrong = el('button', 'btn', 'Incorrect only');
      filters.appendChild(showWrong); filters.appendChild(showAll);
      root.appendChild(filters);
      var revBox = el('div');
      root.appendChild(revBox);

      function renderReview(onlyWrong) {
        revBox.innerHTML = '';
        Q.forEach(function (q, i) {
          var ok = sameSet(state.answers[i], q.ans);
          if (onlyWrong && ok) return;
          var box = el('div', 'q graded ' + (ok ? 'right' : 'wrong'));
          box.appendChild(el('div', 'q-num',
            '<span>Question ' + (i + 1) + '</span> <span class="ts">D' + q.d + ' · TS ' + q.ts + '</span> ' +
            '<span>' + (ok ? '✓ correct' : '✗ incorrect') + '</span>'));
          box.appendChild(el('p', 'q-stem', q.stem));
          var list = el('ul', 'opts');
          state.order[i].forEach(function (orig, pos) {
            var li = el('li', 'opt');
            if (q.ans.indexOf(orig) !== -1) li.classList.add('correct');
            else if (state.answers[i].indexOf(orig) !== -1) li.classList.add('chosen-wrong');
            li.appendChild(el('span', 'letter', LETTERS[pos] + '.'));
            li.appendChild(el('span', 'opt-text', q.opts[orig] +
              (state.answers[i].indexOf(orig) !== -1 ? ' <em>(your answer)</em>' : '')));
            list.appendChild(li);
          });
          box.appendChild(list);
          var why = el('div', 'why');
          why.style.display = 'block';
          why.appendChild(el('span', 'why-label', 'Rationale'));
          why.appendChild(el('p', null, q.why));
          box.appendChild(why);
          revBox.appendChild(box);
        });
        if (!revBox.children.length) revBox.appendChild(el('p', null, 'Nothing incorrect. Clean sweep.'));
      }
      showAll.addEventListener('click', function () { renderReview(false); });
      showWrong.addEventListener('click', function () { renderReview(true); });
      renderReview(true);
      window.scrollTo(0, 0);
    }
  }

  global.CCARExam = { run: run };
})(window);
