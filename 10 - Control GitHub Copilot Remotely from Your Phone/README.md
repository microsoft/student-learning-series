# Episode 10 - Control GitHub Copilot Remotely from Your Phone

**Phase 2 · Concepts**

In this episode, Jamie adds a polished visual progress experience to their portfolio.
The fixed navigation highlights the current section, and each navigation link fills as
visitors move through its section.

## What you'll learn

- How to start remote control from a Copilot desktop session.
- How to open the same session in the GitHub mobile app with a QR code.
- How to answer clarifying questions from a phone while Copilot works on the computer.
- How to review the completed result in the canvas.

## Try it yourself

1. Open the portfolio and submit the prompt in
   [`demo-assets/prompt.md`](demo-assets/prompt.md).
2. Ask Copilot to request clarifying decisions one at a time.
3. Run `/remote on`, scan the QR code with the GitHub mobile app, and answer from your
   phone.
4. Return to the computer and review the progress navigation in the canvas.

## Prompts

Use the complete prompt in [`demo-assets/prompt.md`](demo-assets/prompt.md). It asks
Copilot to preserve existing features and clarify the design before changing files.

## Expected result

The same Copilot session is available on the computer and phone. The completed portfolio
shows the active section and progress in both desktop and mobile navigation.

## Troubleshooting

- If `/remote on` is unavailable, update the Copilot app and confirm the feature is enabled
  for the signed-in account.
- If the QR code expires, run the command again and scan the new code.
- If the phone opens a different account, sign in to the same GitHub account used by the
  desktop app.
- If the progress indicator does not update, refresh the page and confirm
  `portfolio/script.js` is loaded.

## Demo artifact: Jamie's portfolio with integrated section progress

Folder: [`portfolio/`](portfolio/)

The website carries forward the complete Bootstrap-modernized Episode 9 portfolio,
including the updated resume, case study, hobbies, Trail Journal photo gallery, and two
published blog posts. Episode 10 adds coordinated desktop and mobile section progress
while preserving Bootstrap navigation and cards, responsive behavior, dark mode, reveal
animations, accessibility, and the sticky footer.

### How to open it

From the repository root, run:

```powershell
python -m http.server 8770 --bind 127.0.0.1 --directory .
```

Then open
<http://127.0.0.1:8770/10%20-%20Control%20GitHub%20Copilot%20Remotely%20from%20Your%20Phone/portfolio/>.

The site uses plain HTML, CSS, JavaScript, Markdown source files, and a small
standard-library Python generator. It has no package installation or build-tool
dependency.

## Prompt used in the demo

[`demo-assets/prompt.md`](demo-assets/prompt.md) asks Copilot to create the coordinated
section progress and navigation experience while preserving the site's existing design
and behavior.

## What a viewer can do after this episode

- Design navigation feedback that communicates both location and progress.
- Coordinate scroll position, active-section styling, and per-section progress.
- Preserve responsive navigation, themes, animations, and existing content while adding
  a focused visual feature.
- Run and inspect a dependency-free portfolio locally.
