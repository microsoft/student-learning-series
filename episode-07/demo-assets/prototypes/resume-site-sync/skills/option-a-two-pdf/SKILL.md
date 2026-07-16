---
name: resume-site-sync
description: Compare an old resume PDF with a new resume PDF, map verified fact changes to the portfolio repository currently open, and propose reviewable website updates before editing. Use this skill whenever the user invokes `/resume-site-sync "old.pdf" "new.pdf"`, asks to sync a portfolio from two resume versions, or wants resume additions, removals, and changed facts reconciled with a portfolio. Require explicit row approval before edits, validation, commit, or push.
compatibility: Requires PDF-reading capability, repository file search and editing, the portfolio's validation commands, and Git with a configured push remote.
---

# Resume Site Sync

Reconcile two ordered resume versions with the portfolio repository in the current working directory:

```text
/resume-site-sync "old.pdf" "new.pdf"
```

The first PDF is the previous resume and the second is the latest resume. Keep the workflow generic across resume layouts and portfolio frameworks.

## 1. Establish a safe baseline

- Confirm both PDFs are readable and the current directory is a portfolio Git repository.
- Record the existing Git status so unrelated user changes can be preserved and excluded from the eventual commit.
- Read repository guidance and identify content sources, generated files, and available validation commands.
- Do not edit any file during analysis or proposal generation.

## 2. Compare resume facts

Extract structured facts from both PDFs, including roles, dates, education, skills, projects, links, and measurable outcomes. Normalize harmless layout differences before comparing.

Classify each substantive difference as:

- **Added**: present only in the latest resume.
- **Removed**: present only in the previous resume.
- **Changed**: the same fact or entity has a different value.

Retain exact old and new wording, plus page or section context when available. Do not infer unsupported facts. A resume removal is verified evidence about the resume, but removing portfolio content remains an implementation decision for review.

## 3. Map differences to the portfolio

Search authored content before templates or generated output. For every resume difference:

- Locate matching portfolio text or structured data.
- Separate resume evidence from the proposed portfolio action.
- Choose the smallest target field or content block that preserves the site's design and unrelated content.
- Assign confidence as `Direct match`, `Likely match`, or `Needs clarification`.

Do not invent a mapping. If multiple targets are plausible, list the ambiguity and make the row non-actionable until the user clarifies it.

## 4. Present one proposal

Begin with `No files have changed yet.` Then produce one numbered table:

| # | Resume evidence | Current portfolio content | Proposed change | Target file/field | Confidence |
| --- | --- | --- | --- | --- | --- |

Use one independently approvable change per row. Quote concise before-and-after evidence and name a concrete repository-relative file and field, section, or entry. Include additions, removals, and changed facts when they map to portfolio content.

After the table, state:

```text
Approval authorizes editing the approved rows, validating the portfolio, committing only those changes, and pushing the commit to the configured remote.
Reply "approve all" or list rows, for example "approve 1,3".
```

Wait for approval. Do not treat vague agreement as approval, and do not execute `Needs clarification` rows until their target and proposed action are resolved.

## 5. Apply explicit approval

- Interpret `approve all` as every currently actionable row.
- Interpret `approve 1,3` as exactly those row numbers.
- Reject unknown row numbers and request a corrected approval without editing.
- If relevant files changed after the proposal, refresh the affected rows and obtain approval again.
- Apply only approved rows to authored sources, following existing repository conventions.
- Preserve layout, styling, ordering conventions, generated-file boundaries, and all unrelated content.

## 6. Validate, commit, and push

Review the diff against the approved rows and the recorded baseline. Remove accidental changes and exclude pre-existing work.

Run the repository's relevant validation commands. If validation fails:

- Stop without committing or pushing.
- Report the failing command and concise error.
- Leave the approved working-tree edits visible for review rather than hiding the failure.

If validation passes:

- Commit only the approved portfolio changes with a concise message.
- Push that commit to the configured upstream or remote branch.
- Report the approved rows applied, validation performed, commit hash, and push result.

If commit or push cannot complete, report the exact stopping point and do not claim success.
