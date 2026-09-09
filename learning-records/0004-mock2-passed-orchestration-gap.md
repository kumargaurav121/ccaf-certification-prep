# Mock 2: 732/1000 — PASSED. Weak spot is D1 orchestration + the "elaborate-mechanism" trap

Second full mock (the workspace's own Mock 2, exam-accurate engine, 2026-09-07 evening):
**732/1000, 44/60 — above the 720 cut.** First pass. Up from Mock 1's 638.

| Domain | Mock 1 | Mock 2 | Trend |
|---|---|---|---|
| D2 Tool/MCP | 36% | 91% | ▲ fixed (repair drill worked) |
| D5 Context | 45% | 78% | ▲ fixed (L14 worked) |
| D3 Claude Code | 83% | 75% | ~ steady |
| D4 Prompt | 92% | 75% | ▼ slipped a little |
| **D1 Agentic** | 57% | **56%** | ✗ **unchanged — the real gap** |

**D1 is now the sole weak domain — 7 of 16 wrong**, concentrated in coordinator/subagent
orchestration (TS 1.2 ×2, 1.3 ×3) plus 1.6 and 1.7.

**Root cause is a habit, not absent knowledge.** On every D1 miss he chose the option naming a
*fancier or invented mechanism* over the simpler correct one:
- Q13: "a tools array blocks invocation" (invented) over "allowedTools missing Task" (real)
- Q14: "context filled and evicted the findings" (invented) over "coordinator never pasted them in"
- Q17: "set parallel:true on each AgentDefinition" (invented) over "emit all Task calls in one response"
- Q60: "direct messaging is not technically supported" (invented) over the three real reasons
- Q59: "sessions restore the old filesystem state" (the *exact inversion* L04/L15 warn about)
The same seduction shows up outside D1: Q21 chose "replay full transcript byte-for-byte" over
manifests; Q20 chose a "list_collections tool" over MCP resources; Q41 chose "force the most
common schema" over tool_choice "any".

**Two old reflexes also resurfaced** (both taught, both in the L14/repair material):
- Q4 (5.2): chose "escalate immediately — furious after 3 contacts" — the **sentiment-escalation**
  trap. Frustration + routine issue → resolve, not transfer.
- Q45 (4.5): chose "accept the 2 transient losses" — **abandoning recoverable work**.

**Genuine concept gaps to re-teach visually (his explicit request):**
1. The coordinator/subagent isolation model — subagents inherit NOTHING; the Task prompt string
   is the only channel. This one idea fixes Q13/14/16/17/60.
2. Fixed vs adaptive decomposition — known-in-advance aspects → prompt chaining (Q54).
3. Sessions persist conversation, not the filesystem (Q59).

**Meta-lesson to name for him:** when two options both look right, the exam almost always rewards
the *simpler mechanism that reflects how the system actually works*, and manufactures the elaborate
one as the trap. His instinct reaches for the elaborate one.

Deliverable: `drills/mock2-debrief.html` — visual, plain-language, analogy-driven (subagent =
a freelancer you email a sealed brief to). Verdict on exam readiness: **ready to book Pearson
VUE**, but do the D1 debrief first to turn a 56% into a safety margin.
