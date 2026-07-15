# Episode 07 Word-to-blog workflow contract

This file is the single source of truth for Episode 07's manual demo flow, prompt drafting, and
eventual `publish-blog` skill packaging.

If a future script draft, prompt list, or rehearsal note conflicts with this file, this file wins.

---

## On-screen contract

1. Start with approved Word source notes, not Markdown notes.
2. Create a Markdown draft from those Word notes.
3. Ask Rubber Duck for critique on the Markdown draft.
4. Let the human choose which critique to accept, then approve the Markdown draft.
5. Generate the static HTML post and update the blog index from the approved Markdown draft.
6. Preview the generated blog locally.
7. Stop for explicit human publish approval before any commit, push, or live publication step.
8. Commit only the generated HTML to the blog; Markdown drafts are review artifacts and are not
   published or persisted in the blog.
9. After the manual flow succeeds once, package the repeated steps as `publish-blog` and show that
   the same contract still applies during reuse.

---

## What this resolves

- **Source of truth:** the prepared source artifacts are Word notes, so the episode should not
  claim that the student starts from Markdown source notes.
- **Critique role:** Rubber Duck is a read-only second opinion, not the approver and not the
  source of new facts.
- **Approval boundary:** there are two human gates:
  1. approve the Markdown draft before HTML generation
  2. approve the generated result before publish
- **Reuse boundary:** `publish-blog` can automate the repeated mechanics, but it must preserve the
  same human approval gates.

---

## Source-grounding rules

- Only the approved Word notes and already-approved repository facts may supply post content.
- Do not invent student history, quotes, dates, outcomes, or supporting details.
- The Markdown draft may reorganize, condense, or clarify the notes, but it must stay faithful to
  those sources.
- Rubber Duck feedback may suggest clarity, structure, or tone improvements, but it must not be
  treated as a source document.
- If the notes do not support a claim, the post should omit that claim or flag it for human review.

---

## Approval contract

### Gate 1: draft approval

The human must review the Markdown draft after Rubber Duck critique and before any HTML is
generated. This is the point where wording, omissions, and source fidelity are decided.

### Gate 2: publish approval

After HTML generation and local preview, the human must explicitly approve publication before any
commit, push, or publish step happens.

`publish-blog` should treat a plain-language approval such as `publish` as the only valid signal
to cross this second gate.

---

## File-location contract under `episode-07/demo-assets/`

These are the intended artifact paths that future prompt, script, and skill drafts should cite.

```
episode-07/
  demo-assets/
    README.md
    word-to-blog-workflow.md
    word-notes/
      First-Gen-Voices-Notes.docx
      Recycling-Dashboard-Notes.docx
    markdown-drafts/
      first-gen-voices.md
      recycling-dashboard.md
    critique/
      first-gen-voices-rubber-duck.md
      recycling-dashboard-rubber-duck.md
    preview-html/
      first-gen-voices.html
      recycling-dashboard.html
    publish-blog/
      SKILL.md
```

---

## How the manual demo and the skill should divide responsibility

### Manual first run

- Use `word-notes/First-Gen-Voices-Notes.docx` as the source.
- Produce `markdown-drafts/first-gen-voices.md`.
- Capture critique in `critique/first-gen-voices-rubber-duck.md`.
- After human draft approval, generate `preview-html/first-gen-voices.html`.
- Preview locally, then wait for explicit publish approval.

### Skill creation

The `publish-blog` skill should be introduced only after the audience has seen the manual flow once.
Its job is to package the repeated mechanics, not to replace the human editorial decisions.

### Skill reuse

- Reuse should start from `word-notes/Recycling-Dashboard-Notes.docx`.
- The skill may create/update `markdown-drafts/recycling-dashboard.md`, capture critique, generate
  `preview-html/recycling-dashboard.html`, and summarize the pending changes.
- Reuse should still stop for human approval before any publish step.

---

## Prompt and script alignment rules

Any future Episode 07 prompt list or filming script should follow these rules:

- refer to **Word notes** as the starting source
- show **Markdown** as the editable draft format
- place **Rubber Duck critique before human draft approval**
- place **HTML generation after draft approval**
- require **explicit publish approval after preview**
- treat `publish-blog` as a packaging/reuse step, not the initial source-authoring step
