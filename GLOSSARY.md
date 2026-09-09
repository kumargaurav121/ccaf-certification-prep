# CCAR-F Glossary

The canonical language for this workspace. Lessons, quizzes and learning records all use these
terms exactly as defined here.

**Growth rule:** a term is added only once Kumar has *used it correctly*, not when it has merely
been introduced. The glossary is a record of compressed understanding, so its length is a real
progress signal — not a dictionary to read ahead of the lessons.

## Claude Code
_Seeded from stated prior knowledge (daily user). Verify in the L14 diagnostic drill._

**CLAUDE.md**:
A file of always-loaded instructions and project context that Claude Code reads into every
session, resolved across a three-level hierarchy: user (`~/.claude/CLAUDE.md`), project, and
directory.
_Avoid_: memory file, context file, config file

**Slash command**:
A reusable prompt stored as a file and invoked by name in a session. Project-scoped in
`.claude/commands/` (shared through version control), user-scoped in `~/.claude/commands/`.
_Avoid_: custom command, macro, shortcut

**Plan mode**:
An operating mode in which Claude Code explores and designs without making changes, used when
a task involves architectural decisions, multiple valid approaches, or many files.
_Avoid_: planning mode, read-only mode, dry run

## Exam strategy
_Introduced in [Lesson 01](lessons/0001-the-examiners-mind.html). Promote to confirmed once the
L01 quiz is passed without guessing._

**Task statement** _(pending)_:
One of the 30 numbered objectives in the official blueprint (e.g. TS 1.4) against which every
exam item is written. The unit of revision in this workspace.
_Avoid_: objective, learning outcome, topic

**Distractor shape** _(pending)_:
The recurring pattern behind a wrong option — invented feature, over-engineer, wrong axis,
unreliable proxy, burden shift, or capacity fallacy.
_Avoid_: wrong answer type, red herring

## Pending — awaiting demonstrated understanding

These are the terms the exam leans on hardest. Each gets promoted above as the relevant lesson's
quiz is passed:

`stop_reason` · agentic loop · coordinator · subagent · hub-and-spoke · `Task` tool ·
`allowedTools` · `AgentDefinition` · hook · `PostToolUse` · prerequisite gate · `fork_session` ·
prompt chaining · adaptive decomposition · tool description · `tool_choice` · `isError` ·
`errorCategory` · MCP resource · `.mcp.json` scope · `@import` · path-scoped rule ·
`context: fork` · `argument-hint` · few-shot example · explicit criteria · nullable field ·
validation-retry loop · Message Batches API · `custom_id` · independent review instance ·
case facts block · lost-in-the-middle · escalation trigger · structured error context ·
scratchpad file · manifest · stratified sampling · confidence calibration ·
claim–source mapping
