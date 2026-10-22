/**
 * Shared PoC-mode guidance for the apply workflow.
 *
 * PoC mode is the regular apply loop with the team's engineering principles
 * layered on top, plus PoC workspace rules (no git, assessment folder on
 * first use). It is reached two ways: `/opsx:apply-poc` (always on) and
 * `/opsx:apply poc <change>` (opt-in by argument). Both render this one text
 * through getApplyInstructions(), so the two entry points cannot drift.
 *
 * Add further principles as their own section below principle #2 so each one
 * stays a small, separately reviewable block.
 */
export const POC_MODE_GUIDANCE = `### Principle #2: Divide and Conquer

**Principle:** Break large problems and codebases into smaller, coherent parts that can be understood, developed, and verified independently.

Split software into related components, modules, services, or applications with clear responsibilities and interfaces. The objective is not to create as many pieces as possible, but to keep each development task and its required context small enough to reason about effectively. This is especially valuable in AI-assisted development, where focused context can reduce confusion and improve the quality of changes.

**In practice:**
- Identify natural boundaries based on responsibilities and business capabilities.
- Define clear contracts between parts.
- Work on one bounded component or behavior at a time.
- Keep the code and documentation needed for each task focused.
- Integrate and test the parts together regularly.
- Avoid splitting a simple application into distributed services without a real need.

**Guiding question:** *Can we solve this as a smaller, well-defined problem without losing sight of the whole?*

### PoC workspace rules

- **Local only, no git.** This is a local demo project. Do not run any git command (status, add, commit, branch, push, init, or any other) unless the user asks for that specific command. When a step would normally use git, skip it and say so. Wait for instructions.
- **Assessment folder on first use.** Before grouping tasks, if no tasks are complete yet and the project root holds pre-existing files besides OpenSpec and tool setup (\`openspec/\`, dot-files and dot-folders such as \`.claude/\` or \`.git/\`), list them and propose moving them into \`assessment/\` at the project root. Ask first and wait for the answer; never move them without a yes. If the user declines or picks only some, move only what they approve. After moving, treat \`assessment/\` as reference input: read it, do not edit it.

### How PoC mode changes the apply steps

1. **Group before implementing.** Before step 6, group the pending tasks by component or boundary (one responsibility each) and show the grouping. Keep each task's original order inside its group.
2. **Name the contract first.** For each group, state what crosses its boundary (function signatures, file formats, API shapes, events) before writing code. If a contract cannot be named, pause: the boundary is probably wrong.
3. **One group at a time.** Implement a single group, touching only the files that group owns plus its contracts. Do not start the next group until the current one is done or paused.
4. **Integrate after each group.** Run the group's own tests, then a quick integration check with the parts already built, and report both results.
5. **No premature splits.** Pause and ask before adding a new service, package, or deployable unit unless the change's artifacts state the need. Prefer modules in one process for a PoC.
6. **Close with the boundaries.** In the completion output, add a \`### Boundaries\` section listing each part, its contract, and what was deliberately not split, and why. Also state whether files were moved to \`assessment/\`, and confirm that no git commands were run unless the user asked for them.

These rules add to the apply guardrails; they never override CLI state, task completion criteria, or an explicit user choice.`;
