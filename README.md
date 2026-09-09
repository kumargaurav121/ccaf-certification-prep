# CCAR-F Certification Prep — Claude Certified Architect (Foundations)

<p align="center">
  <b>Built and maintained by Kumar Gaurav</b><br>
  <a href="https://www.instagram.com/kgtechtalks/">📸 @kgtechtalks on Instagram</a> ·
  <a href="https://github.com/kumargaurav121">GitHub</a>
</p>

> **What this repo is:** my complete preparation kit for Anthropic's **Claude Certified Architect – Foundations**
> exam (code `CCAR-F`). It contains **all 16 lessons** covering the 30 official task statements across the five
> exam domains, **timed full-length mock exams** with exam-accurate scoring, remediation drills built from my
> real mock results, and quick-reference sheets. Everything is static HTML — open `index.html` and start.

## How to run

Everything is static HTML — no build step, no dependencies, nothing to install.

```bash
# 1. Clone
git clone https://github.com/kumargaurav121/ccaf-certification-prep.git
cd ccaf-certification-prep

# 2. Open the course home in your browser
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# 3. (Optional) serve it locally if your browser blocks file:// pages
python3 -m http.server 8000     # then visit http://localhost:8000
```

From `index.html` you can reach every lesson, the mock-exam table, the drills and the reference sheets.
Quiz and mock scores are saved in your browser's local storage only — nothing leaves your machine.
Mocks 3 and 5 depend on third-party question files that are deliberately not in this repo (see below),
so those two pages won't load from a fresh clone; every other mock works out of the box.

## How this course was built — the method

I built this entire course **with Claude Code as my tutor**, in a tight loop that I repeated until my
mock scores were consistently above 900. Nothing here came from a pre-made course; every lesson and mock
was generated for me, from the official exam guide, in response to where I was actually weak.

```
  ┌──────────────────────────────────────────────────────────────────────┐
  │  1. LESSONS      Claude Code taught each official task statement,     │
  │                  mechanism first, grounded in the exam guide + docs.  │
  │        ↓                                                              │
  │  2. MOCK EXAM    A full 60-item timed mock at exam weighting.         │
  │        ↓                                                              │
  │  3. GAP ANALYSIS I handed the results back. Claude Code found the     │
  │     + TEACHING   patterns behind my misses — not just "wrong answer"  │
  │                  but the habit causing it — and taught those parts    │
  │                  again, visually, with real examples.                 │
  │        ↓                                                              │
  │  4. REPEAT       Another mock. Another debrief. Until 900+.           │
  └──────────────────────────────────────────────────────────────────────┘
```

**The score trajectory that came out of it:**

| Sitting | Score | What the debrief found |
|---|---|---|
| Mock 1 | 638 ✗ | Two whole topics untaught; reaching for shell habits (`sed`) over exam doctrine |
| Mock 2 | 732 ✓ | Choosing invented, fancier-sounding mechanisms over the simple correct one |
| Mock 3 | 883 ✓ | The "smoothing reflex" — avoiding inconvenient signals instead of honouring them |
| Mock 5 | **949 ✓** | Every domain ≥ 93% |

Each debrief in `drills/` is the written record of one of those loops. The `learning-records/` folder is the
evidence trail — what was actually demonstrated, not just what was covered.

**Why it worked:** the loop optimises for *storage strength* (can you retrieve it cold, under time pressure)
rather than *fluency* (does it feel familiar while reading). Mocks are the measurement; lessons are the
intervention; the debrief is what connects them.

## Using Claude Code with this repo

This repo was built *with* Claude Code, and it works best when you keep using it that way. Open a
terminal in the repo folder and start Claude Code. The repo ships a **`CLAUDE.md`** that Claude Code reads
automatically — it tells it to act as your tutor, where everything lives, the source-of-truth rules, the
exact data formats for mocks and quizzes, and the validation commands to run after generating anything.
The workspace files (`MISSION.md`, `NOTES.md`, `learning-records/`) add the learner context.

```bash
cd ccaf-certification-prep
claude
```

Then ask for what you need. Prompts that work well:

**Understand a concept you're stuck on**
> Read `lessons/0002-coordinator-and-subagents.html`. I don't understand why a subagent can't see the
> coordinator's earlier findings. Explain it to me in plain terms with a real example, then give me three
> fresh exam-style questions on it.

**Debrief a mock you just took**
> Here is my results PDF from Mock 4: `~/Downloads/Mock Exam 4 — CCAR-F.pdf`. Analyse which task
> statements I missed, find the pattern behind the misses, and teach me those parts visually with examples.

**Generate a new mock exam**
> Create Mock 7 in `mocks/`. 60 questions, official domain weighting (16/11/12/12/9), four scenarios,
> some multiple-response items, fresh contexts I haven't seen. Weight it toward the task statements in my
> `learning-records/` that I keep missing. Use the same data format as `mocks/mock4-data.js` so it runs in
> `assets/exam-runner.js`, add a `mocks/mock7.html` page, and link it from `index.html`.

**Build a targeted drill**
> Make me a 10-question drill on TS 5.5 and TS 1.7 only, in the format used by `drills/mock1-repair.html`,
> with a short visual explainer above the quiz.

**Convert someone else's question set**
> Here's a practice-question PDF/markdown. Parse it into the mock runner format, tag each question with its
> domain and task statement, validate the answer keys, and check it doesn't duplicate questions already in
> `mocks/`.

### The data format Claude Code should produce

Mocks are plain JS files the runner loads; a question looks like this:

```js
{ scen: 0,            // index into the scenarios array (shows a banner when it changes)
  d: 1,               // exam domain 1–5 (drives weighted scoring)
  ts: '1.3',          // task statement from the official blueprint
  ans: [2],           // correct option index(es); length > 1 = multiple-response
  stem: 'Question text…',
  opts: ['A…', 'B…', 'C…', 'D…'],
  why:  'Rationale shown in the review.' }
```

Lesson and drill quizzes use `assets/quiz.js` with a similar shape (`options`, `answer`, `why`, `trap`).
Point Claude Code at an existing file and it will match the format.

### Ground rules that made this work

- **Ask it to teach the mechanism, not the answer.** "Explain how `stop_reason` drives the loop" beats
  "which option is right". The exam tests judgement; you can't judge a tradeoff you don't understand.
- **Always feed it your results.** The debriefs in `drills/` exist because I handed every mock's PDF back
  and asked *why* I missed things. That loop — lesson → mock → analysis → re-teach — is the whole method.
- **Ask for visuals and real examples** when something feels abstract. Every lesson here has inline
  diagrams for that reason.
- **Make it verify.** Ask it to check answer keys, domain counts and link integrity after generating
  anything — it caught several of its own parse errors in this repo that way.
- **Ground in the official Exam Guide.** It's linked in `RESOURCES.md`; the 30 task statements in
  `reference/00-exam-blueprint.html` are what every question should map to.

## Layout

| Path | What |
|---|---|
| `index.html` | Course home — plan, progress, links to everything |
| `lessons/` | 16 lessons, one per topic cluster, each ending in a retrieval quiz |
| `drills/` | Repair drills and debriefs generated from mock-exam results |
| `mocks/` | Timed 60-item mock exams (`mockN.html` + `mockN-data.js`) |
| `reference/` | Exam blueprint, API mechanics sheet, prep strategy |
| `assets/` | Shared stylesheet, quiz engine, exam runner, diagram styles |
| `learning-records/` | Evidence-based notes on what was learned and what still leaks |
| `MISSION.md` · `RESOURCES.md` · `GLOSSARY.md` · `NOTES.md` | Workspace grounding docs |

## Third-party material (intentionally not in this repo)

Three files are kept out of version control because they are other people's work:

- `mocks/mock3-data.js` — Matthew Purcell's independent Practice Question Set v2
- `mocks/mock5-data.js` — OlivierAlter's open practice set (github.com/OlivierAlter)
- `reference/exam-guide-v1.0.pdf` (+ `.txt`) — Anthropic's official Exam Guide;
  download it from the Anthropic Partner Academy link in `RESOURCES.md`

Mock 3 and Mock 5 pages therefore won't load from a fresh clone until those files are
regenerated locally. To include them anyway: `git add -f mocks/mock3-data.js mocks/mock5-data.js`.

## Scoring

Mocks score like the real exam: percent-correct per domain × official weight
(27 / 18 / 20 / 20 / 15), scaled to 1000, pass at **720**. Results persist in the browser only.

## Ownership & contributions

This is a personal study repository owned by **Kumar Gaurav** ([@kgtechtalks](https://www.instagram.com/kgtechtalks/)).
It is **read-only for everyone else**: only the owner can push. Feel free to fork it for your own preparation —
pull requests are not being accepted, but you are welcome to open an issue if you spot an error in a lesson.

---

<p align="center">
  Made with focus by <b>Kumar Gaurav</b> · <a href="https://www.instagram.com/kgtechtalks/">@kgtechtalks</a><br>
  <sub>Not affiliated with Anthropic. Not exam content.</sub>
</p>
