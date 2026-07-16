---
name: resume-site-sync
description: Compare a previous resume PDF with an updated resume PDF, map verified changes to the portfolio repository currently open, and apply only human-approved updates. Use whenever a user invokes `/resume-site-sync` with two resumes or asks to reconcile resume additions, removals, and changed facts with a portfolio.
license: MIT
---

# Resume Site Sync

Use the previous and updated resume PDFs as ordered evidence, then map their substantive differences to the portfolio in the current working directory.

## Invocation

```text
/resume-site-sync "previous-resume.pdf" "updated-resume.pdf"
```

The first PDF is the previous resume. The second is the latest resume. Confirm both are readable and that the current directory is a portfolio Git repository.

## Analyze without editing

1. Record the existing Git status so unrelated work remains untouched.
2. Read repository guidance and identify authored content, generated files, and existing validation commands.
3. Extract roles, dates, education, skills, projects, links, and measurable outcomes from both resumes.
4. Normalize layout-only differences while preserving exact meaningful wording.
5. Classify substantive differences as added, removed, or changed.
6. Map each difference to the smallest relevant portfolio field or content block.
7. Group multiple changed fields from the same logical portfolio entity into one proposal row when they form one intended update.

Do not edit, validate, commit, or push during analysis.

## Present the proposal

Begin with `No files have changed yet.` Present one numbered table:

| # | Resume evidence | Current portfolio content | Proposed change | Target file/field | Confidence |
| --- | --- | --- | --- | --- | --- |

Each row must be independently approvable and cite concise before-and-after resume evidence.

Use these confidence labels:

- `Direct match` for a changed fact mapped to one portfolio target.
- `Direct addition` for a new fact with one clear portfolio destination.
- `Verified resume removal - portfolio deletion requires approval` when content was removed from the updated resume but still exists on the website.
- `Needs clarification` when multiple portfolio targets are plausible.

A verified resume removal proves only that the two resumes differ. Explain that deleting the corresponding portfolio content remains a human-approved implementation decision. Do not make `Needs clarification` rows actionable until the target and action are resolved.

After the table, state:

> Approval authorizes editing the approved portfolio fields, running the repository's existing validation, committing only those changes, and pushing the commit to the configured remote.
>
> Reply `approve all` or select rows, for example `approve 1,3`.

Wait for explicit approval. Do not treat discussion or general agreement as approval.

## Apply an approval

1. Treat `approve all` as every actionable row and selected-row syntax as exactly those rows.
2. Reject unknown or duplicate row references without editing.
3. Recheck the worktree. If relevant files changed after the proposal, refresh affected rows and obtain approval again.
4. Apply only approved changes to authored sources using existing repository patterns.
5. Preserve design, wording outside approved fields, generated-file boundaries, and unrelated content.
6. Run the smallest existing validation that covers the changes.
7. If validation fails, report the command and concise error, leave approved edits visible for review, and stop without committing or pushing.
8. If validation succeeds, inspect the diff against the approval, commit only approved changes, and push to the configured remote.

Report repository-relative paths, the short commit hash, and the push result. Do not expose internal harness labels, control characters, temporary paths, credentials, or remote URLs containing secrets.
