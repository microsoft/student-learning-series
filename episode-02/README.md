# Episode 02 — Build Your Website with AI

Turn a résumé into a live portfolio website using the **GitHub Copilot CLI** — no web-design
background required. The whole episode is one idea: **a good prompt = context + specifics + style.**

- **Persona:** Jamie Rivera (the mock résumé in [`../common/`](../common/)).
- **Deliverable:** a clean, responsive portfolio site generated from Jamie's résumé.

## The four things every strong résumé nails
Recruiters scan a résumé in about **7 seconds**, so the site is built around four foundations —
each becomes one section of the page:

1. **Header & headline** — who you are and how to reach you
2. **Experience with impact** — results and numbers, not duties
3. **Skills** — grouped and relevant
4. **Education**

## What's in this folder
- **`prompt.md`** — the prompt used on camera to generate the site (context + specifics + style).
- **`design-prompts.md`** — follow-up prompts to personalize the look (color, type, hero, motion, and
  more), each written to run reliably on the model students get for free.
- **`portfolio/`** — the generated site (plain HTML / CSS / JS, ready for GitHub Pages).
- **`preview.png`** — the finished site.

## Try it yourself
1. Grab the résumé from [`../common/`](../common/) (or use your own).
2. Paste `prompt.md` into the Copilot CLI, swapping in your details.
3. Open `portfolio/index.html` in a browser — that's your site.
4. Use `design-prompts.md` to make it yours, then deploy it free on GitHub Pages.

