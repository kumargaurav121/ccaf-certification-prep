# Mock 3: 883/1000 — PASSED with margin. D1 fixed (94%). Remaining pattern: the "smoothing reflex" in D5

Third full mock (Purcell independent v2 set via the workspace runner, 2026-09-08): **883/1000,
53/60.** Trajectory 638 → 732 → 883.

| Domain | Mock 1 | Mock 2 | Mock 3 | Note |
|---|---|---|---|---|
| D1 Agentic | 57% | 56% | **94%** | Mock 2 debrief (freelancer/sealed-brief model) worked |
| D2 Tool/MCP | 36% | 91% | 91% | holding |
| D3 Claude Code | 83% | 75% | **100%** | |
| D4 Prompt | 92% | 75% | 83% | 2 misses, both known patterns |
| D5 Context | 45% | 78% | **67%** | 3 misses — now the weakest domain |

**Unifying pattern across 5 of 7 misses — the "smoothing reflex".** When the stem presents an
inconvenient signal, he picks the option that keeps things running smoothly / stays helpful,
where the exam wants the signal honoured:
- Q9 (5.2): customer says "speak to a human, do not try to fix this" → he chose "gather order
  details first for a complete handoff". Explicit request is door #1 and *unconditional* — even
  investigating "for the handoff" overrides it. (Mock 2 he over-escalated on sentiment; now he
  under-escalates on an explicit demand. Root: treating escalation as a judgement about the
  *issue* instead of a response to the *signal type*.)
- Q30 (5.3): chose "return empty results marked success so downstream degrades gracefully" —
  the silent-suppression anti-pattern, seduced by "degrade gracefully". Missed local-recovery +
  propagate-with-partials.
- Q29 (5.6): chose "rank sources by credibility, report only the higher" — silent selection with a
  veneer. Missed "require dates in structured outputs" (conflicts often = different moments).
- Q46 (4.1): chose "keep the 70%-FP category live + banner asking patience" over "temporarily
  disable it". Third time this exact move has felt wrong to him (L12 quiz, Mock 1 adjacent).
  Turning a feature off feels like giving up; the exam values trust over coverage.
- Q18 (1.7): chose "resume + re-read changed files incrementally" when "most tool results now
  describe code that no longer exists". Magnitude judgement: minor known drift → resume + name
  files; substantial staleness → fresh + summary. He applied the middle path to the extreme case.

**Two pure fact gaps:**
- Q49 (4.5): believed the Batch API supports multi-turn tool calling within a request. It does
  not (explicit in the blueprint). Also missed "blocking stays synchronous" as a second pick.
- Q58 (2.2): chose "structured JSON error field inside the result text" over "set isError".
  Half-right L06 lesson applied at the wrong layer: the *payload* should be structured AND the
  *envelope* must carry isError:true. Without the flag it still arrives as a successful result.

**Verdict: exam-ready.** 883 is ~160 above cut with every domain ≥67%. Remaining work is one
visual debrief on the smoothing reflex + the two facts, then book Pearson VUE.

Deliverable: `drills/mock3-debrief.html`. Evidence: "Mock Exam 3 — CCAR-F.pdf" (Downloads).
