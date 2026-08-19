# Episode 9 - Modernize Your Portfolio with Bootstrap and GitHub Copilot

Use Copilot and Bootstrap 5 to make the portfolio more responsive, accessible, and
interactive.

## What you'll learn

- How to compare front-end framework options for an existing website.
- How Bootstrap grids, navigation, cards, badges, and utilities improve a layout.
- How to ask Copilot for focused visual changes without redesigning unrelated content.
- How to review responsive behavior and accessibility after a framework change.

## Try it yourself

1. Start the local server below and review the completed portfolio in your browser.
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
cards, skill badges, and footer behavior while preserving the complete Episode 7 state:
the updated resume, case study, hobbies, Trail Journal photo gallery, and two published
blog posts.

## Completed portfolio artifact

[`portfolio/`](portfolio/) is the cumulative completed state after Episode 9. It starts
from the completed Episode 7 portfolio (Episode 8 does not change the artifact), then adds
Bootstrap 5.3.3, Bootstrap Icons, responsive collapsible navigation, cards, badges,
hover and reveal animations, a sticky footer, a back-to-top link, theme behavior, and
accessibility improvements.

### How to open it

From the repository root, run:

```powershell
python -m http.server 8769 --bind 127.0.0.1 --directory .
```

Then open
<http://127.0.0.1:8769/09%20-%20Modernize%20Your%20Portfolio%20with%20Bootstrap%20and%20GitHub%20Copilot/portfolio/>.

## Troubleshooting

- If Bootstrap styles are missing, confirm that the browser can load the Bootstrap and
  Bootstrap Icons CDN URLs.
- If the mobile menu does not close, confirm the Bootstrap bundle loads before
  `portfolio/script.js`.
- If hover effects are difficult to notice, check keyboard focus styles as well as mouse
  hover styles.
- If a change breaks an existing feature, ask Copilot to compare against the original
  behavior and repair only that regression.
