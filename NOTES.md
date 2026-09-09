# Working Notes

## Learner profile
- **Kumar Gaurav**, Logiciel (kumargaurav@logiciel.io).
- Daily Claude Code user. Comfortable with CLAUDE.md, slash commands, plan mode.
- Self-reported gaps: Agent SDK internals, MCP authoring, API-level tool use.
- Workspace started **2026-08-10**.

## Delivery preferences (stated 2026-08-10)
- **Short lesson + quiz.** ~10–15 min per session. Not long deep-dives.
- Intensive: aiming to sit the exam in 2–3 weeks.
- Wants exam-realistic practice, not just concept explanation.

## Course correction (2026-08-10) — IMPORTANT

Kumar rejected the first curriculum. The original Lesson 01 taught *exam-answering strategy*
(how to eliminate distractors, how the examiners reason). His feedback: **"you should teach my
topics which are asked in the exam, the 5 topics which are official — instead you are teaching me
what is the correct answer. This is the wrong approach."**

He is right. Teach the **technology**, domain by domain, in the official order and weighting.
Answer-selection tactics are at most a footnote in the final mock, never a lesson.

**Rules that follow from this:**
- Every lesson is anchored to a domain and its task statements — never to a "meta-skill".
- Teach **mechanism first**: real field names, real enum values, real code, primary doc linked.
- Ground in **platform.claude.com / code.claude.com**, not parametric recall. Docs have moved
  (docs.claude.com now redirects to platform.claude.com and code.claude.com).
- Community consensus agrees with him: passers "spend less time memorising features and more
  time understanding tradeoffs" — but you cannot weigh a tradeoff you don't understand
  mechanically. Mechanism → tradeoff → judgement, in that order.

## Visual teaching preference (2026-09-07)
Kumar explicitly asked to be taught "visually everything" after Mock 1. He (or his tooling) also
retrofitted L07 with SVG diagrams, scope cards and flow rows — that's the bar. From now on every
lesson ships inline theme-aware SVG diagrams using `assets/diagram.css` (shared classes extracted
from the L07 style). Diagrams must colour via CSS vars only, so dark mode works.

## Mock 1 (2026-09-07): 638/1000 — see learning-records/0003
Priority queue after gap analysis: TS 5.5 (done, L14) → Edit doctrine + D1/D2 repair drill
(done, drills/mock1-repair.html) → L15 (5.1/5.4) → L16 (5.2/5.3) → Mock 2.
Recurring hazard to keep flagging: **daily-driver instinct vs exam doctrine** (sed vs Edit,
Agent vs Task, stdin tricks vs -p). Also: he over-corrects to "review everything" options —
teach that over-conservatism is a scored wrong answer, not a safe harbour.

## Mock inventory from certification-preparation (analysed 2026-09-08)
Ranked for porting into `mocks/` — one at a time, by (a) zero overlap with material already answered,
(b) density of his weak task statements (1.2, 3.1, 2.5, 4.4 + historical 5.5/5.2/1.7/5.6/4.1/4.5),
(c) blueprint-exact weighting.

| Source | Items | Overlap w/ seen | Weak-TS items | Status / note |
|---|---|---|---|---|
| cca-guide/mock-4 | 60 | 0 | 34 | **ported → Mock 6** |
| cca-guide/mock-2 | 60 | 0 | 31 | next candidate |
| cca-guide/mock-3 | 60 | 0 | n/a (label-style TS tags, single-answer) | after mock-2; map labels→codes if weak-density needed |
| cca-guide/mock-1 | 60 | **10 already seen** (same bank as claudecertificationguide.com, where he sat Mock 1) | 36 | last, or skip |
| cca-guide/drill-1..5 | 28–44 each | 4–9 seen each | varies | targeted volume only |
| cca-guide/bank.js | 239 | 43 seen | all TS 5–11 each | reservoir for a custom unseen weak-TS drill |
| claude-certified-architect/* | 60 ×4 + drills | not tagged by TS | — | **deprioritised**: 4-domain framing, no TS tags, sample key answer leans on vector stores (out of scope) |

Port mechanics: cca-guide format is {id, domain, taskStatement, questionType, stem, options:[{id,text,isCorrect,explanation}]};
map ans = isCorrect indices, why = correct explanation + "Why not the others" from incorrect explanations. Group banners by domain.

## Teaching decisions
- Domain 3 (Claude Code, 20%) gets **fewer** lessons — verify with drills first, teach only
  what the drills expose. Don't re-teach what he uses daily.
- Domains 1 (27%) + 2 (18%) get the most airtime: 45% of the exam and the stated gap.
- Every lesson quiz uses **exam-format items**: 4 options, one correct (or stated
  multi-response), plausible distractors, equal-length options where possible.
- Ground *everything* in the official Exam Guide task statements. Cite the task
  statement number (e.g. TS 1.4) on every claim so revision maps to the blueprint.

## Source-of-truth hierarchy
1. Official CCAR-F Exam Guide v1.0 (July 2026) — `reference/exam-guide-v1.0.pdf`. Authoritative.
2. Official Anthropic docs (docs.claude.com) — for mechanism detail.
3. Anthropic Academy free courses — for framing.
4. Community write-ups — for exam *feel* only, never for facts. Several contain errors
   (e.g. blogs that merge Domain 4 and 5, or give the wrong domain names).

## Cautions found during research
- The `claude-certified-architect/` folder in the source repo (`certification-preparation`)
  uses an **outdated 4-domain framing** that does not match the official blueprint. The
  `cca-guide/` folder's 5-domain framing **is** correct. Prefer `cca-guide/`, ignore the other.
- Two versions of the exam guide PDF circulate. v1.0 (July 2026, exam code CCAR-F) is current.

## Visual components (added 2026-08-14) — IMPORTANT

Kumar asked for Lesson 07 to be made "more visual," then confirmed: **use these visual
components going forward on all lessons**, not just L07. Applied to L07 as a scoped
inline `<style>` block (never edit `assets/lesson.css` directly for this — it's shared
across every lesson) plus new markup added alongside, not replacing, the existing
prose/tables.

**Components now in the toolkit — reach for the one that fits the content, not all of them
every time:**
- **Domain-progress stepper** — dots showing where this lesson sits among its domain's
  lessons (done / current / upcoming). Good for the top of every lesson.
- **Inline SVG diagrams** — for anything with a flow, fan-out, or sequence (e.g. discovery,
  request/response, a pipeline). Use `currentColor`/`var(--ink)` etc. so dark mode still
  works automatically; keep line-art simple, matching the Tufte-influenced aesthetic —
  no clip-art, no external icon libraries.
- **Icon-labeled cards** — for a small set of parallel options (e.g. scope levels, model
  tiers) that a lookup table also documents in full. Cards are the fast/visual read;
  keep the reference table too, don't delete it.
- **Compact decision-flow rows** (question → arrow → tool/answer) — for "given X, pick Y"
  selection logic, as a quick-glance companion above the detailed table.
- **Checklist callouts** — for "domain complete" / milestone summaries, ticks instead of
  a plain sentence.

**Rule going forward:** every new lesson should get at least one of these where the
content genuinely calls for it (a flow, a small parallel set, or a selection rule) —
don't force all five onto material that's linear prose. Keep every addition scoped to
that lesson's own `<style>` block; the shared `lesson.css` stays a plain, stable base
for every lesson.

## Open items
- [ ] Book the Pearson VUE slot — needed to fix the revision schedule.
- [ ] Take Anthropic's own practice test (linked from the Skilljar cert page) as a baseline.
- [x] Git repo initialised and pushed 2026-09-09 → https://github.com/kumargaurav121/ccaf-certification-prep (PUBLIC).
      Third-party files (mock3/mock5 data, exam-guide PDF/txt) are .gitignored — they exist only in commit 1 history.
