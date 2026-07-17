# Episode 7 — Teaching Copilot Skills!

**Phase 2 · Concepts**

In this episode, Jamie turns project notes into a reviewed portfolio blog post, captures
that repeatable publishing process as a Copilot skill, and reuses the skill for a second
project. The episode also shows how plugins package shared capabilities and how a
marketplace helps students discover and install them.

## Demo artifact: Jamie's portfolio with an empty blog

Folder: [`portfolio/`](portfolio/)

The portfolio starts with a complete blog experience but no published posts. During the
episode, Copilot:

1. Turns Jamie's Word notes into a Markdown draft.
2. Uses Rubber Duck as a read-only reviewer.
3. Waits for human approval before creating and publishing the web page.
4. Saves the workflow as the project skill `create-blog`.
5. Reuses the skill with notes from a different project.

### How to open it

From the repository root, run:

```powershell
python -m http.server 8767 --bind 127.0.0.1 --directory episode-07\portfolio
```

Then open <http://127.0.0.1:8767/>.

The site uses plain HTML, CSS, JavaScript, Markdown source files, and a small
standard-library Python generator. It has no package installation or build-tool
dependency.

## Prompts used in the demo

Folder: [`demo-assets/prompts/`](demo-assets/prompts/)

The numbered Markdown files follow the on-camera workflow in order. Prompts
[`06a.md`](demo-assets/prompts/06a.md) and
[`06b.md`](demo-assets/prompts/06b.md) are two ways to ask Copilot to create the
`create-blog` skill: a shorter context-aware version and a more explicit version.

## Jamie's source documents

- [`First-Gen-Voices-Notes.docx`](demo-assets/First-Gen-Voices-Notes.docx) — notes used
  to create the first blog post manually.
- [`Recycling-Dashboard-Notes.docx`](demo-assets/Recycling-Dashboard-Notes.docx) —
  a different set of notes used to demonstrate skill reuse.
- [`Jamie Rivera - Resume Updated.pdf`](demo-assets/Jamie%20Rivera%20-%20Resume%20Updated.pdf)
  — the updated resume used by the marketplace plugin.

The original mock resume is in [`../common/`](../common/).

## Demo plugin: `resume-site-sync`

Folder:
[`demo-assets/plugins/resume-site-sync/`](demo-assets/plugins/resume-site-sync/)

The plugin compares Jamie's original and updated resumes with the open portfolio. It
proposes source-backed website changes first, waits for approval, and only applies the
approved updates.

The repository is registered as the `student-learning-series` Copilot plugin marketplace.
To try the plugin from Copilot CLI:

```powershell
copilot plugin marketplace add microsoft/student-learning-series
copilot plugin install resume-site-sync@student-learning-series
```

Then invoke the skill:

```text
/resume-site-sync "common/Jamie Rivera - Resume.pdf" "episode-07/demo-assets/Jamie Rivera - Resume Updated.pdf"
```

Review plugin instructions before installing them. A marketplace helps with discovery; it
does not replace checking what an installed plugin can do.

## Visual explainer

[`skill-plugin-marketplace-60s.mp4`](demo-assets/skill-plugin-marketplace-60s.mp4)
shows the relationship used in the episode:

`Skill → Plugin → Marketplace`

## What a viewer can do after this episode

- Recognize a repeated workflow that could become a Copilot skill.
- Create and read a project skill instead of treating it as a black box.
- Reuse the same skill with different source material.
- Explain the difference between a skill, a plugin, and a marketplace.
- Install a shared plugin and keep human approval in control of portfolio changes.
