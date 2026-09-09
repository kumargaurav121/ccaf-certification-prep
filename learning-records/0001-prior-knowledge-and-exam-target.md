# Prior knowledge established: daily Claude Code user, Agent SDK/MCP are the gap

Kumar Gaurav reports being a **daily Claude Code user** — CLAUDE.md, slash commands and plan
mode are familiar working tools, not new concepts. He has *not* claimed hands-on experience
building with the Agent SDK, authoring MCP servers, or working with the Claude API's tool-use
layer directly.

Target: sit **CCAR-F within 2–3 weeks**, intensive (~1–2 hrs/day), delivered as short
lesson + quiz.

**Implications for teaching:**
- Domain 3 (Claude Code, 20%) should be *verified by drill* rather than taught from zero.
  Daily use covers the concepts but probably not the exam's fine detail — `@import`,
  `.claude/rules/` YAML `paths:` globs, SKILL.md frontmatter (`context: fork`,
  `allowed-tools`, `argument-hint`), `/memory`. Teach only what the drill exposes.
- Domains 1 (27%) and 2 (18%) get the most lessons — 45% of the exam and the self-reported gap.
- Domain 5 (15%) is mostly architectural judgement rather than API recall, so it should
  interleave well with Domain 1 rather than needing its own long block.
- Because the exam is **closed-book and proctored**, fluency at a terminal counts for nothing.
  Every lesson must end in unaided retrieval.

**Evidence:** self-report at workspace creation (2026-08-10). Not yet corroborated by any
drill — L14's diagnostic is the first real test of the Domain 3 claim, and the L01 quiz is the
first test of anything. Revise this record once there is quiz evidence either way.
