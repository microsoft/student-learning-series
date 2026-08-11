# Episode 9 - Modernize Your Portfolio with Bootstrap and GitHub Copilot

Use Copilot and Bootstrap 5 to make the portfolio more responsive, accessible, and
interactive.

## What you'll learn

- How to compare front-end framework options for an existing website.
- How Bootstrap grids, navigation, cards, badges, and utilities improve a layout.
- How to ask Copilot for focused visual changes without redesigning unrelated content.
- How to review responsive behavior and accessibility after a framework change.

## Try it yourself

1. Open [`portfolio/index.html`](portfolio/index.html) and review the completed example.
2. Ask Copilot to recommend framework options for one specific design goal.
3. Apply Bootstrap to a copy of your portfolio.
4. Test the navigation, cards, skills, footer, and theme on desktop and mobile widths.

## Prompts

```text
Modernize this portfolio with Bootstrap 5. Add responsive navigation, a sticky footer,
animated cards with clear hover feedback, and badge-styled skills. Preserve the existing
content, theme behavior, and accessibility. Explain the planned changes before editing.
```

## Expected result

The portfolio uses Bootstrap 5 for a responsive layout, accessible navigation, interactive
cards, skill badges, and footer behavior while preserving the original content.

## Troubleshooting

- If Bootstrap styles are missing, confirm that the browser can load the Bootstrap and
  Bootstrap Icons CDN URLs.
- If the mobile menu does not close, confirm the Bootstrap bundle loads before
  `portfolio/script.js`.
- If hover effects are difficult to notice, check keyboard focus styles as well as mouse
  hover styles.
- If a change breaks an existing feature, ask Copilot to compare against the original
  behavior and repair only that regression.
