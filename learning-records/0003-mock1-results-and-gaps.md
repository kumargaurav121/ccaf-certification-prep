# Mock 1: 638/1000 (not passed). D4/D3 strong; TS 5.5 and the Edit cluster are the gaps

First full 60-question practice exam (claudecertificationguide.com, 2026-09-07):
**638/1000, 38/60 — below the 720 cut.**

| Domain | Score | Verdict |
|---|---|---|
| D4 Prompt Engineering | 11/12 (92%) | Strong — lessons are landing |
| D3 Claude Code | 10/12 (83%) | Strong — daily use + L08–L10 |
| D1 Agentic Architecture | 8/14 (57%) | Shaky — 6 wrong, spread across 1.2/1.3/1.5×2/1.6×2 |
| D5 Context & Reliability | 5/11 (45%) | **Not yet taught** (L14–16 pending); 5 of 6 wrong are TS 5.5 |
| D2 Tool Design & MCP | 4/11 (36%) | **Worst — despite L05–L07 being completed** |

**Cluster 1 — TS 5.5 human-review calibration (5 wrong: Q20, 26, 34, 42, 51).**
Whole mental model missing (planned for L16, not yet taught). Evidence of specific
misconceptions: picked *self-reported confidence* as a review router (Q20 — the unreliable-proxy
trap, previously taught in D4 context but not transferred); picked *"always human review
everything"* (Q26) and *"expand the review team"* (Q34) — over-conservative options that ignore
routing/calibration; missed that calibration is only valid for distributions represented in the
labelled set (Q51, novel format).

**Cluster 2 — TS 2.5 built-in tools / Edit (3 wrong: Q22, 25, 40).**
Root cause is NOT missing knowledge of the fallback — it's **daily-driver instinct overriding
the exam's documented answer: he picked Bash+sed twice**. Exam doctrine: same-file rename →
Edit with `replace_all`; non-unique match → Read + Write fallback; sed is always a distractor.
Same "product habit vs exam answer" hazard as Task/Agent naming.

**Scattered D1/D2 singles** (one each): 1.2 context-passing, 1.3 goal-oriented prompts,
1.5 hooks-vs-prompts ×2, 1.6 adaptive decomposition ×2, 2.1 system-prompt interference,
2.3 role-scoping + tool_choice, 2.4 config scope. These were taught; retention is partial —
needs re-drill, not re-teaching.

**Implications:**
- Re-plan Domain 5: teach TS 5.5 FIRST (pulled forward from L16), heavily visual.
- Build a repair drill for the D1/D2 misses (re-test the same task statements with fresh stems).
- Weight remaining study: TS 5.5 > Edit doctrine > D1 hooks/decomposition > rest.
- Math check: fixing TS 5.5 alone (+5 questions ≈ +68pts) and the Edit cluster (+3 ≈ +49pts)
  would have put this attempt at ~755 — passing. The gap is concentrated, which is good news.

**Evidence:** `Practice Exam | Claude Certification Guide.pdf` (Downloads), parsed 2026-09-07.
Supersedes nothing; confirms [[0001-prior-knowledge-and-exam-target]]'s Domain-3-is-strong claim.
