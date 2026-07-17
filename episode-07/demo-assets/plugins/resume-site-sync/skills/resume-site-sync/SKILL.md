---
name: resume-site-sync
description: Reconcile a current resume PDF and an updated resume PDF with the personal portfolio website in the current repository, propose precise website changes, and implement only explicitly approved rows. Use whenever a user invokes `/resume-site-sync`, asks to update a portfolio from a new resume, or wants resume changes reflected on their personal website.
license: MIT
---

# Resume Site Sync

Update the personal portfolio in the current repository from a new resume without losing the distinction between what the website should already say and what the updated resume newly changes.

## Invocation

```text
/resume-site-sync "current-resume.pdf" "updated-resume.pdf"
```

The current resume is the expected baseline for the existing website. The updated resume is the intended source of new facts. The skill is project-scoped: run it from the repository that contains the companion portfolio website.

## Establish the three sources

Before proposing or editing:

1. Confirm both PDFs are readable and preserve their order.
2. Confirm the current directory is the portfolio's Git repository.
3. Record the existing Git status so unrelated work remains untouched.
4. Read repository guidance and identify the authored website sources, generated files, content model, design patterns, and existing validation commands.
5. Extract factual resume content such as roles, dates, education, skills, projects, links, and measurable outcomes. Ignore layout-only PDF differences.
6. Read the corresponding facts from the website's authored sources.

Treat this as a three-way reconciliation:

- **Baseline check:** compare the current resume with the website. These should agree.
- **Resume update:** compare the current resume with the updated resume. This identifies additions, changed facts, and possible removals.
- **Website mapping:** locate the smallest authored website field or content block that represents each fact.

Do not edit the website during this phase.

## Build the proposal

Begin with `No files have changed yet.`

Present two sections when applicable:

1. **Baseline mismatches** for facts where the current resume and website disagree.
2. **Updates from the new resume** for facts added, changed, or omitted between the current and updated resumes.

Use one continuous row numbering sequence across both sections:

| # | Type | Resume evidence | Current website | Proposed website change | Target file/field | Confidence |
| --- | --- | --- | --- | --- | --- | --- |

Each row must be independently approvable. Cite the relevant current-resume and updated-resume evidence by page and section when available, and name the exact repository-relative website target.

Use these row types:

- `Baseline mismatch` when the current resume and website already disagree.
- `Addition` when the updated resume introduces a verified fact.
- `Change` when the updated resume changes an existing fact.
- `Possible removal` when a fact is omitted from the updated resume.

Resume omission does not prove that portfolio content is obsolete. Explain this in every `Possible removal` row and require explicit approval before deleting anything.

Use these confidence labels:

- `Direct` when one verified fact maps to one website target.
- `Grouped` when several changed fields belong to one logical website entity and should be approved together.
- `Needs clarification` when the evidence or website target is ambiguous.

Do not make a `Needs clarification` row actionable until the user resolves the ambiguity.

Adapt approved facts to the site's existing voice and structure. Do not invent achievements, metrics, technologies, employers, projects, dates, links, or other facts that are absent from the updated resume.

After the table, state:

> Approval authorizes editing only the approved website fields, preserving the existing design and unrelated content, running the repository's existing validation, committing only those changes, and pushing the commit to the configured remote.
>
> Reply `approve all` or select rows, for example `approve 1,3`.

Wait for explicit row approval. Discussion, corrections, or general agreement do not authorize edits.

## Implement approved website changes

1. Treat `approve all` as every actionable row and selected-row syntax as exactly those rows.
2. Reject unknown or duplicate row references without editing.
3. Recheck the worktree and affected sources. If they changed after the proposal, refresh the affected rows and request approval again.
4. Edit only authored sources corresponding to approved rows. Follow the repository's existing components, content schema, formatting, and design.
5. Preserve layout, styling, responsive behavior, generated-file boundaries, wording outside approved fields, and unrelated work.
6. If an approved fact has no existing destination, add the smallest site-native field or content block that represents it; do not redesign the page.
7. Run the smallest existing validation that covers the edited website, including its build or content checks. Use an existing local preview or browser check when the repository provides one.
8. Inspect the final diff against the approved rows. Remove any accidental or generated noise not required by the repository.
9. If validation fails, report the command and concise error, leave the approved edits visible for review, and stop without committing or pushing.
10. If validation succeeds, commit only the approved website changes and push to the configured remote.

Report the implemented row numbers, repository-relative paths, validation result, short commit hash, and push result. Never expose credentials, secret-bearing remote URLs, internal harness labels, control characters, or temporary paths.
