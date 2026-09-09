# Mock 5: 949/1000 — 73/77, every domain ≥93%. Exam-ready; residual habits only

Fifth full sitting (OlivierAlter open set, 77 items, 2026-09-08 evening): **949/1000, 73/77.**
Trajectory: 638 → 732 → 883 → 949. D5 (the Mock 1 disaster domain) is now 100%.

| Domain | M1 | M2 | M3 | M5 |
|---|---|---|---|---|
| D1 | 57% | 56% | 94% | 95% |
| D2 | 36% | 91% | 91% | 93% |
| D3 | 83% | 75% | 100% | 94% |
| D4 | 92% | 75% | 83% | 94% |
| D5 | 45% | 78% | 67% | **100%** |

**Four misses — two are the recurring habits, two are new-but-minor:**
- Q5 (TS 1.2, = official sample 7): report covers only visual arts; coordinator logs show three visual-arts
  subtasks. He blamed the *search agent's queries*. Root cause is coordinator decomposition; subagents
  executed correctly within scope. Covered in L02 and the M2 debrief — a regression on blame-assignment:
  he still reaches for the *downstream* component when the evidence names the *upstream* one.
- Q36 (TS 3.1): chose an invented `projects:` frontmatter key for `.claude/rules/`. The elaborate/
  invented-mechanism reflex (M2) — still alive when the option sounds like plausible config syntax.
- Q32 (TS 2.5): multi-step tracing (Grep for import pattern → Read to follow) — picked a plausible but
  less efficient sequence. Minor.
- Q60 (TS 4.4): chose "compute calculated_total in post-processing" over having the model emit
  calculated_total alongside stated_total. Subtle: the blueprint's point is *self-correction in the
  model's own output* so the discrepancy is visible to the model on retry, not just to code afterwards.

**Standing traps to name on exam day:** invented config keys/flags (parallel:true, projects:, --batch,
CLAUDE_HEADLESS); blame the component the evidence names (usually the coordinator's decomposition, not
the subagent); Task not Agent; Edit doctrine not sed; -p not stdin; friction is information.

**Decision:** ready to book Pearson VUE. Remaining mocks from the certification-preparation folder are
optional volume — choose by weak-TS density (1.2, 3.1, 2.5, 4.4 + historical 5.5/5.2/1.7/5.6/4.1/4.5)
and low overlap with material already seen.
