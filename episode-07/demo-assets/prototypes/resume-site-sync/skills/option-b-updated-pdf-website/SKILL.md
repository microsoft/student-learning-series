---
name: resume-site-sync
description: Compare an updated resume PDF with the portfolio repository currently open, propose evidence-based content updates, and apply only human-approved rows. Use this skill whenever a user invokes `/resume-site-sync`, asks to sync a portfolio website from a newer resume, or wants to reconcile resume and portfolio content before editing, committing, and pushing.
---

# Resume Site Sync

Use an updated resume PDF as the latest resume source and the current portfolio repository as both the comparison baseline and edit target.

## Compare without editing

1. Confirm the PDF exists and is readable.
2. Inspect the repository structure and identify the files or data fields that render profile, experience, project, and skill content.
3. Record the existing worktree state so unrelated changes remain untouched.
4. Compare resume evidence with semantically matching portfolio content. Classify findings as:
   - **Direct mismatch**: both sources describe the same fact differently.
   - **Missing portfolio content**: the resume contains a relevant fact with no portfolio equivalent.
   - **Website-only content**: the portfolio contains relevant content absent from the resume.
5. Treat resume absence as ambiguous. A resume may omit valid website content for space or audience reasons, so never infer deletion from omission alone.
6. Preserve the site's design, structure, voice, and unrelated content.

Do not modify files, validate, commit, or push during this phase.

## Propose changes

State `No files have changed yet.` and present one numbered table:

| # | Updated resume evidence | Current portfolio content | Proposed change | Target file/field | Confidence |
| --- | --- | --- | --- | --- | --- |

Make each row independently approvable. Quote or precisely summarize evidence from both sources, name the exact target file and field or section, and use confidence labels that explain the basis:

- `High - direct mismatch`
- `High - direct addition`
- `Human judgment required - website-only`

For website-only content, propose retaining it by default or flag a possible change for review; do not frame deletion as established fact.

After the table, state:

> Approval authorizes editing the approved portfolio fields, running the repository's existing validation, committing only those changes, and pushing the commit to the configured remote.
>
> Reply `approve all` or select rows, for example `approve 1,3`.

Wait for explicit approval. Do not interpret general agreement or discussion as approval.

## Apply an approval

1. Parse `approve all` as every proposed row, or `approve 1,3` as only those numbered rows. Reject unknown or duplicate row references clearly.
2. Recheck the worktree before editing. Preserve pre-existing and unrelated changes.
3. Apply only the approved content changes using the repository's existing patterns and data structures. Do not redesign, reformat, or opportunistically clean up the site.
4. Run the smallest existing validation commands that cover the changed portfolio.
5. If validation fails, report the failure and stop without committing or pushing. Leave the approved edits visible for review unless the user explicitly asks to revert them.
6. If validation succeeds, inspect the diff, commit only the approved portfolio changes, and push that commit to the configured remote.
7. Report the approved rows applied, validation performed, commit hash, and push result. Mention unapproved rows as unchanged.

If there are no actionable differences, report that no edits, commit, or push are needed.
