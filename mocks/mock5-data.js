/* CCAR-F Mock Exam 5 — parsed from OlivierAlter/Claude-Certified-Architect-Foundations-Certification-Exam
   (github.com). 77 multiple-choice items organised by domain and task statement, with rationales.
   Third-party practice material; not exam content. Includes some of the official exam-guide sample items. */
window.MOCK5 = {
 "id": "MOCK5",
 "title": "Mock Exam 5 — CCAR-F (Alter set, 77 items)",
 "minutes": 154,
 "weights": {
  "1": 0.27,
  "2": 0.18,
  "3": 0.2,
  "4": 0.2,
  "5": 0.15
 },
 "scenarios": [
  {
   "name": "Domain 1 — Agentic Architecture & Orchestration",
   "blurb": "This block covers Agentic Architecture & Orchestration. The source set is organised by domain and task statement rather than by the six exam scenarios; the domain is shown for orientation."
  },
  {
   "name": "Domain 2 — Tool Design & MCP Integration",
   "blurb": "This block covers Tool Design & MCP Integration. The source set is organised by domain and task statement rather than by the six exam scenarios; the domain is shown for orientation."
  },
  {
   "name": "Domain 3 — Claude Code Configuration & Workflows",
   "blurb": "This block covers Claude Code Configuration & Workflows. The source set is organised by domain and task statement rather than by the six exam scenarios; the domain is shown for orientation."
  },
  {
   "name": "Domain 4 — Prompt Engineering & Structured Output",
   "blurb": "This block covers Prompt Engineering & Structured Output. The source set is organised by domain and task statement rather than by the six exam scenarios; the domain is shown for orientation."
  },
  {
   "name": "Domain 5 — Context Management & Reliability",
   "blurb": "This block covers Context Management & Reliability. The source set is organised by domain and task statement rather than by the six exam scenarios; the domain is shown for orientation."
  }
 ],
 "questions": [
  {
   "scen": 0,
   "d": 1,
   "ts": "1.1",
   "stem": "Production data shows that in 12% of cases, your agent skips <code>get_customer</code> entirely and calls <code>lookup_order</code> using only the customer's stated name, occasionally leading to misidentified accounts and incorrect refunds. What change would most effectively address this reliability issue?",
   "opts": [
    "Add a programmatic prerequisite that blocks <code>lookup_order</code> and <code>process_refund</code> calls until <code>get_customer</code> has returned a verified customer ID.",
    "Enhance the system prompt to state that customer verification via <code>get_customer</code> is mandatory before any order operations.",
    "Add few-shot examples showing the agent always calling <code>get_customer</code> first, even when customers volunteer order details.",
    "Implement a routing classifier that analyzes each request and enables only the subset of tools appropriate for that request type."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q1) When a specific tool sequence is required for critical business logic, programmatic enforcement provides deterministic guarantees that prompt-based approaches cannot. Options B and C rely on probabilistic LLM compliance. Option D addresses tool availability rather than tool ordering."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.1",
   "stem": "You are building a customer support agent using the Claude Agent SDK. The agent processes billing disputes by calling tools like <code>lookup_order</code>, <code>get_invoice</code>, and <code>process_refund</code>. A code review notes that after each tool call, your loop checks whether Claude's response text contains the phrase \"I have completed\" to decide whether to stop. What is the primary problem with this loop termination approach?",
   "opts": [
    "The agent will never terminate because <code>process_refund</code> always returns a success message that prevents \"I have completed\" from appearing.",
    "Relying on natural language signals in the assistant's text is unreliable; the correct approach is to inspect <code>stop_reason</code> and only terminate when it equals <code>\"end_turn\"</code>.",
    "The loop should terminate as soon as any tool call fails, since continuing after a failure will corrupt the conversation history.",
    "Checking response text is only valid in synchronous mode; you must use a callback handler for proper loop control in async contexts."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q13) Inspecting <code>stop_reason</code> is the canonical method for agentic loop control: continue iterating when <code>stop_reason</code> is <code>\"tool_use\"</code>, stop when it is <code>\"end_turn\"</code>. Natural language phrases like \"I have completed\" are not reliable termination signals because Claude's phrasing varies across responses and prompt updates. Options A and C are based on incorrect assumptions about how tools interact with response text. Option D conflates asynchronous execution patterns with loop control logic."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.1",
   "stem": "A developer productivity agent investigates bug reports by calling <code>search_codebase</code>, <code>read_file</code>, and <code>run_tests</code>. During a code review, a colleague proposes adding an iteration cap: if the loop has not finished after 15 tool calls, terminate with a generic \"investigation incomplete\" response. What is the correct characterization of this design?",
   "opts": [
    "Iteration caps are the recommended primary stopping mechanism because they prevent runaway costs in production.",
    "Iteration caps are a reasonable safety boundary for long-running tasks but should not be the primary termination mechanism; <code>stop_reason: \"end_turn\"</code> remains the authoritative signal.",
    "The iteration cap should be replaced with a time-based timeout, since token counts are a more reliable measure of completion than iteration count.",
    "Iteration caps are unnecessary if the system prompt instructs the agent to always request only the minimum tools needed."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q14) The agentic loop should terminate primarily when <code>stop_reason</code> equals <code>\"end_turn\"</code>, which signals that the model has finished its task. An iteration cap can serve as a safety guardrail against runaway loops, but treating it as the primary stopping mechanism means the loop may cut off legitimate multi-step investigations. Options A and C misstate recommended practice. Option D conflates prompt-based guidance with loop control: even a well-prompted agent may legitimately need many tool calls for complex investigations."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.1",
   "stem": "Your multi-agent research system's agentic loop appends each tool result to the conversation history before sending the next request. A teammate suggests instead storing all tool results in a separate database and providing only a summary to the model at each iteration, rather than the full result. Under what condition would this change most likely degrade agent performance?",
   "opts": [
    "When the tool results contain binary data such as images or file attachments.",
    "When the model needs to reason across multiple tool results simultaneously to determine its next action, since summaries may omit details required for that reasoning.",
    "When the number of tool calls per session exceeds 10, since larger histories slow down the API.",
    "When tools return results faster than 200ms, making history appending redundant."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q15) The agentic loop depends on tool results being present in conversation history so the model can reason about what it has already discovered before deciding its next action. Summaries may omit field values, error codes, or conditional data the model needs to make correct decisions. Option A is a valid concern but not the primary performance risk for text-based research tasks. Options C and D are not recognized failure modes for this architecture."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.2",
   "stem": "After running on \"impact of AI on creative industries,\" each subagent completes successfully but the final reports cover only visual arts, missing music, writing, and film production. The coordinator decomposed the topic into: \"AI in digital art creation,\" \"AI in graphic design,\" and \"AI in photography.\" What is the most likely root cause?",
   "opts": [
    "The synthesis agent lacks instructions for identifying coverage gaps in the findings it receives from other agents.",
    "The coordinator agent's task decomposition is too narrow, resulting in subagent assignments that don't cover all relevant domains.",
    "The web search agent's queries are not comprehensive enough and need to be expanded to cover more creative industry sectors.",
    "The document analysis agent is filtering out sources related to non-visual creative industries due to overly restrictive relevance criteria."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q7) The coordinator's logs reveal the root cause directly: it decomposed \"creative industries\" into only visual arts subtasks. The subagents executed their assigned tasks correctly. The problem is what they were assigned."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.2",
   "stem": "Your multi-agent research system uses a coordinator that always routes every query through all four subagents (web search, document analysis, synthesis, and report generation) regardless of query complexity. For a simple factual question like \"What year was the Anthropic API released?\", the system takes 45 seconds and incurs unnecessary cost. What design change most directly addresses this?",
   "opts": [
    "Replace the coordinator with a static routing table that maps query keywords to specific subagent pipelines.",
    "Have each subagent evaluate its own relevance to the current query and self-select into or out of the pipeline.",
    "Design the coordinator to dynamically select which subagents to invoke based on query complexity and type, rather than always routing through the full pipeline.",
    "Reduce the number of subagents from four to two by merging web search and document analysis into a single \"retrieval\" agent."
   ],
   "ans": [
    2
   ],
   "why": "(Alter set · Q16) A coordinator that always runs the full pipeline regardless of query complexity wastes resources and adds latency for simple requests. The correct design is a coordinator that evaluates the query and selects only the subagents needed for that specific task. Option A replaces adaptive intelligence with a brittle keyword table. Option B distributes coordination logic across subagents, breaking the hub-and-spoke pattern and reducing observability. Option D reduces capability unnecessarily instead of improving routing logic."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.2",
   "stem": "A coordinator agent in your research system has delegated document analysis to a subagent. After the subagent finishes, the coordinator notices the findings are incomplete: the subagent covered only three of the five specified sources. The coordinator needs to get the remaining two sources analyzed. What is the correct approach for re-delegating this work?",
   "opts": [
    "Invoke the synthesis agent with the partial findings and instruct it to infer what the missing sources likely contain based on patterns from the three completed analyses.",
    "The coordinator should re-invoke the document analysis subagent with an explicit prompt specifying only the two missing sources, including the previously completed findings as context.",
    "Send all five sources again to a new document analysis subagent instance, which will re-analyze the three already-completed sources along with the two missing ones.",
    "Let the coordinator generate its own analysis of the remaining two sources directly, rather than spawning another subagent delegation."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q17) The coordinator's role includes evaluating output for gaps and re-delegating targeted work to close those gaps. Re-invoking the subagent with only the unfinished sources and providing the completed findings as context is efficient and correct. Option A asks synthesis to fabricate content, which undermines report accuracy. Option C wastes resources by re-processing already-completed sources. Option D bypasses the coordinator-subagent architecture and ignores the subagent's specialization."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.3",
   "stem": "You are building a coordinator that delegates research tasks to subagents using the <code>Task</code> tool. When you test the system, the coordinator cannot invoke any subagents. Reviewing the coordinator's <code>AgentDefinition</code>, you notice the <code>allowedTools</code> field is set to <code>[\"web_search\", \"read_document\"]</code>. What is the most likely cause of the failure?",
   "opts": [
    "The <code>Task</code> tool requires an explicit <code>subagent_endpoint</code> configuration before it can be invoked.",
    "<code>\"Task\"</code> is not included in the coordinator's <code>allowedTools</code>, so it cannot spawn subagents.",
    "The coordinator's system prompt does not include instructions to use the <code>Task</code> tool, so the model never attempts to call it.",
    "Subagent invocation requires the coordinator to be running in plan mode rather than direct execution mode."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q18) The <code>Task</code> tool is the mechanism for spawning subagents in the Claude Agent SDK. For a coordinator to invoke subagents, <code>\"Task\"</code> must be explicitly included in its <code>allowedTools</code>. Simply having other tools available does not grant subagent spawning capability. Option A describes a configuration parameter that does not exist. Option C conflates prompt instructions with capability gating: even a well-prompted coordinator cannot call a tool that is not in its allowed set. Option D conflates plan mode with subagent spawning."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.3",
   "stem": "Your multi-agent research system has a web search subagent that consistently returns findings without identifying which sources correspond to which claims. When the synthesis agent receives these findings, it cannot produce properly cited reports. What is the correct fix during context passing from the web search subagent to the synthesis agent?",
   "opts": [
    "Instruct the synthesis agent to run its own web searches to re-locate the original sources.",
    "Use structured data formats that separate claim content from metadata (source URLs, publication dates, page numbers) in the subagent's output, and include this structure when passing context to the synthesis agent.",
    "Have the coordinator concatenate all subagent outputs into a single text block before forwarding to synthesis, since synthesis will extract citations naturally.",
    "Configure the web search subagent to return only source URLs, and have the synthesis agent re-read each source to reconstruct the findings."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q19) Structured data formats that separate content from metadata ensure that claim-source mappings survive the handoff between agents. When context is passed as unstructured text, citation information is easily lost. Option A introduces redundant work and potentially different search results. Option C risks losing the claim-source associations during concatenation. Option D is extremely inefficient and requires the synthesis agent to redo retrieval work."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.3",
   "stem": "A coordinator needs to research three independent subtopics in parallel: market trends, competitor analysis, and regulatory environment. Each requires a separate web search subagent. How should the coordinator spawn these subagents to maximize throughput?",
   "opts": [
    "Spawn the subtopics sequentially: start the first subagent, wait for its result, then start the second, and so on, to avoid context conflicts.",
    "Emit all three <code>Task</code> tool calls in a single coordinator response, which allows the subagents to run in parallel.",
    "Route all three subtopics through a single subagent sequentially, sharing context between them to reduce total memory usage.",
    "Use a single subagent with three separate prompts in sequence, passing prior results as context for each subsequent prompt."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q20) The Claude Agent SDK supports parallel subagent execution by emitting multiple <code>Task</code> tool calls in a single coordinator response. This maximizes throughput for independent subtopics that do not depend on each other's results. Option A introduces unnecessary serial latency. Option C assumes a dependency that the question does not establish. Option D collapses three specialists into one sequential process, eliminating parallelism."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.4",
   "stem": "Your customer support agent handles account closure requests. The workflow requires: (1) verify customer identity via <code>get_customer</code>, (2) check for active subscriptions via <code>check_subscriptions</code>, (3) process closure via <code>close_account</code>. Production logs show the agent occasionally calls <code>close_account</code> before completing the identity verification step, resulting in unauthorized account closures. A colleague suggests adding a system prompt instruction: \"Always verify identity before closing accounts.\" What is the most effective approach?",
   "opts": [
    "The system prompt instruction is sufficient because it explicitly describes the required order.",
    "Add few-shot examples showing the correct three-step sequence alongside the system prompt instruction.",
    "Implement a programmatic prerequisite that blocks <code>close_account</code> from executing until <code>get_customer</code> has returned a verified customer ID.",
    "Add a routing classifier that analyzes the request type and pre-selects the appropriate tools before the agent begins."
   ],
   "ans": [
    2
   ],
   "why": "(Alter set · Q21) When a tool ordering requirement has serious consequences (unauthorized account closures), programmatic enforcement provides deterministic guarantees. Prompt instructions have a non-zero failure rate even when explicit. Option A relies on probabilistic compliance, which the logs already show is insufficient. Option B improves the odds but still does not guarantee compliance. Option D addresses tool selection rather than ordering enforcement."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.4",
   "stem": "A customer contacts your support agent about three issues in a single message: a billing charge dispute, a missing order, and a request to update their email address. The agent processes these sequentially, taking 3-4 minutes per request. A senior architect suggests you redesign the handling approach. What design change would most improve efficiency while maintaining accuracy?",
   "opts": [
    "Instruct the agent to address only the highest-priority issue per conversation turn and ask the customer to submit separate tickets for the remaining issues.",
    "Decompose the three concerns into distinct investigation items and process each in parallel using shared customer context, then compile a unified response.",
    "Process the three issues sequentially but cache intermediate results so subsequent issues benefit from data already retrieved.",
    "Delegate all three issues to a single specialized \"multi-issue\" subagent that handles complex requests with multiple concerns."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q22) When a customer presents multiple independent concerns, decomposing them into parallel investigation items dramatically reduces latency. Each concern can be investigated simultaneously using the shared customer context already retrieved. Option A creates a poor customer experience and extra work for the customer. Option C improves caching but does not eliminate the serial bottleneck. Option D creates an undifferentiated subagent that doesn't reflect the coordinator-subagent specialization pattern."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.5",
   "stem": "Your customer support agent integrates with three backend MCP tools: a legacy billing system returning Unix timestamps, an order management system returning ISO 8601 dates, and a subscription service returning numeric status codes (1=active, 2=paused, 3=cancelled). The agent frequently misinterprets these heterogeneous formats when reasoning about customer records. What is the most appropriate architectural fix?",
   "opts": [
    "Update each backend system to return a uniform date and status format before the agent calls them.",
    "Add format conversion instructions to the system prompt explaining how to interpret each tool's output conventions.",
    "Implement <code>PostToolUse</code> hooks that intercept tool results from each source and normalize timestamps, dates, and status codes into a consistent format before the model processes them.",
    "Add a post-processing step after the agent produces its final response to re-format any dates and statuses that appear in the output."
   ],
   "ans": [
    2
   ],
   "why": "(Alter set · Q23) <code>PostToolUse</code> hooks are the correct mechanism for intercepting and transforming tool results before the model processes them. This ensures the model always sees normalized data regardless of backend heterogeneity. Option A requires backend changes that may not be feasible and introduces coupling. Option B relies on probabilistic compliance and adds token overhead. Option D applies normalization after the model has already reasoned on inconsistent data, which cannot repair any incorrect conclusions already made."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.5",
   "stem": "Your customer support agent has a policy: refunds above $500 require manager approval and must not be processed autonomously. Your system prompt states \"Do not process refunds above $500 without manager approval.\" Production logs show this rule is violated in approximately 3% of cases. What is the most effective way to guarantee compliance?",
   "opts": [
    "Strengthen the system prompt language: \"You are strictly forbidden from processing refunds above $500 without explicit manager approval under any circumstances.\"",
    "Add 10 few-shot examples in the system prompt, all demonstrating the agent requesting manager approval for high-value refunds.",
    "Implement a hook that intercepts outgoing <code>process_refund</code> tool calls, checks the refund amount, and blocks execution or redirects to the manager approval workflow when the amount exceeds $500.",
    "Implement a validation step that runs after <code>process_refund</code> completes and reverses any refunds that exceeded the threshold."
   ],
   "ans": [
    2
   ],
   "why": "(Alter set · Q24) Business rules that require guaranteed compliance must be enforced programmatically, not through prompt instructions alone. A hook that intercepts <code>process_refund</code> calls before execution provides deterministic enforcement regardless of how the model interprets the system prompt. Options A and B both improve adherence probabilistically but cannot guarantee zero violations. Option D runs after the action has already been taken, which means the policy violation has already occurred."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.5",
   "stem": "A developer productivity agent has a <code>PostToolUse</code> hook that transforms raw Bash output. Currently the hook appends a formatted summary but also preserves the full raw output in the result passed to the model. Sessions exploring large codebases are hitting context limits faster than expected. What change would most effectively reduce unnecessary context consumption from tool results?",
   "opts": [
    "Disable the <code>PostToolUse</code> hook entirely and let the model process raw Bash output directly.",
    "Modify the hook to return only the formatted summary to the model, trimming the verbose raw output rather than preserving it alongside the summary.",
    "Increase the model's <code>max_tokens</code> parameter to accommodate the additional context from both raw and formatted output.",
    "Switch from <code>PostToolUse</code> hooks to pre-processing the Bash commands themselves to produce shorter output."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q25) <code>PostToolUse</code> hooks can trim verbose tool outputs to only the relevant data before the model processes them. Keeping both raw and summary output doubles the context consumption from each tool call. Modifying the hook to return only the formatted summary addresses the root cause directly. Option A removes normalization benefits. Option C increases output capacity but does not address the growing input context. Option D would require significant changes to tool invocation patterns and may not be feasible for all commands."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.6",
   "stem": "You are building an automated code review system using Claude. The review must cover three aspects for every pull request: security vulnerabilities, style compliance, and performance implications. Each aspect has clear, defined criteria documented in your engineering handbook. Which decomposition strategy is most appropriate?",
   "opts": [
    "Dynamic adaptive decomposition: have the agent start by scanning the full PR and generate a review plan based on what it finds.",
    "Prompt chaining with sequential focused passes: one pass per review aspect (security, style, performance), each with dedicated criteria.",
    "A single comprehensive pass that examines all three aspects simultaneously to capture cross-cutting concerns.",
    "Spawn three fully independent agents without shared context, then merge their outputs in a final aggregation step."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q26) When a workflow has predictable, well-defined aspects that must each be covered, prompt chaining with sequential focused passes is the appropriate pattern. Each pass dedicates full attention to one concern rather than dividing attention across all three. Option A uses dynamic decomposition for a workflow whose structure is already known, adding unnecessary overhead. Option C suffers from the attention dilution problem that prompt chaining is designed to solve. Option D loses cross-file integration context by fully isolating the three agents."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.6",
   "stem": "An engineering team asks you to design a Claude-based system to investigate a production incident. The system must root-cause a bug that was introduced somewhere in the past two weeks across an unknown set of files and services. The scope of the investigation cannot be known in advance. Which decomposition approach is most appropriate?",
   "opts": [
    "Prompt chaining: design a fixed sequence of investigation steps (check logs, read configs, trace service calls) that the agent executes in order.",
    "Dynamic adaptive decomposition: the agent first maps the affected services and symptom timeline, then generates and prioritizes investigation subtasks based on what is discovered at each step.",
    "Split the investigation between two agents: one agent reads logs while the other reads source code, and they report findings independently to a human operator.",
    "Have the agent run a comprehensive search of all changed files in the past two weeks and produce a ranked list of candidates for manual review."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q27) Open-ended investigation tasks with unknown scope require dynamic adaptive decomposition, where the agent builds its investigation plan based on intermediate findings rather than following a fixed sequence. A static prompt chain cannot adapt when the investigation reveals unexpected service dependencies or anomalous patterns. Option A is appropriate for predictable multi-aspect reviews, not exploratory investigations. Option C removes the coordinating intelligence and requires human intervention for synthesis. Option D is a single-pass heuristic that does not apply the model's reasoning capability."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.7",
   "stem": "A developer has been using Claude Code to investigate a legacy authentication service. After several hours, they have built up a detailed session with findings about the service's token validation logic. They need to step away and return tomorrow. Three core files in the authentication module will be modified overnight by another team. What is the most reliable approach for resuming the investigation productively the next day?",
   "opts": [
    "Resume the named session with <code>--resume &lt;session-name&gt;</code> and notify the agent about the specific files that were changed, so it can re-analyze those files in the context of its prior understanding.",
    "Start a completely new session each time, since stale tool results from the previous session make resumption unreliable for any scenario.",
    "Resume the named session without any notification about file changes; the agent will detect modifications automatically when it next reads those files.",
    "Use <code>fork_session</code> to create a branch of the current session before stepping away, then resume from the fork the next day."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q28) When resuming a session after code modifications, the correct approach is to use <code>--resume &lt;session-name&gt;</code> to continue the named session and explicitly inform the agent about which files changed so it can target re-analysis appropriately. Option B is overly conservative: starting fresh is appropriate when prior tool results are broadly stale, but when only a few known files changed, resumption with targeted context about those changes is more efficient. Option C is incorrect because the agent does not automatically detect file changes on resume. Option D misuses <code>fork_session</code>, which is designed for exploring divergent approaches from a shared baseline, not for session continuity across time gaps."
  },
  {
   "scen": 0,
   "d": 1,
   "ts": "1.7",
   "stem": "You are leading a research investigation using Claude Code. You have completed an initial analysis of a competitor's public API documentation and want to explore two divergent architectural approaches for your response strategy: one focused on feature parity, one focused on differentiation. You want both explorations to start from the same analysis baseline. Which session management approach best fits this scenario?",
   "opts": [
    "Run two separate new sessions, each with a copy of the analysis findings injected as context in the initial prompt.",
    "Use <code>--resume</code> to resume the current session twice in parallel, once for each exploration direction.",
    "Use <code>fork_session</code> to create two independent branches from the current session, then explore each approach in its respective branch.",
    "Continue in the same session, exploring one approach, then using <code>/compact</code> to clear context before exploring the second approach."
   ],
   "ans": [
    2
   ],
   "why": "(Alter set · Q29) <code>fork_session</code> is designed precisely for this scenario: creating independent branches from a shared analysis baseline to explore divergent approaches. Each branch inherits the common findings and can be explored independently without contaminating the other. Option A requires duplicating context and does not preserve the live session state. Option B describes a mechanism that does not work this way: <code>--resume</code> continues a single session sequentially, not in parallel branches. Option D uses <code>/compact</code> destructively, losing the baseline context needed for the second exploration."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.1",
   "stem": "Production logs show the agent frequently calls <code>get_customer</code> when users ask about orders, instead of calling <code>lookup_order</code>. Both tools have minimal descriptions and accept similar identifier formats. What's the most effective first step to improve tool selection reliability?",
   "opts": [
    "Add few-shot examples to the system prompt demonstrating correct tool selection patterns, with 5-8 examples.",
    "Expand each tool's description to include input formats it handles, example queries, edge cases, and boundaries explaining when to use it versus similar tools.",
    "Implement a routing layer that parses user input before each turn and pre-selects the appropriate tool based on detected keywords.",
    "Consolidate both tools into a single <code>lookup_entity</code> tool that accepts any identifier and internally determines which backend to query."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q2) Tool descriptions are the primary mechanism LLMs use for tool selection. Option B directly addresses the root cause. Few-shot examples (A) add token overhead without fixing the underlying issue. A routing layer (C) is over-engineered. Consolidating tools (D) requires more effort than a \"first step\" warrants."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.1",
   "stem": "Your customer support agent has a <code>lookup_order</code> tool that is called at the right times, but frequently returns errors. Logs show the agent passes free-text descriptions like \"order from last Tuesday\" instead of the required ISO-8601 timestamp format. The tool description reads: \"Retrieves order details given a date or identifier.\" No examples or format constraints are provided. What change to the tool definition would most directly reduce these input format errors?",
   "opts": [
    "Add input format constraints, accepted value formats, and example inputs to the tool description so the model knows exactly how to format its calls.",
    "Add a system prompt instruction: \"Always use ISO-8601 format when calling lookup_order.\"",
    "Add input schema validation that rejects malformed inputs and returns an error to the agent.",
    "Split <code>lookup_order</code> into two tools: <code>lookup_order_by_id</code> and <code>lookup_order_by_date</code> to reduce ambiguity."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q30) Tool descriptions are the primary mechanism the model uses to understand how to call a tool. Adding format constraints and examples directly to the description gives the model the information it needs at decision time. Option B adds token overhead in the system prompt but is more fragile than a tool-specific description. Option C adds validation but does not prevent the model from sending malformed inputs in the first place, creating unnecessary error cycles. Option D addresses a different problem (disambiguation) rather than the format guidance issue."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.1",
   "stem": "Your customer support agent has three tools with overlapping names and descriptions: <code>get_account_info</code> (\"Get information about the account\"), <code>fetch_account_details</code> (\"Fetch account details\"), and <code>retrieve_customer_record</code> (\"Retrieve customer information\"). All three call different backend systems with different data. The agent frequently picks the wrong tool. Which approach most effectively resolves the misrouting?",
   "opts": [
    "Add a system prompt instruction listing all three tools and specifying exactly when each should be used based on the request type.",
    "Rename the tools to reflect their distinct data sources and rewrite their descriptions to explain what data each returns, what backend it queries, and what use case it serves.",
    "Consolidate all three tools into one tool with a <code>source</code> parameter that specifies which backend to query.",
    "Keep the current tools but randomize which one the agent calls, then merge the responses in a post-processing step."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q31) Ambiguous or overlapping tool names and descriptions cause misrouting. Renaming tools to reflect their distinct backends and writing descriptions that explain what each one returns, where its data comes from, and when to use it are the right fixes. Option A may reduce misrouting but does not fix the root problem: the tool descriptions themselves are indistinguishable. Option C collapses three specialized tools into one generic tool with a parameter, which shifts the burden of correct routing back to the model in a less structured way. Option D is not a viable architecture."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.2",
   "stem": "The web search subagent times out while researching a complex topic. You need to design how this failure information flows back to the coordinator agent. Which error propagation approach best enables intelligent recovery?",
   "opts": [
    "Return structured error context to the coordinator including the failure type, the attempted query, any partial results, and potential alternative approaches.",
    "Implement automatic retry logic with exponential backoff within the subagent, returning a generic \"search unavailable\" status only after all retries are exhausted.",
    "Catch the timeout within the subagent and return an empty result set marked as successful.",
    "Propagate the timeout exception directly to a top-level handler that terminates the entire research workflow."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q8) Structured error context gives the coordinator the information it needs to make intelligent recovery decisions. Option B's generic status hides valuable context. Option C suppresses the error, preventing any recovery. Option D terminates the entire workflow unnecessarily."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.2",
   "stem": "Your customer support MCP tool <code>process_refund</code> returns the same error response for all failures: <code>{\"status\": \"error\", \"message\": \"Operation failed\"}</code>. The agent currently handles all errors by apologizing to the customer and ending the conversation. Logs show this response is triggered by: network timeouts, invalid refund amounts, refunds blocked by fraud detection, and expired order IDs. What structured error response design would most improve the agent's ability to recover appropriately?",
   "opts": [
    "Return different HTTP status codes for each failure type and have the agent interpret the status code to determine recovery action.",
    "Return structured error metadata including <code>errorCategory</code> (transient/validation/permission/business), <code>isRetryable</code> boolean, and a human-readable explanation specific to the failure reason.",
    "Return a verbose error log with the full stack trace and system state so the agent has maximum information to reason from.",
    "Return a numeric error code and have the system prompt map each code to a recovery action."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q32) Structured error metadata gives the agent the information it needs to choose the correct recovery path: retry a transient failure, ask the customer for corrected input on a validation failure, or explain a policy block on a business rule violation. Option A relies on HTTP semantics that may not map cleanly to all failure categories and are not as expressive as structured fields. Option C provides excessive detail that consumes context without improving decision quality. Option D encodes recovery logic in the system prompt rather than in a principled error structure, making it harder to maintain."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.2",
   "stem": "A web search subagent in your research system calls <code>search_web</code> and receives the following response: <code>{\"results\": [], \"status\": \"success\"}</code>. The subagent reports to the coordinator: \"Web search was successful but no relevant results were found.\" Later you discover the search API was actually down and returning empty results for all queries. What change to the MCP tool's error handling would prevent this confusion?",
   "opts": [
    "Always return a non-empty results array by including fallback content when the actual search returns nothing.",
    "Distinguish between access failures (where the backend could not be reached or returned an error) and valid empty results (where the search succeeded but found no matches), using the <code>isError</code> flag for the former.",
    "Add a <code>confidence</code> field to the response so the agent can infer whether the empty result is a real outcome or a failure.",
    "Implement automatic retry in the MCP tool itself, so the agent never sees an empty result unless all retries were exhausted."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q33) Access failures and valid empty results are fundamentally different conditions that require different agent responses. Using the <code>isError</code> flag for access failures while returning <code>{\"results\": [], \"status\": \"success\"}</code> only for genuine empty-result queries gives the coordinator accurate information to make retry and recovery decisions. Option A masks failures by fabricating content. Option C introduces ambiguity; a confidence score on a genuinely empty result is meaningless. Option D handles retries locally but does not solve the agent's inability to distinguish the two conditions."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.2",
   "stem": "Your MCP tool <code>check_fraud_risk</code> returns <code>{\"isError\": true, \"message\": \"Refund blocked\"}</code> when a refund is flagged by fraud detection. The agent interprets this as a transient failure and retries the refund three times before giving up. Each retry generates a separate fraud alert in your compliance system. What is the missing element in the error response design?",
   "opts": [
    "The response should include a <code>retry_after</code> timestamp so the agent knows when to retry.",
    "The response should include <code>isRetryable: false</code> and a customer-appropriate explanation distinguishing this business rule block from a transient system error.",
    "The tool should suppress the <code>isError</code> flag for fraud blocks and instead return the result as a successful response with a <code>blocked: true</code> field.",
    "The response should include the fraud risk score so the agent can decide whether the score is high enough to justify blocking."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q34) A business rule block from fraud detection is a non-retryable error. Including <code>isRetryable: false</code> signals to the agent that retrying will not resolve the situation, preventing redundant attempts that trigger compliance alerts. A customer-appropriate explanation helps the agent communicate the block appropriately. Option A implies the block is temporary and retriable, which is the opposite of the intended behavior. Option C hides the error nature of the response and makes recovery logic less clear. Option D provides fraud risk data to the agent that it may not be authorized to act on directly."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.3",
   "stem": "The synthesis agent frequently needs to verify specific claims while combining findings. Currently, this creates 2-3 round trips per task, increasing latency by 40%. 85% of verifications are simple fact-checks; 15% require deeper investigation. What's the most effective approach to reduce overhead while maintaining reliability?",
   "opts": [
    "Give the synthesis agent a scoped <code>verify_fact</code> tool for simple lookups, while complex verifications continue delegating to the web search agent through the coordinator.",
    "Have the synthesis agent accumulate all verification needs and return them as a batch to the coordinator at the end of its pass.",
    "Give the synthesis agent access to all web search tools so it can handle any verification need directly without round-trips.",
    "Have the web search agent proactively cache extra context around each source during initial research, anticipating what the synthesis agent might need to verify."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q9) Option A applies the principle of least privilege by giving the synthesis agent only what it needs for the 85% common case while preserving the existing coordination pattern for complex cases. Option B creates blocking dependencies. Option C over-provisions the synthesis agent. Option D relies on speculative caching."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.3",
   "stem": "You are building a multi-agent research system with a synthesis agent whose sole job is combining findings from subagents and producing a structured report. You have given the synthesis agent access to all 18 tools in your system: web search, file reading, database queries, email sending, calendar access, and more, reasoning that more tools provide more flexibility. What problem does this configuration most likely introduce?",
   "opts": [
    "The synthesis agent will refuse to call any tools because it is overwhelmed by the number of choices.",
    "Having access to tools outside its specialization increases the likelihood the synthesis agent will misuse them, such as initiating new web searches instead of synthesizing the provided findings.",
    "18 tools will exceed the context window limit for tool schemas, causing API errors on every request.",
    "The additional tools will slow down the synthesis agent because the model must read all tool descriptions before producing output."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q35) Giving an agent access to tools outside its specialization degrades tool selection reliability. A synthesis agent with web search tools will sometimes initiate new searches rather than working with the findings already provided, breaking the intended workflow. Option A overstates the effect: the agent will still call tools, but may call the wrong ones. Option C is not a realistic failure mode for 18 tools with typical schema sizes. Option D mischaracterizes how tool descriptions affect latency."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.3",
   "stem": "Your customer support system requires that every response from the <code>draft_response</code> agent includes a structured JSON summary before the agent returns its output. You want to guarantee the agent calls the <code>generate_summary</code> tool on every invocation, not optionally. Which <code>tool_choice</code> configuration achieves this?",
   "opts": [
    "Set <code>tool_choice: \"auto\"</code> so the model decides when the summary tool is needed.",
    "Set <code>tool_choice: \"any\"</code> so the model must call at least one tool, though it may choose a different tool instead.",
    "Set <code>tool_choice: {\"type\": \"tool\", \"name\": \"generate_summary\"}</code> to force the model to call <code>generate_summary</code> specifically.",
    "Remove all other tools from the agent's tool list so <code>generate_summary</code> is the only option available."
   ],
   "ans": [
    2
   ],
   "why": "(Alter set · Q36) Forced tool selection via <code>tool_choice: {\"type\": \"tool\", \"name\": \"generate_summary\"}</code> guarantees the model calls that specific tool on every invocation. Option A (<code>\"auto\"</code>) allows the model to return text without calling any tool. Option B (<code>\"any\"</code>) guarantees a tool call but does not guarantee which tool, so the model might choose a different one. Option D achieves the same result indirectly but removes legitimate tools the agent may need for its other tasks."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.4",
   "stem": "Your team is setting up a shared GitHub MCP server for all engineers on a project. The server requires a GitHub API token for authentication. You want every engineer who clones the repository to have the MCP server available without each person having to manually configure it, and you want to avoid committing the actual token to version control. What is the correct configuration approach?",
   "opts": [
    "Add the MCP server to <code>~/.claude.json</code> on each developer's machine with their personal token hardcoded.",
    "Add the MCP server to the project-scoped <code>.mcp.json</code> file with the token specified using environment variable expansion (e.g., <code>${GITHUB_TOKEN}</code>), and commit <code>.mcp.json</code> to the repository.",
    "Add the MCP server configuration to the root <code>CLAUDE.md</code> file under a <code>[mcp_servers]</code> section.",
    "Create a setup script that each developer runs once to add the MCP server to their personal <code>~/.claude.json</code> with their token."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q37) Project-scoped <code>.mcp.json</code> with environment variable expansion is the correct pattern for shared MCP servers: it is committed to the repository so all team members get the configuration automatically, and tokens are injected via environment variables at runtime rather than committed as plaintext. Option A requires manual per-person setup and hardcodes tokens. Option C describes a configuration mechanism that does not exist in CLAUDE.md. Option D also requires manual setup and does not solve the commit-to-version-control problem."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.4",
   "stem": "A developer productivity agent frequently makes multiple exploratory tool calls to discover what data sources are available in your MCP server before it can answer user questions. This pattern increases latency and consumes context for routine requests. What MCP feature most directly addresses this discovery overhead?",
   "opts": [
    "Add a <code>list_tools</code> meta-tool to the MCP server that returns all available tool names and descriptions.",
    "Expose content catalogs as MCP resources, giving the agent visibility into available data at connection time rather than through exploratory tool calls.",
    "Reduce the number of tools in the MCP server by merging similar tools together to minimize the discovery surface.",
    "Add a caching layer that stores the results of previous exploratory calls and reuses them across sessions."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q38) MCP resources are designed to expose content catalogs so agents know what data is available without making exploratory tool calls. This gives the agent upfront visibility at connection time, reducing the need for repeated discovery queries. Option A would still require a tool call to discover available resources. Option C reduces functionality to avoid a structural problem. Option D addresses symptom rather than cause, and cross-session caching of content catalogs may return stale data."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.5",
   "stem": "A developer productivity agent needs to find all TypeScript files in a project that import from a deprecated module named <code>legacy-auth</code>. The project has thousands of files across many directories. Which combination of built-in tools is most appropriate for this task?",
   "opts": [
    "Use <code>Bash</code> to run <code>find . -name \"*.ts\"</code> and then <code>Bash</code> again to run <code>grep</code> on each file found.",
    "Use <code>Glob</code> to find all <code>.ts</code> files, then use <code>Read</code> to open each file and check whether it contains the import.",
    "Use <code>Grep</code> to search for the import pattern across all TypeScript files in the codebase.",
    "Use <code>Read</code> on the project root directory to get a file listing, then recursively <code>Read</code> each subdirectory."
   ],
   "ans": [
    2
   ],
   "why": "(Alter set · Q39) <code>Grep</code> is the correct built-in tool for searching file contents across a codebase. It efficiently searches all TypeScript files for the import pattern without requiring separate file enumeration. Option A uses Bash shell commands that should be replaced by dedicated tools when those tools are available. Option B uses <code>Glob</code> for enumeration and then <code>Read</code> on each file, which is far less efficient than <code>Grep</code> for a content search. Option D uses <code>Read</code> for directory traversal, which is not a supported use of that tool."
  },
  {
   "scen": 1,
   "d": 2,
   "ts": "2.5",
   "stem": "A developer productivity agent needs to update a configuration value in a file. The value appears in a block of code that contains several nearly identical lines. When the agent uses <code>Edit</code>, the tool returns an error: \"Match not unique: found 3 occurrences of the target text.\" What is the correct fallback approach?",
   "opts": [
    "Use <code>Bash</code> to run a <code>sed</code> command to replace all occurrences of the target text simultaneously.",
    "Use <code>Read</code> to load the full file contents, identify the exact surrounding context needed to make the edit unique, and retry <code>Edit</code> with a larger <code>old_string</code> that uniquely identifies the correct location.",
    "Use <code>Write</code> to overwrite the entire file with a corrected version, based on the contents loaded by <code>Read</code>.",
    "Use <code>Grep</code> to locate the line number of each occurrence, then use <code>Edit</code> with a line number parameter to target the correct one."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q40) When <code>Edit</code> fails due to non-unique text, the correct first step is to use <code>Read</code> to examine the full file and find enough surrounding context to construct a unique <code>old_string</code>. This is more surgical than a full <code>Write</code> overwrite. Option C using <code>Read + Write</code> is a valid fallback but should only be used when <code>Edit</code> still cannot find a unique anchor even with additional context. Option A uses Bash shell commands when built-in tools should be preferred, and would replace all occurrences rather than targeting the correct one. Option D describes a line number parameter that <code>Edit</code> does not support."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.1",
   "stem": "A senior engineer adds detailed coding standards and security guidelines to their <code>~/.claude/CLAUDE.md</code> file. When a new team member joins and clones the repository, they report that Claude Code behaves differently and does not appear to follow the team's documented standards. What is the most likely cause?",
   "opts": [
    "The new team member's Claude Code version is outdated and does not support shared configuration files.",
    "The <code>~/.claude/CLAUDE.md</code> file is user-scoped and not version-controlled, so teammates do not receive it when they clone the repository.",
    "CLAUDE.md files must be placed in the <code>.claude/</code> subdirectory to be recognized; a root-level <code>CLAUDE.md</code> is ignored.",
    "The configuration hierarchy requires the project-level file to explicitly import from user-level files using <code>@import</code>."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q41) User-level configuration in <code>~/.claude/CLAUDE.md</code> applies only to the individual developer and is never committed to version control. Teammates will not see it regardless of their setup. To share standards across the team, those instructions must live in the project-level <code>CLAUDE.md</code> or <code>.claude/CLAUDE.md</code>, which are committed to the repository. Options A and D describe mechanisms that do not exist. Option C is incorrect because a root-level <code>CLAUDE.md</code> is a valid project-level location."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.1",
   "stem": "Your monorepo has a root <code>CLAUDE.md</code> that has grown to over 400 lines, covering Python conventions, TypeScript conventions, infrastructure rules, and testing standards. Developers report that Claude sometimes applies the wrong conventions to the wrong files, and the file is difficult to maintain. What is the best approach to reorganize this configuration?",
   "opts": [
    "Split the content into multiple files in <code>.claude/rules/</code>, with each file covering a focused topic, and use path-scoped YAML frontmatter to activate rules only for relevant files.",
    "Create a separate <code>CLAUDE.md</code> in each top-level package directory and delete the root file entirely.",
    "Add inline section headers to the monolithic file and use the <code>/memory</code> command to tell Claude which section to prioritize for each task.",
    "Break the root <code>CLAUDE.md</code> into topic files and use <code>@import</code> directives in the root file to pull them all in unconditionally."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q42) The <code>.claude/rules/</code> directory is designed for exactly this scenario: organizing topic-specific rule files with YAML frontmatter path scoping so each rule set activates only when editing relevant files. This reduces irrelevant context and token usage. Option B would require duplicating shared rules across package directories. Option C relies on manual intervention each session and is not maintainable. Option D with unconditional <code>@import</code> addresses the maintenance concern but not the wrong-conventions problem, since all rules would still load regardless of context."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.1",
   "stem": "You maintain a monorepo with five packages: a Python backend, a TypeScript frontend, a Go service, shared infrastructure Terraform, and a documentation site. Each package has different linting standards, testing conventions, and framework-specific rules. The root <code>CLAUDE.md</code> has grown to 600 lines and developers report that rules intended for one package often bleed into sessions working on another. What is the most modular and maintainable solution using CLAUDE.md configuration?",
   "opts": [
    "Create a <code>CLAUDE.md</code> in each package directory with that package's rules, and use <code>@import</code> in the root <code>CLAUDE.md</code> to include shared conventions that apply to all packages.",
    "Keep the 600-line root file but add explicit section headers and instruct developers to tell Claude which section applies at the start of each session.",
    "Delete the root <code>CLAUDE.md</code> and rely entirely on package-level files, accepting that shared conventions must be duplicated across packages.",
    "Move all rules into <code>.claude/rules/</code> files and tag each with a <code>projects:</code> key in their frontmatter specifying which subdirectory the rule applies to."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q54) The <code>@import</code> syntax in CLAUDE.md is designed for exactly this modular pattern: shared conventions in the root file, package-specific rules in each package's own <code>CLAUDE.md</code>, with the root file importing common standards that apply globally. This keeps each file focused and maintainable while eliminating rule bleed between packages. Option B relies on developer discipline to manually scope rules each session, which is error-prone and does not scale. Option C eliminates the shared baseline and requires duplicating common conventions across five files, creating maintenance drift. Option D is a valid approach for path-scoped rules within a single project but does not address the need for package-level CLAUDE.md isolation."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.2",
   "stem": "You want to create a custom <code>/review</code> slash command that runs your team's standard code review checklist and should be available to every developer when they clone or pull the repository. Where should you create this command file?",
   "opts": [
    "In the <code>.claude/commands/</code> directory in the project repository",
    "In <code>~/.claude/commands/</code> in each developer's home directory",
    "In the <code>CLAUDE.md</code> file at the project root",
    "In a <code>.claude/config.json</code> file with a <code>commands</code> array"
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q4) Project-scoped custom slash commands are stored in <code>.claude/commands/</code> within the repository, version-controlled and automatically available to all developers. Option B is for personal, non-shared commands. Option C is for project instructions, not command definitions. Option D describes a mechanism that doesn't exist."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.2",
   "stem": "A developer wants a <code>/scaffold</code> skill that generates boilerplate for a new microservice. The skill runs many exploratory file reads and Bash commands to understand existing patterns before generating output, producing hundreds of lines of intermediate output. Teammates complain this pollutes their main conversation context. Which frontmatter setting resolves this?",
   "opts": [
    "Set <code>allowed-tools: []</code> in the skill's frontmatter to prevent tool use during execution.",
    "Set <code>context: fork</code> in the skill's frontmatter to run the skill in an isolated sub-agent context that does not affect the main session.",
    "Move the skill file from <code>.claude/skills/</code> to <code>.claude/commands/</code> so it runs as a command rather than a skill.",
    "Add <code>argument-hint: \"service-name\"</code> to the frontmatter so the skill receives a clean input without inheriting session context."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q43) The <code>context: fork</code> frontmatter option runs the skill in an isolated sub-agent context. All exploratory output, intermediate tool calls, and reasoning happen in the fork and do not accumulate in the main conversation context. Only the final output is returned to the parent session. Option A would disable the tool use the skill depends on. Option C does not change execution isolation behavior. Option D is for prompting the user for input parameters, unrelated to output isolation."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.3",
   "stem": "Your codebase has distinct areas with different conventions. Test files are spread throughout the codebase alongside the code they test. You want all tests to follow the same conventions regardless of location. What's the most maintainable way to ensure Claude automatically applies the correct conventions when generating code?",
   "opts": [
    "Create rule files in <code>.claude/rules/</code> with YAML frontmatter specifying glob patterns to conditionally apply conventions based on file paths.",
    "Consolidate all conventions in the root <code>CLAUDE.md</code> file under headers for each area, relying on Claude to infer which section applies.",
    "Create skills in <code>.claude/skills/</code> for each code type that include the relevant conventions in their <code>SKILL.md</code> files.",
    "Place a separate <code>CLAUDE.md</code> file in each subdirectory containing that area's specific conventions."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q6) <code>.claude/rules/</code> with glob patterns (e.g., <code>/*.test.tsx</code>) allows conventions to be automatically applied based on file paths regardless of directory location. Option B relies on inference rather than explicit matching. Option C requires manual invocation. Option D can't easily handle files spread across many directories."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.3",
   "stem": "Your team uses Terraform for infrastructure but only in the <code>infra/</code> directory. You want Claude to automatically apply Terraform naming conventions and module structure rules only when editing <code>.tf</code> files, without those rules appearing in unrelated Python or TypeScript sessions. What is the correct approach?",
   "opts": [
    "Create a <code>CLAUDE.md</code> file inside <code>infra/</code> that contains the Terraform rules so they apply only within that subdirectory.",
    "Create a rules file in <code>.claude/rules/terraform.md</code> with YAML frontmatter specifying <code>paths: [\"infra/**/*\"]</code> and listing the Terraform conventions.",
    "Add the Terraform rules to the root <code>CLAUDE.md</code> under a clearly marked section, and instruct Claude in the system prompt to apply them only to <code>.tf</code> files.",
    "Create a skill in <code>.claude/skills/terraform.md</code> with <code>allowed-tools</code> restricted to file operations on the <code>infra/</code> directory."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q44) The <code>.claude/rules/</code> directory with YAML frontmatter path scoping is the correct mechanism for conditionally loading conventions. Setting <code>paths: [\"infra/**/*\"]</code> ensures the Terraform rules load only when editing files in that directory tree. Option A would work for files inside <code>infra/</code> but cannot use glob patterns to further filter by file type. Option C relies on Claude's inference rather than explicit path matching, leading to inconsistent behavior. Option D requires manual skill invocation and does not activate automatically."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.4",
   "stem": "You've been assigned to restructure a monolithic application into microservices. This will involve changes across dozens of files and requires decisions about service boundaries and module dependencies. Which approach should you take?",
   "opts": [
    "Enter plan mode to explore the codebase, understand dependencies, and design an implementation approach before making changes.",
    "Start with direct execution and make changes incrementally, letting the implementation reveal the natural service boundaries.",
    "Use direct execution with comprehensive upfront instructions detailing exactly how each service should be structured.",
    "Begin in direct execution mode and only switch to plan mode if you encounter unexpected complexity during implementation."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q5) Plan mode is designed for complex tasks involving large-scale changes, multiple valid approaches, and architectural decisions. Option B risks costly rework when dependencies are discovered late. Option C assumes you already know the right structure without exploring the code. Option D ignores that the complexity is already stated."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.4",
   "stem": "A developer asks Claude Code to add a single null-check to one function in a utility module. The function signature, expected behavior, and fix are all clear. Should they use plan mode or direct execution?",
   "opts": [
    "Plan mode, because any code change could have unexpected side effects that need exploration before committing.",
    "Direct execution, because the task is well-scoped with a clear fix that does not require architectural decisions or multi-file analysis.",
    "Plan mode, because exploring the codebase first prevents Claude from making assumptions about dependencies.",
    "Use direct execution first, but run a quick plan mode scan afterward to catch any side effects before committing."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q45) Direct execution is appropriate for simple, well-understood, single-location changes with clear scope. Plan mode is designed for tasks involving large-scale changes, multiple valid approaches, architectural decisions, or multi-file modifications. A null-check to one function meets none of the criteria for plan mode. Options A and C describe an over-cautious heuristic that does not reflect the intended use of plan mode. Option D inverts the correct workflow: plan mode is used before execution to explore and decide, not after as a post-execution check."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.4",
   "stem": "A developer is using plan mode to explore a large codebase before deciding how to approach a library migration. During exploration, Claude generates dozens of tool results including full file reads, search outputs, and dependency traces. The developer notices the main conversation context is filling up rapidly and fears context exhaustion before the plan is complete. What is the most appropriate technique to preserve main session context during verbose exploration?",
   "opts": [
    "Switch to direct execution partway through exploration so that Claude uses fewer tool calls.",
    "Use the Explore subagent to isolate verbose discovery output, having it return a structured summary to the main session rather than accumulating raw results.",
    "Run <code>/compact</code> immediately after each tool call to keep the context window from growing.",
    "Restrict Claude to reading only entry point files during plan mode to limit tool call volume."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q46) The Explore subagent is specifically designed to isolate verbose discovery work from the main conversation context. It performs the exploration and returns a structured summary, preventing raw tool results from consuming the main session's context budget. Option A abandons the architectural exploration prematurely. Option C helps but running <code>/compact</code> after every tool call is operationally cumbersome and loses detail that may still be needed. Option D artificially limits the exploration and would produce an incomplete analysis for complex migrations."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.5",
   "stem": "A developer asks Claude Code to reformat date strings in a data pipeline. After the first attempt, the output format is partially correct but inconsistent: some dates are formatted as <code>YYYY-MM-DD</code>, others as <code>MM/DD/YYYY</code>. Prose instructions like \"always use ISO 8601\" have been tried twice without improvement. What technique is most likely to resolve the inconsistency?",
   "opts": [
    "Rewrite the instruction to be more emphatic, using capitalization and repetition to signal importance.",
    "Provide 2-3 concrete input/output examples showing the exact transformation expected, including edge cases like two-digit years and ambiguous formats.",
    "Switch to plan mode so Claude can explore the codebase before formatting dates.",
    "Ask Claude to generate a formatting function first, then apply it in a second pass."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q47) Concrete input/output examples are the most effective way to communicate expected transformations when prose instructions are interpreted inconsistently. Showing <code>\"3/15/2024\" -&gt; \"2024-03-15\"</code> is unambiguous in a way that \"use ISO 8601\" is not. Option A is unlikely to improve results; emphasis does not resolve ambiguity. Option C is for architectural decisions, not formatting refinement. Option D adds complexity and still does not clarify what the correct transformation looks like."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.5",
   "stem": "A development team is using Claude Code to implement a new authentication module. Before any implementation begins, the team lead wants to ensure Claude surfaces potential security considerations, edge cases, and design tradeoffs that the team may not have anticipated. Which iterative refinement technique is most appropriate here?",
   "opts": [
    "Write a detailed specification document and pass it to Claude for direct implementation.",
    "Use the interview pattern: ask Claude to question the team about their requirements, constraints, and assumptions before proposing a design.",
    "Start with a minimal implementation and iterate by describing issues found during code review.",
    "Provide a complete test suite first and ask Claude to write code that passes all tests."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q48) The interview pattern is designed to surface design considerations and uncover assumptions the developer may not have anticipated before any implementation begins. It is particularly valuable in domains like security where overlooked edge cases carry high risk. Option A bypasses the opportunity to surface gaps before implementation is locked in. Option C defers the discovery of design issues until after implementation, when the cost of changes is higher. Option D (test-driven iteration) is effective for well-defined behavior but cannot surface considerations the team has not yet thought of."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.5",
   "stem": "Claude Code generated a data transformation function that has three separate issues: an off-by-one error in a loop, a missing null check for an optional field, and an incorrect sort order. Each issue is in a completely different part of the function and none of them interact. What is the recommended approach for addressing these issues?",
   "opts": [
    "Report all three issues in a single detailed message so Claude has full context for all fixes at once.",
    "Fix them sequentially: address each issue in a separate message and verify the fix before moving to the next.",
    "Ask Claude to regenerate the entire function from scratch rather than patching the existing code.",
    "Address the off-by-one error and null check together since they are in loops, then fix the sort order separately."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q49) When issues are independent, sequential iteration is appropriate: fixing each one separately and verifying the fix before moving on reduces the chance of fixes interfering with each other and makes each change easier to review. The guidance for sending all issues in a single message applies when the issues interact and Claude needs full context to resolve them together. Option A is suited to interacting problems, not independent ones. Option C discards working code unnecessarily. Option D creates an arbitrary grouping not based on actual interaction."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.5",
   "stem": "A developer has identified three issues in a data processing module: two logic bugs that interact because they both affect the same intermediate result, and a set of five inconsistent variable names scattered across multiple files. The logic bugs produce incorrect output only when both are present; the naming violations are independent style issues. How should these issues be addressed using iterative refinement?",
   "opts": [
    "Report all eight issues in a single message so Claude can resolve them together with full context.",
    "Send the two interacting logic bugs in one message so Claude can resolve them together, then address the naming violations sequentially in separate follow-up messages after verifying the bug fixes.",
    "Fix all naming violations first since they are simpler, then tackle the two logic bugs in a single message.",
    "Fix each of the eight issues in eight separate sequential messages, verifying each before proceeding."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q51) The guidance for batching issues is based on whether they interact. The two logic bugs interact and Claude needs full context on both to resolve them correctly, so they should be reported together. The naming violations are independent and do not affect correctness, so sequential iteration is appropriate: fix each one and verify before moving to the next. Option A lumps all issues together, which adds noise when Claude is resolving the interacting bugs. Option C addresses ordering by complexity rather than by interaction. Option D applies sequential iteration to interacting bugs, which risks an incomplete fix."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.5",
   "stem": "A team is adding a caching layer to an existing microservice. The service was written two years ago by engineers who are no longer on the team, and its internal patterns for dependency injection and lifecycle management are unfamiliar to the current developer. Before writing any code, the developer wants to ensure Claude surfaces all relevant design considerations. Which iterative refinement technique is most appropriate?",
   "opts": [
    "Ask Claude to implement a generic Redis-based caching layer using standard patterns for the framework, then review its output for compatibility issues.",
    "Use the interview pattern: ask Claude to question you about the service's architecture, existing lifecycle hooks, and caching requirements before proposing any design.",
    "Provide the service's entry point files to Claude and ask it to generate a caching design document for review.",
    "Start with a minimal proof-of-concept cache for one endpoint and iterate by describing any failures encountered during testing."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q52) The interview pattern is specifically designed for situations where the developer may not have anticipated all relevant design considerations. By asking Claude to question the developer about the service's patterns and constraints before implementing, it surfaces assumptions about lifecycle management, cache invalidation strategy, and dependency injection that the developer may not have known to specify upfront. Option A proceeds with generic patterns that may be incompatible with the unfamiliar service. Option C produces a design document but does not interactively surface considerations the developer has not yet thought of. Option D defers discovery to runtime failures rather than surfacing design issues before any code is written."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.6",
   "stem": "Your pipeline script runs <code>claude \"Analyze this pull request for security issues\"</code> but the job hangs indefinitely. Logs indicate Claude Code is waiting for interactive input. What's the correct approach?",
   "opts": [
    "Add the <code>-p</code> flag: <code>claude -p \"Analyze this pull request for security issues\"</code>",
    "Set the environment variable <code>CLAUDE_HEADLESS=true</code> before running the command",
    "Redirect stdin from <code>/dev/null</code>: <code>claude \"Analyze this pull request for security issues\" &lt; /dev/null</code>",
    "Add the <code>--batch</code> flag: <code>claude --batch \"Analyze this pull request for security issues\"</code>"
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q10) The <code>-p</code> (or <code>--print</code>) flag is the documented way to run Claude Code in non-interactive mode. Options B and D reference non-existent features. Option C is a Unix workaround that doesn't properly address Claude Code's command syntax."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.6",
   "stem": "A CI pipeline runs Claude Code to generate test cases for each pull request. The team discovers that Claude is consistently suggesting test scenarios that already exist in the existing test files, wasting review time. Which approach in the CLAUDE.md configuration most directly addresses this problem?",
   "opts": [
    "Add the <code>-p</code> flag to the CI invocation command to prevent interactive prompts.",
    "Use <code>--output-format json</code> with <code>--json-schema</code> so that test suggestions are machine-parseable for deduplication.",
    "Document in <code>CLAUDE.md</code> the testing standards, available fixtures, and instruct Claude to review existing test files before suggesting new scenarios.",
    "Add a post-processing script to the pipeline that compares Claude's suggestions against the existing test files and filters duplicates."
   ],
   "ans": [
    2
   ],
   "why": "(Alter set · Q50) Providing existing test files in context and documenting testing standards in <code>CLAUDE.md</code> directly instructs Claude to avoid duplicate suggestions at generation time. This is the most efficient fix because it addresses the root cause: Claude does not know what tests already exist. Option A prevents interactive hangs but does not affect test content. Option B improves parseability but does not prevent duplicate suggestions. Option D is a workaround that adds pipeline complexity without fixing the underlying issue."
  },
  {
   "scen": 2,
   "d": 3,
   "ts": "3.6",
   "stem": "A CI pipeline uses Claude Code to review pull requests and needs to post inline comments on specific lines in GitHub. The pipeline currently receives Claude's output as unstructured text, which requires a fragile regex parser to extract file paths, line numbers, and comment text. The parser breaks regularly as Claude's output format drifts between runs. What is the most robust solution?",
   "opts": [
    "Add stricter formatting instructions to the system prompt specifying the exact text structure expected, and add validation to reject any response that does not match.",
    "Use <code>--output-format json</code> combined with <code>--json-schema</code> to define a schema with <code>file</code>, <code>line</code>, and <code>comment</code> fields, so each finding is machine-parseable by construction.",
    "Add a post-processing step that uses a second Claude call to normalize the first response into a consistent structured format.",
    "Switch from inline comments to a single summary comment, which is easier to extract since it does not require line-level parsing."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q53) Using <code>--output-format json</code> with <code>--json-schema</code> produces structured output that conforms to the defined schema by construction, eliminating format drift entirely. The pipeline can parse the JSON directly without a regex layer. Option A makes prompt instructions more rigid but still relies on Claude maintaining format consistency across runs, which is the root cause of the breakage. Option C adds latency and cost by introducing a second API call for normalization. Option D changes the feature behavior to work around the parsing problem rather than solving it."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.1",
   "stem": "A CI code review prompt flags 60% of pull requests for \"potential security vulnerabilities.\" Developers have stopped reading the reports because nearly all flags are false positives on standard input validation patterns they consider acceptable. Adding \"only report high-confidence findings\" to the prompt has had no measurable effect. What is the most effective next step?",
   "opts": [
    "Replace the security review prompt with a rule-based static analysis tool that has zero false positives.",
    "Temporarily disable the security category and add explicit criteria defining which patterns constitute a reportable vulnerability versus acceptable practice, with concrete code examples for each.",
    "Increase the review model to a larger tier to improve its judgment on security issues.",
    "Add a post-processing confidence threshold: discard any finding where Claude rates its own confidence below 80%."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q55) General instructions like \"only report high-confidence findings\" fail to reduce false positives because they do not define what counts as a positive. Temporarily disabling the noisy category restores developer trust immediately while explicit criteria with examples give Claude the specificity needed to distinguish real issues from acceptable patterns. Option A abandons the AI-based review entirely rather than fixing it. Option C is unlikely to change false positive rates when the root cause is imprecise criteria. Option D relies on self-reported confidence scores, which are poorly calibrated for LLMs."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.1",
   "stem": "A Claude-based pull request reviewer raises \"magic number\" warnings on every numeric literal in the codebase, including well-understood constants like HTTP status codes and standard buffer sizes. Developers want magic numbers flagged only when they appear in business logic with no explanation. How should the prompt be updated?",
   "opts": [
    "Add an instruction to \"use good judgment about whether numbers are truly magic numbers.\"",
    "Define explicit criteria: flag numeric literals that appear in business logic calculations with no accompanying comment or named constant; exclude HTTP status codes, standard buffer sizes, and any value documented in a comment.",
    "Add a severity field to findings and instruct Claude to omit any finding with severity \"low.\"",
    "Provide a list of allowed numeric values that should never be flagged."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q56) Explicit, specific criteria that define what to report and what to exclude are far more effective than general guidance or exclusion lists. Describing the precise conditions that make a number \"magic\" gives Claude a clear decision rule rather than requiring inference. Option A is the kind of vague instruction that causes the problem in the first place. Option C introduces a severity layer that does not address the underlying definitional problem. Option D would require maintaining an incomplete and fragile list that does not generalize to new values."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.1",
   "stem": "A Claude-based code reviewer is generating inconsistent feedback on documentation quality: sometimes flagging missing docstrings for private helper functions, sometimes not; sometimes requiring full parameter descriptions, sometimes accepting one-line summaries. The team wants consistent, predictable documentation feedback on public API functions only. Which change most directly addresses the inconsistency?",
   "opts": [
    "Instruct Claude to \"apply documentation standards consistently and carefully.\"",
    "Define explicit documentation criteria: public API functions must have a docstring with a one-sentence summary, parameter descriptions, and return value description; private functions are excluded from documentation checks.",
    "Run three parallel review instances and accept feedback that appears in at least two of the three.",
    "Restrict the review prompt to only one concern at a time, alternating between security, documentation, and style in separate runs."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q57) Explicit criteria that specify exactly what is required, for which functions, and at what level of detail eliminate the ambiguity that causes inconsistency. Without a clear definition of \"documented,\" Claude must infer the threshold each time, leading to variable results. Option A is the type of general instruction that already produces the problem. Option C adds overhead and suppresses legitimate feedback that may only appear in one instance. Option D separates concerns but does not fix the definition of what counts as adequate documentation."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.2",
   "stem": "A team uses Claude to generate code review comments for pull requests. The comments are technically accurate but vary widely in format: some include file paths and line numbers, others are vague summaries, some use bullet points, and others write prose paragraphs. Developers want a consistent, actionable format: file path, line number, issue description, suggested fix. What is the most effective way to achieve this?",
   "opts": [
    "Add a format specification to the system prompt listing the required fields.",
    "Provide 2-4 few-shot examples in the prompt showing the exact desired output format for different types of issues, including file path, line number, issue description, and suggested fix.",
    "Use <code>--output-format json</code> and parse the results in a post-processing step to normalize format.",
    "Ask Claude to self-review its output and reformat any comment that does not match the required structure."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q58) Few-shot examples demonstrating the exact desired output format are the most effective technique for achieving consistently formatted output when detailed instructions alone produce inconsistent results. Seeing concrete examples of the format makes the requirement unambiguous. Option A is a format specification that has likely already been tried given the problem description. Option C introduces parsing complexity and does not ensure consistent generation. Option D adds a round-trip that may still produce inconsistent intermediate output."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.2",
   "stem": "A structured data extraction system is extracting contract clauses from legal documents. The model handles standard clauses well but consistently misclassifies ambiguous clauses that could fit two or more categories, such as a clause that contains both termination conditions and force majeure language. What few-shot prompting approach is most effective for improving accuracy on these edge cases?",
   "opts": [
    "Add more few-shot examples of standard, unambiguous clauses to reinforce the classification schema overall.",
    "Create targeted few-shot examples that specifically demonstrate ambiguous-case handling: showing the reasoning for why a clause with both termination and force majeure language belongs to one category and not the other.",
    "Switch from classification to extraction: ask Claude to extract the clause text without categorizing it, then apply a rule-based classifier.",
    "Add a confidence score field and route all low-confidence classifications to human review without attempting to improve the model's judgment."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q59) Targeted few-shot examples for ambiguous scenarios that show the reasoning behind the classification decision are the most effective technique for improving handling of edge cases. Standard examples do not teach the model how to handle cases that span category boundaries. Option A reinforces behavior that already works rather than addressing the gap. Option C sidesteps the classification problem rather than solving it. Option D is a reasonable operational safeguard but does not improve model accuracy."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.2",
   "stem": "A document extraction system uses Claude to pull financial figures from quarterly earnings reports. The reports have varied formats: some use tables, some use inline prose, some use both. Extraction accuracy for tabular data is high (94%) but prose-only documents show only 72% accuracy. What is the most targeted approach to improve prose extraction accuracy?",
   "opts": [
    "Increase the system prompt's emphasis on accuracy with stronger language and more detailed instructions.",
    "Add few-shot examples specifically showing correct extraction from prose-formatted documents, including cases where numbers appear in sentence form rather than tables.",
    "Pre-process all documents to convert prose financial data into table format before sending to Claude.",
    "Use a separate prompt for prose documents that instructs Claude to first identify all sentences containing numbers, then extract figures from those sentences only."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q60) Few-shot examples demonstrating correct extraction from documents with varied formats directly address the accuracy gap on prose documents. The model already generalizes well to tabular data; the gap is in prose, and targeted examples for that format close the gap most efficiently. Option A relies on emphasis, which does not resolve structural pattern differences. Option C requires reliable pre-processing of arbitrarily structured prose, which is non-trivial. Option D adds complexity and may miss numbers that are discussed without appearing in sentences Claude isolates."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.3",
   "stem": "Your extraction pipeline uses a prompt that requests JSON output with a code block. In production, approximately 3% of responses have JSON syntax errors: missing commas, unescaped characters, or truncated objects. These errors break your downstream parser and require manual reprocessing. What is the most reliable way to eliminate JSON syntax errors?",
   "opts": [
    "Add a validation step that re-runs the prompt if the output fails JSON parsing, up to 3 retries.",
    "Switch to tool use with a defined JSON schema as the input parameter; extract structured data from the <code>tool_use</code> response block.",
    "Add an instruction to the prompt: \"Your response must be valid JSON. Double-check for syntax errors before responding.\"",
    "Use a regex post-processor to fix the most common syntax errors before passing output to the parser."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q61) Tool use with a JSON schema guarantees schema-compliant structured output by construction, eliminating syntax errors entirely. The model populates the tool call's input parameters according to the schema rather than generating free-text JSON. Option A reduces the frequency of failures but does not eliminate syntax errors. Option C relies on model self-checking, which does not provide the deterministic guarantee that tool use provides. Option D is a fragile workaround that cannot handle all syntax error patterns."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.3",
   "stem": "Your structured data extraction pipeline processes invoices. You have two extraction tools: <code>extract_invoice_schema</code> and <code>extract_receipt_schema</code>. For each document, you do not know in advance which type it is. After switching to <code>tool_choice: \"auto\"</code>, you observe that 30% of the time the model returns a text description of what it found rather than calling either tool. What is the correct fix?",
   "opts": [
    "Set <code>tool_choice: \"any\"</code> to guarantee the model calls one of the available extraction tools without specifying which one.",
    "Set <code>tool_choice: {\"type\": \"tool\", \"name\": \"extract_invoice_schema\"}</code> to always call a specific tool.",
    "Add a system prompt instruction: \"Always call one of the extraction tools and never return text.\"",
    "Merge both schemas into a single <code>extract_document_schema</code> tool with an optional <code>document_type</code> field."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q62) <code>tool_choice: \"any\"</code> guarantees the model calls a tool rather than returning conversational text, without requiring you to specify which tool. This is exactly the documented use case when you have multiple valid tools and want to ensure one is called. Option B forces a specific tool, which defeats the purpose when you do not know the document type in advance. Option C is a prompt-based approach with probabilistic compliance, which already failed as evidenced by the 30% text response rate. Option D is a valid architectural change but requires more engineering effort than a single configuration change."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.4",
   "stem": "An invoice extraction pipeline uses tool use with a strict JSON schema. After validation, 8% of extracted invoices fail a business rule check: the sum of line item amounts does not equal the <code>total_amount</code> field. These are semantic errors, not schema syntax errors. The invoices are well-formed documents with no missing data. How should you implement the retry loop?",
   "opts": [
    "Retry up to 3 times with the same prompt; schema-compliant extraction will converge on a valid answer with additional attempts.",
    "On failure, append the original document, the failed extraction, and the specific validation error (\"line items sum to X but total_amount is Y\") to the follow-up prompt for model self-correction.",
    "Flag all invoices with this error as missing data and route them directly to human review without retry.",
    "Add a <code>calculated_total</code> field to the schema and populate it with the sum of line items in post-processing, then use the calculated total as the canonical value."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q63) Retry-with-error-feedback works by giving the model the specific discrepancy it needs to self-correct. Since the invoices are well-formed and the data is present, the model has the information it needs to fix the arithmetic alignment on retry. Option A retries without feedback and is unlikely to improve results since the model will reproduce the same error. Option C routes to human review prematurely when a retry with feedback could resolve the issue. Option D silently replaces the model's extracted total with a calculated value, which could propagate errors if the line items themselves were extracted incorrectly."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.4",
   "stem": "A CI code review pipeline is generating false positive findings at a high rate. The team wants to understand which specific code constructs are being flagged incorrectly so they can refine the prompt. The current findings output only includes <code>file</code>, <code>line</code>, and <code>description</code>. What schema change would best enable systematic false positive analysis?",
   "opts": [
    "Add a <code>confidence</code> field (0-100) to each finding so the team can filter by confidence threshold.",
    "Add a <code>detected_pattern</code> field to each finding that records the specific code construct or pattern that triggered the finding.",
    "Add a <code>category</code> field so findings can be grouped by issue type for aggregate analysis.",
    "Add an <code>is_false_positive</code> boolean field and instruct Claude to self-label its own false positives."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q64) The <code>detected_pattern</code> field directly captures what code construct triggered each finding, enabling the team to identify which patterns produce the most false positives and update prompt criteria accordingly. Option A provides confidence scores but does not identify what prompted the finding. Option C allows grouping but not pattern-level debugging. Option D asks Claude to self-identify its own false positives, which is unreliable since the model cannot accurately distinguish true from false positives without ground truth."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.4",
   "stem": "A financial document extraction pipeline is failing on the \"guarantor address\" field for a set of loan summaries. After 3 retry attempts with error feedback, the field still extracts as null. Each retry prompt includes the original document and the validation error. What should you investigate before scheduling further retries?",
   "opts": [
    "Increase the retry limit from 3 to 5, since complex field extraction may require more attempts to converge.",
    "Check whether the guarantor address is actually present in the loan summary document, or whether the document only references it by directing the reader to an external exhibit.",
    "Switch to a larger model tier for the retry attempts, since the current model may lack the reasoning capacity for this field.",
    "Restructure the schema to make the guarantor address field optional, allowing the pipeline to proceed when the field cannot be extracted."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q67) Retries are only effective when the information needed to satisfy the validation is present in the document. A loan summary that references guarantor details in an external exhibit does not contain the address. No number of retries will extract information that is not in the input. Before adding retry cycles, validate that the target field is actually present in the source document. Option A adds more retries without diagnosing why the existing retries are failing. Option C may improve performance on difficult extractions but does not address absence of data. Option D removes the validation rather than diagnosing the root cause."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.5",
   "stem": "Your team wants to reduce API costs. Two workflows: (1) a blocking pre-merge check that must complete before developers can merge, and (2) a technical debt report generated overnight for review the next morning. Your manager proposes switching both to the Message Batches API for 50% cost savings. How should you evaluate this proposal?",
   "opts": [
    "Use batch processing for the technical debt reports only; keep real-time calls for pre-merge checks.",
    "Switch both workflows to batch processing with status polling to check for completion.",
    "Keep real-time calls for both workflows to avoid batch result ordering issues.",
    "Switch both to batch processing with a timeout fallback to real-time if batches take too long."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q11) The Message Batches API has up to 24-hour processing times with no guaranteed latency SLA. This makes it unsuitable for blocking pre-merge checks but ideal for overnight batch jobs. Option B is wrong because relying on \"often faster\" completion isn't acceptable for blocking workflows. Option C reflects a misconception: batch results can be correlated using <code>custom_id</code> fields."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.5",
   "stem": "A compliance team runs a weekly audit that analyzes 50,000 contract documents for regulatory clauses. The audit results are reviewed by a compliance analyst every Monday morning. The team is considering the Message Batches API. A colleague raises a concern: \"What if a batch fails partway through the 50,000 documents?\" How should partial batch failures be handled?",
   "opts": [
    "Always resubmit the entire batch; tracking partial failures adds implementation complexity.",
    "Use the <code>custom_id</code> field to correlate each request with its response, identify which documents returned error responses, and resubmit only those documents in a new batch.",
    "Set a shorter processing window timeout to force faster completion and reduce the risk of partial failures.",
    "Switch to real-time API calls with retry logic; the batch API is not suitable for mission-critical compliance workloads."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q65) The <code>custom_id</code> field is specifically designed for correlating batch request and response pairs, enabling teams to identify which documents failed and resubmit only those, avoiding the cost of reprocessing the entire batch. Option A wastes 50% cost savings by reprocessing successful documents. Option C misunderstands the batch API; processing windows are managed by Anthropic and cannot be shortened on demand. Option D is overly conservative: the batch API is appropriate for non-blocking, latency-tolerant compliance audits, which this workflow is."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.6",
   "stem": "A pull request modifies 14 files across the stock tracking module. Your single-pass review produces inconsistent results: detailed feedback for some files, superficial comments for others, obvious bugs missed, and contradictory feedback. How should you restructure the review?",
   "opts": [
    "Split into focused passes: analyze each file individually for local issues, then run a separate integration-focused pass examining cross-file data flow.",
    "Require developers to split large PRs into smaller submissions of 3-4 files before the automated review runs.",
    "Switch to a higher-tier model with a larger context window to give all 14 files adequate attention in one pass.",
    "Run three independent review passes on the full PR and only flag issues that appear in at least two of the three runs."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q12) Splitting reviews into focused passes directly addresses attention dilution. Option B shifts burden to developers without improving the system. Option C misunderstands that larger context windows don't solve attention quality issues. Option D would suppress detection of real bugs by requiring consensus on issues that may only be caught intermittently."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.6",
   "stem": "A developer generates a 300-line module using Claude Code in one session, then asks the same session to review the code for bugs. The review returns \"looks good\" with minor style suggestions but misses two logic errors that a colleague catches in manual review. What is the most likely cause, and what architectural change addresses it?",
   "opts": [
    "The context window was too large; the fix is to limit code generation to smaller chunks so the review has less to process.",
    "The reviewing instance retains reasoning context from generation, making it less likely to question its own decisions. Use a second independent Claude instance without the generation context to perform the review.",
    "The review prompt was too vague; adding more explicit review criteria to the same session would catch the missed errors.",
    "The model tier used for generation is more capable than the one used for review; switching both to the same tier resolves the quality gap."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q66) Self-review limitation is a known pattern: when a model retains the reasoning context from code generation, it is less likely to identify errors in its own output. An independent review instance without the generator's context approaches the code without prior assumptions and catches issues the generating instance would overlook. Option A addresses context length, not reasoning context bias. Option C might improve detection of certain categories of issues but does not address the fundamental self-review limitation. Option D addresses model selection, not the structural problem of reviewing one's own output."
  },
  {
   "scen": 3,
   "d": 4,
   "ts": "4.6",
   "stem": "A developer builds a code generation pipeline where Claude generates a 200-line module, and then the same session reviews the generated code for correctness. The review returns only minor style suggestions and misses a logic error in the error handling path. A second developer reviewing the code manually finds the bug immediately. What architectural change would make the review phase more effective?",
   "opts": [
    "Add more explicit review criteria to the generation session's system prompt to help it catch logic errors.",
    "Use a second independent Claude instance without the generation context to perform the review, since the generating instance retains reasoning context that makes it less likely to question its own decisions.",
    "Run the review immediately after generation before any other tool calls accumulate in the context window.",
    "Switch to a larger model tier for the review step to improve reasoning quality."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q68) When a model reviews code it generated in the same session, it retains the reasoning context from generation and is less likely to identify errors in its own output. An independent review instance approaches the code without prior assumptions and catches issues the generating instance overlooks. This is the documented rationale for multi-instance review architectures. Option A improves the review prompt but does not address the fundamental self-review limitation. Option C manages context length but does not remove the generator's retained reasoning bias. Option D improves general capability but does not change the structural problem of a model reviewing its own work."
  },
  {
   "scen": 4,
   "d": 5,
   "ts": "5.1",
   "stem": "A customer support agent is handling a complex billing dispute that spans 20+ turns. A customer mentioned early in the conversation that they were charged $847.50 on March 3rd for a service they cancelled on February 28th. Midway through the conversation, the agent references the charge as \"the overcharge from last month\" without the specific amount. The customer disputes the agent's understanding of the case. What context management technique would prevent this?",
   "opts": [
    "Use <code>/compact</code> at the start of each conversation to summarize prior turns into a shorter representation.",
    "Extract transactional facts (amounts, dates, order numbers, statuses) into a persistent \"case facts\" block that is included at the beginning of every subsequent prompt in the conversation.",
    "Increase the model's context window by switching to a larger tier to retain the full conversation without summarization.",
    "Instruct the agent to re-read the full conversation history before each response."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q69) Extracting precise transactional facts into a persistent \"case facts\" block ensures that specific numerical values, dates, and customer-stated details are explicitly available in every prompt turn rather than buried in growing conversation history. Progressive summarization risks condensing these details into vague references like \"overcharge from last month.\" Option A's compaction is useful for context length management but can lose precision on transactional facts. Option C does not prevent progressive summarization and is not a reliable solution. Option D is not practical for long conversations and still does not prevent facts from being lost as context grows."
  },
  {
   "scen": 4,
   "d": 5,
   "ts": "5.1",
   "stem": "A multi-agent research pipeline aggregates findings from six subagents, each returning 800-1,200 tokens of raw tool output and reasoning. The synthesis agent receives all results in a single large message. The final report consistently omits or contradicts findings that appeared in the middle sections of the aggregated input. What is the most likely cause and the most effective mitigation?",
   "opts": [
    "The subagents are returning conflicting information; add a deduplication step before synthesis.",
    "The synthesis agent is hitting its output token limit; increase <code>max_tokens</code> to allow a longer response.",
    "The \"lost in the middle\" effect causes models to reliably process content at the beginning and end of long inputs but miss middle sections. Mitigate by placing key findings summaries at the beginning of aggregated inputs and organizing sections with explicit headers.",
    "The synthesis agent's context window is exhausted; route some subagent outputs through a secondary summarization agent before passing to synthesis."
   ],
   "ans": [
    2
   ],
   "why": "(Alter set · Q70) The \"lost in the middle\" effect is a well-documented limitation where models attend less reliably to content in the middle of long inputs. Placing key findings at the beginning and using explicit section headers to organize the aggregated input significantly mitigates this effect. Option A addresses data consistency but not the positional attention problem. Option B addresses output length, not input attention. Option D adds pipeline complexity and may help with context length, but does not address the positional attention issue on its own."
  },
  {
   "scen": 4,
   "d": 5,
   "ts": "5.2",
   "stem": "Your agent achieves 55% first-contact resolution, well below the 80% target. Logs show it escalates straightforward cases while attempting to autonomously handle complex situations requiring policy exceptions. What's the most effective way to improve escalation calibration?",
   "opts": [
    "Add explicit escalation criteria to your system prompt with few-shot examples demonstrating when to escalate versus resolve autonomously.",
    "Have the agent self-report a confidence score (1-10) before each response and automatically route requests to humans when confidence falls below a threshold.",
    "Deploy a separate classifier model trained on historical tickets to predict which requests need escalation before the main agent begins processing.",
    "Implement sentiment analysis to detect customer frustration levels and automatically escalate when negative sentiment exceeds a threshold."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q3) Adding explicit escalation criteria with few-shot examples directly addresses the root cause: unclear decision boundaries. Option B fails because LLM self-reported confidence is poorly calibrated. Option C is over-engineered. Option D solves a different problem entirely."
  },
  {
   "scen": 4,
   "d": 5,
   "ts": "5.2",
   "stem": "A customer opens a support chat saying \"I'd like to speak to a human please. I've been dealing with this billing issue for three weeks and I'm frustrated.\" The agent has already identified this as a standard billing adjustment that it can resolve in 2 steps using its available tools. Your agent responds by saying \"I can help with that right away, let me pull up your account.\" and proceeds to investigate. The customer repeats their request for a human. What is wrong with this behavior and what should be corrected?",
   "opts": [
    "The agent should honor an explicit customer request for a human agent immediately on first request, without attempting investigation first.",
    "The agent should detect negative sentiment and escalate once the frustration score exceeds a defined threshold.",
    "The agent should complete its investigation, present the proposed solution, and escalate only if the customer still insists afterward.",
    "The agent should apologize for the wait, then proceed with automated resolution since the case is within its capability."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q71) When a customer explicitly requests a human agent, that request must be honored immediately regardless of whether the agent believes it can resolve the issue. Proceeding with investigation after a clear escalation request violates the design principle documented in Task 5.2. Option B introduces sentiment scoring as a proxy, but the customer has already expressed an explicit preference. Sentiment analysis is irrelevant here. Option C delays honoring the request while investigation proceeds, which further frustrates the customer. Option D is the agent's current incorrect behavior: capability is not the deciding factor when a customer has made an explicit request."
  },
  {
   "scen": 4,
   "d": 5,
   "ts": "5.3",
   "stem": "Your web search subagent encounters a timeout while fetching results for a competitor analysis. The engineering team implements a change so the subagent catches the timeout internally and returns an empty result set with <code>status: \"success\"</code> and <code>results: []</code>. The coordinator receives this and the synthesis agent produces a report that is missing the competitive section entirely, with no indication anything went wrong. What is the problem with this approach?",
   "opts": [
    "Silently returning an empty success result prevents the coordinator from making any recovery decision and allows incomplete work to pass as complete output.",
    "The synthesis agent should be responsible for detecting empty sections and re-triggering the search subagent directly.",
    "The coordinator should always validate that each subagent returned non-empty results before proceeding to synthesis.",
    "The timeout threshold should be increased so that the subagent does not time out before returning real results."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q72) Silently suppressing errors by returning empty results as success is an explicitly documented anti-pattern. It removes the coordinator's ability to recover, retry, or annotate output with coverage gaps. Option B incorrectly shifts the recovery responsibility to the synthesis agent, which lacks the tools and context to re-run searches. Option C adds coordinator-level validation as a safeguard, but it does not address the root cause: the subagent is misrepresenting failure as success. Option D addresses the symptom (timeout threshold) rather than the error propagation design flaw."
  },
  {
   "scen": 4,
   "d": 5,
   "ts": "5.4",
   "stem": "An agent is performing a deep exploration of a 200,000-line legacy codebase to understand its payment processing flow. After approximately 90 minutes and dozens of file reads, the agent begins referencing \"standard patterns in payment systems\" rather than the specific classes and flows it found earlier, and its answers become inconsistent with findings from the first hour. What is the most likely cause and the best mitigation strategy?",
   "opts": [
    "The agent has reached a rate limit; the fix is to add delays between tool calls to stay within limits.",
    "Context degradation: as the session grows, specific findings from early in the session compete with general knowledge and the agent's position-attention effects. Mitigate by having the agent maintain a scratchpad file recording key findings throughout the session.",
    "The legacy codebase's file structure is too complex for a single agent; break it into independent subsystems and run separate agents on each subsystem simultaneously.",
    "The agent is using the wrong tools; switching from <code>Read</code> to <code>Grep</code> for file exploration would reduce context consumption."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q73) Context degradation in extended sessions is a known pattern: models start giving inconsistent answers and referencing general knowledge rather than specific findings discovered earlier. Having the agent maintain a scratchpad file that records key findings creates a persistent, explicit record that can be referenced and included in subsequent prompts, preventing specific details from being lost to context pressure. Option A misidentifies the cause as a rate limit. Option C adds parallelism but does not address the single-session degradation problem. Option D changes tooling but does not address context growth or degradation."
  },
  {
   "scen": 4,
   "d": 5,
   "ts": "5.4",
   "stem": "You are running a multi-phase codebase investigation using the Claude Agent SDK. After 45 minutes of exploration (reading files, tracing call chains, building a dependency map) you move into the second phase: identifying security vulnerabilities in the authentication module. You notice the agent is now describing the authentication module as \"using standard JWT patterns\" when earlier in the session it had found a custom token signing implementation. What technique would most effectively preserve key findings across these phase boundaries?",
   "opts": [
    "Have the agent maintain a scratchpad file that records key findings after each phase, and reference that file at the start of subsequent phases rather than relying on conversation history.",
    "Use <code>/compact</code> before starting the second phase to free up context space and allow the agent to re-read files as needed.",
    "Restart the session with a fresh context at the start of each phase, passing a manual summary of what you found.",
    "Increase the <code>max_tokens</code> parameter so the model can hold more context without compressing earlier findings."
   ],
   "ans": [
    0
   ],
   "why": "(Alter set · Q74) Scratchpad files are the recommended technique for persisting key findings across context boundaries when context degradation becomes apparent. The agent can write structured notes during exploration and read them back at phase boundaries, ensuring critical findings, like the custom token signing implementation, are not lost to context compression. Option B uses <code>/compact</code> to free up space, but this compresses conversation history and may lose the specific finding about the custom token signing. Option C is a valid but costly approach: restarting sessions loses the accumulated understanding and requires manual intervention. Option D is incorrect because <code>max_tokens</code> controls output length, not context window size, and would not prevent the degradation."
  },
  {
   "scen": 4,
   "d": 5,
   "ts": "5.5",
   "stem": "A structured data extraction system for insurance claims achieves 97% overall accuracy on a validation set. The team proposes automating the full workflow without human review. A colleague argues this aggregate metric masks important risks. What is the most important concern?",
   "opts": [
    "97% accuracy means 3% of claims will have errors, which could create legal liability if unchecked.",
    "Aggregate accuracy metrics can mask poor performance on specific document types or fields. A claim type or field category with 85% accuracy would be hidden by strong performance elsewhere, and stratified analysis is needed before automating.",
    "The validation set may not be representative of production data volumes, so the 97% figure cannot be trusted.",
    "Human review should always be retained regardless of accuracy metrics because automation of insurance decisions creates regulatory risk."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q75) The core risk is that aggregate metrics can hide poor performance on specific segments. A document type with 85% accuracy on a critical field like <code>claim_amount</code> would be masked by strong performance across other document types. Before automating, accuracy should be validated by document type and field segment to confirm consistent performance across all dimensions. Option A is a valid concern but describes the error rate, not the masking risk. Option C raises a data quality concern but is not the most important concern about the specific 97% figure. Option D makes a policy argument that does not engage with the analytical gap identified."
  },
  {
   "scen": 4,
   "d": 5,
   "ts": "5.5",
   "stem": "An extraction pipeline achieves high accuracy on average but the team wants to implement confidence-based routing: high-confidence extractions proceed automatically while low-confidence ones go to human review. A developer proposes using the model's stated confidence scores directly as the routing threshold. What is the critical flaw in this approach?",
   "opts": [
    "Confidence scores add tokens to every response, increasing API costs unnecessarily.",
    "Model confidence scores must be calibrated against a labeled validation set to determine what score threshold actually corresponds to acceptable accuracy. Uncalibrated raw scores are not reliable predictors of extraction correctness.",
    "Confidence scores only work when the model outputs a single extraction; multi-field documents require a different approach.",
    "Routing on confidence scores creates two separate code paths that are harder to maintain than a single uniform review workflow."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q76) A model's raw confidence scores need calibration: without comparing stated confidence against actual correctness on a labeled validation set, there is no reliable mapping between a score of \"0.85\" and an acceptable error rate. Calibrating the threshold ensures that the routing cut-off corresponds to a known accuracy level. Option A is a minor operational concern, not a critical flaw. Option C is incorrect; confidence scores can be applied at the field level for multi-field documents. Option D is an engineering tradeoff, not a flaw in the confidence approach itself."
  },
  {
   "scen": 4,
   "d": 5,
   "ts": "5.6",
   "stem": "A research synthesis agent is combining findings from five subagents that searched different sources. The final report states that \"AI adoption in healthcare reached 45% in 2024\" but does not cite which source this came from. A reviewer cannot verify the claim because the subagents' individual outputs were not preserved. What structural change to the pipeline would prevent this provenance loss?",
   "opts": [
    "Require the synthesis agent to add a generic \"Sources consulted\" section at the end of the report listing all sources accessed.",
    "Require subagents to output structured claim-source mappings (claim text, source URL, document name, relevant excerpt) and instruct the synthesis agent to preserve and merge these mappings into the final report rather than summarizing them away.",
    "Store all raw subagent outputs in a separate log file so they can be consulted if a claim needs verification.",
    "Add a post-synthesis review step where a separate agent checks each claim in the report against the raw subagent outputs."
   ],
   "ans": [
    1
   ],
   "why": "(Alter set · Q77) The root cause of provenance loss is that summarization steps compress findings without preserving claim-to-source mappings. Requiring subagents to output structured mappings and instructing the synthesis agent to preserve and merge them ensures that each claim in the final report carries its source attribution through the pipeline. Option A produces a list of sources consulted but does not link individual claims to specific sources. Option C stores raw data as a fallback but does not integrate provenance into the report itself. Option D adds a verification step after the fact but does not prevent the structural provenance loss."
  }
 ]
};
