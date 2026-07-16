---
name: resume-site-sync
description: Compare an updated resume PDF with the portfolio repository currently open, propose evidence-based content updates, and apply only human-approved changes. Use whenever a user invokes `/resume-site-sync` with a resume or asks to make a portfolio reflect the latest resume without treating every omission as a deletion.
license: MIT
---

# Resume Site Sync

Use the updated resume as the latest resume source and the portfolio in the current working directory as both the comparison baseline and edit target.

## Invocation

```text
/resume-site-sync "updated-resume.pdf"
```

Confirm the PDF is readable and the current directory is a portfolio Git repository.

## Analyze without editing

1. Record the existing Git status so unrelated work remains untouched.
2. Read repository guidance and identify authored content, generated files, and existing validation commands.
3. Compare resume evidence with semantically matching profile, experience, project, and skill content.
4. Classify findings as:
   - `Direct mismatch`: both sources describe the same fact differently.
   - `Missing portfolio content`: the resume contains a relevant fact with no portfolio equivalent.
   - `Website-only content`: relevant portfolio content is absent from the resume.
5. Group multiple changed fields from the same logical portfolio entity into one proposal row when they form one intended update.
6. Preserve the site's design, structure, voice, and unrelated content.

Resume absence is ambiguous because a resume may omit valid website content for space or audience. Never infer deletion from omission alone.

Do not edit, validate, commit, or push during analysis.

## Present the proposal

Begin with `No files have changed yet.` Present one numbered table:

| # | Updated resume evidence | Current portfolio content | Proposed change | Target file/field | Confidence |
| --- | --- | --- | --- | --- | --- |

Each row must be independently reviewable. Cite concise evidence from both sources and name the exact repository-relative target.

Use these confidence labels:

- `High - direct mismatch`
- `High - direct addition`
- `Human judgment required - website-only`

For website-only content, propose retaining it by default. Do not make deletion part of `approve all` unless the user first explicitly changes that row's proposed action.

After the table, state:

> Approval authorizes editing the approved portfolio fields, running the repository's existing validation, committing only those changes, and pushing the commit to the configured remote.
>
> Reply `approve all` or select rows, for example `approve 1,3`.

Wait for explicit approval. Do not treat discussion or general agreement as approval.

## Revise a website-only decision

When the user explicitly asks to remove website-only content:

1. Revise that proposal row from retain-by-default to the requested removal.
2. Show the revised evidence, action, target, and human-decision confidence.
3. Ask for approval again.

The clarification changes the proposal; it does not itself authorize editing.

## Apply an approval

1. Treat `approve all` as every actionable edit in the current proposal and selected-row syntax as exactly those rows.
2. Reject unknown or duplicate row references without editing.
3. Recheck the worktree. If relevant files changed after the proposal, refresh affected rows and obtain approval again.
4. Apply only approved changes to authored sources using existing repository patterns.
5. Preserve design, wording outside approved fields, generated-file boundaries, and unrelated content.
6. Run the smallest existing validation that covers the changes.
7. If validation fails, report the command and concise error, leave approved edits visible for review, and stop without committing or pushing.
8. If validation succeeds, inspect the diff against the approval, commit only approved changes, and push to the configured remote.

Report repository-relative paths, the short commit hash, and the push result. Do not expose internal harness labels, control characters, temporary paths, credentials, or remote URLs containing secrets.
