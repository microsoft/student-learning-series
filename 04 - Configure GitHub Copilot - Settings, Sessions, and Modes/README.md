# Episode 4 - Configure GitHub Copilot: Settings, Sessions, and Modes

Configure the GitHub Copilot app and choose the right mode for a development task.

## What you'll learn

- How repositories and sessions organize Copilot work.
- How agent instructions, models, reasoning effort, and tool permissions affect a session.
- When to use Interactive, Plan, and Autopilot modes.
- Why worktrees keep changes from separate sessions isolated.

## Try it yourself

1. Open [`index.html`](index.html) to review the starting portfolio.
2. Add an instruction asking Copilot to avoid unnecessary technical jargon.
3. Use Plan mode to propose a hobbies section.
4. Review the plan before allowing Copilot to implement it.

## Prompts

```text
Plan a new hobbies section that matches the existing portfolio. Tell me which files you
would change and wait for my approval before implementing the plan.
```

## Expected result

Copilot produces a reviewable plan and then adds a style-matched hobbies section without
changing unrelated parts of the portfolio.

## Troubleshooting

- If Copilot uses an old goal, start a new session for the new task.
- If a mode is unavailable, update the app and check the current product documentation.
- If a plan includes unwanted changes, revise the plan before selecting an implementation
  mode.
- If changes appear in the wrong session, confirm that the expected repository and
  worktree are open.
