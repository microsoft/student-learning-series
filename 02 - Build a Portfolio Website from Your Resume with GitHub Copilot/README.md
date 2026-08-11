# Episode 2 - Build a Portfolio Website from Your Resume with GitHub Copilot

Turn a resume into a single-page portfolio, then personalize the result with Copilot.

## What you'll learn

- How to give Copilot a resume as source material.
- Why clarifying questions improve the generated website.
- How HTML, CSS, and JavaScript work together in a simple portfolio.
- How to add personal colors, a resume preview, and light and dark themes.

## Try it yourself

1. Review the mock resume in
   [`../common/Jamie Rivera - Resume.pdf`](../common/Jamie%20Rivera%20-%20Resume.pdf).
2. Open [`index.html`](index.html) to inspect the completed example.
3. Repeat the prompt with your own resume after removing information you do not want to
   share publicly.
4. Ask Copilot to make one design choice feel more personal.

## Prompts

```text
Use the attached resume to create a professional single-page portfolio website with
HTML, CSS, and JavaScript. Ask me clarifying questions one at a time before creating
files. Include a resume preview and light and dark themes.
```

## Expected result

The folder contains a working portfolio in `index.html`, `styles.css`, and `script.js`.
The page presents resume information in a readable layout and works in a desktop or
mobile browser.

## Troubleshooting

- If content is inaccurate, correct the resume source or answer Copilot's questions more
  specifically.
- If styling or interactions are missing, confirm `index.html` still references
  `styles.css` and `script.js`.
- If the browser shows an older version, save all files and perform a hard refresh.
