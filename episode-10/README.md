# Episode 10 — Integrated Section Progress Navigation

**Phase 2 · Concepts**

In this episode, Jamie adds a polished visual progress experience to their portfolio.
The fixed navigation highlights the current section, and each navigation link fills as
visitors move through its section.

## Demo artifact: Jamie's portfolio with integrated section progress

Folder: [`portfolio/`](portfolio/)

The website includes About, a resume preview and download, Experience, Projects, Blog,
Skills, Education, Leadership, and Contact sections. Existing features remain in place:
a responsive menu, dark mode, reveal animations, and a static blog with two published
posts.

### How to open it

From the repository root, run:

```powershell
python -m http.server 8770 --bind 127.0.0.1 --directory episode-10\portfolio
```

Then open <http://127.0.0.1:8770/>.

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
