# Mission: Claude Certified Architect – Foundations (CCAR-F)

## Why
Kumar Gaurav is sitting Anthropic's **Claude Certified Architect – Foundations** exam
(code `CCAR-F`, $125, Pearson VUE proctored) within the next 2–3 weeks. The credential
validates architectural judgement with Claude Code, the Claude Agent SDK, the Claude API,
and MCP — the stack Logiciel builds client work on. Passing means being able to defend
production design tradeoffs, not just recite features.

## Success looks like
- Scores **720+ / 1000** on the CCAR-F exam, first attempt.
- Can answer a scenario question by naming the *root cause* and the *proportionate* fix,
  rather than picking the most elaborate-sounding option.
- Can explain, without notes, when deterministic enforcement (hooks, prerequisite gates)
  beats prompt-based guidance — and vice versa.
- Can design a coordinator/subagent system: context passing, tool scoping, error
  propagation, provenance preservation.
- Can configure Claude Code for a team: CLAUDE.md hierarchy, `.claude/rules/` glob scoping,
  skills with `context: fork`, MCP server scoping, CI via `-p` + `--json-schema`.

## Constraints
- **2–3 weeks, intensive.** ~1–2 hrs/day available.
- Format: one short lesson (~10–15 min) + a scored retrieval quiz per session.
- Already a **daily Claude Code user** — Domain 3 needs verification, not teaching from zero.
- Exam is **closed-book, proctored, no AI assistance**. Storage strength is the goal,
  not fluency in front of a terminal.

## Out of scope
Explicitly excluded by the official exam guide — do not spend time here:
fine-tuning/training, API auth & billing, MCP server *hosting*/infrastructure, Claude's
internal architecture, Constitutional AI/RLHF, embeddings & vector DBs, computer use,
vision, streaming/SSE, rate limits & pricing math, OAuth/key rotation, cloud provider
configs, benchmarking, prompt-caching *implementation* details, tokenization specifics.
