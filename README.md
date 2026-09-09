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
