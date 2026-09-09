# CCAR-F Resources

Curated for the **Claude Certified Architect – Foundations** exam. Ordered by trust.

## Knowledge — Tier 1 (authoritative)

- [**Official Exam Guide v1.0** (July 2026, PDF)](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1783542750/Claude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf)
  Local copy: `reference/exam-guide-v1.0.pdf`. **The single most important document.**
  Sections 5–6 define the 6 scenarios and all 30 task statements — every exam item is
  written against these. Section 9 gives 12 real sample questions with rationales.
  Section 17 gives explicit in-scope / out-of-scope lists. Use for: deciding whether a
  topic is worth studying at all.

- [**Certification landing page** — Anthropic Partner Academy](https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification)
  $125, registration, and the link to Anthropic's **own practice test**. Use for:
  registering, and getting the one practice test written by the exam authors.

- [**Anthropic Academy** (free courses)](https://anthropic.skilljar.com/)
  Claude 101, Building with the Claude API, MCP (intro + advanced), Subagents, Agent
  Skills, Claude Code modules. Use for: filling a knowledge gap the exam guide names but
  doesn't explain.

## Knowledge — Tier 2 (official product docs)

- [**Claude Docs**](https://docs.claude.com/) — tool use, `tool_choice`, `stop_reason`,
  JSON schemas, Message Batches API. Use for: exact API semantics (D1, D2, D4).
- [**Claude Agent SDK docs**](https://docs.claude.com/en/api/agent-sdk/overview)
  Agent definitions, hooks, subagents, sessions. Use for: D1 mechanism detail.
- [**Claude Code docs**](https://docs.claude.com/en/docs/claude-code/overview)
  CLAUDE.md hierarchy, `.claude/rules/`, skills frontmatter, `-p`, `--output-format json`.
  Use for: D3 — the fine detail the exam probes.
- [**Model Context Protocol spec**](https://modelcontextprotocol.io/)
  `isError`, tools vs resources, transports. Use for: D2.
- [**Writing effective tools for agents** — Anthropic Engineering](https://www.anthropic.com/engineering/writing-tools-for-agents)
  Directly underpins TS 2.1 and TS 2.3. Use for: tool description quality, tool count limits.
- [**Building effective agents** — Anthropic Engineering](https://www.anthropic.com/engineering/building-effective-agents)
  Workflow vs agent, prompt chaining, orchestrator-workers. Use for: TS 1.2, TS 1.6.
- [**How we built our multi-agent research system** — Anthropic Engineering](https://www.anthropic.com/engineering/multi-agent-research-system)
  Almost a walkthrough of exam Scenario 3. Use for: TS 1.2, 1.3, 5.6.

## Knowledge — Tier 3 (community; feel, not facts)

- [Community study guide — daronyondem/claude-architect-exam-guide (GitHub)](https://github.com/daronyondem/claude-architect-exam-guide)
- [Practitioner's guide to clearing the exam — Selvaganesan Thangavelu (Medium)](https://medium.com/@tselva88/claude-certified-architect-foundations-a-practitioners-guide-to-clearing-the-exam-959ed39262f7)
- [Passed with 893/1000 — Kishor Kukreja (Medium)](https://medium.com/@kishorkukreja/i-passed-anthropics-claude-certified-architect-foundations-exam-with-a-score-of-893-1000-2206c27efd6c)
- [5 Domains, 6 Scenarios — DEV Community](https://dev.to/aws-builders/the-claude-certified-architect-exam-5-domains-6-scenarios-and-everything-you-need-to-know-4le3)
  ⚠️ Verify every factual claim from Tier 3 against the Exam Guide. Several community
  posts state the domains incorrectly.

## Local materials (already owned)

- `~/Documents/Repo/personal/logiciel-self/certification-preparation/cca-guide/`
  Unofficial 5-domain study guide + 4 mocks + 5 drills. **Blueprint matches the official
  one.** Use for: extra question volume after the lessons.
- `~/.../certification-preparation/claude-certified-architect/`
  ⚠️ Uses an **outdated 4-domain framing**. Do not use for blueprint or weighting.
- `~/.../certification-preparation/The Architect's Playbook.pdf` — 14 MB, unvetted.

## Wisdom (Communities)

- [r/ClaudeAI](https://reddit.com/r/ClaudeAI) — active; certification threads with
  first-hand exam reports. Use for: what the exam *felt* like, pacing advice.
- [Anthropic Discord](https://www.anthropic.com/discord) — Agent SDK + MCP practitioners.
  Use for: sanity-checking an architecture decision against people who ship them.
- [MCP community (GitHub Discussions)](https://github.com/modelcontextprotocol/servers/discussions)
  Use for: real MCP server design critique — the D2 skills, tested for real.

  ⚠️ **Exam NDA:** you must not reproduce or discuss actual exam content afterwards.
  Communities are for building judgement *before* the exam, not for item sharing.

## Gaps
- No official Anthropic-authored question bank beyond the 12 sample items in the guide
  and the single practice test. Question volume must come from generated drills grounded
  in the 30 task statements.
