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

**Start here:** open `index.html` in a browser (no build step, no dependencies).

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
