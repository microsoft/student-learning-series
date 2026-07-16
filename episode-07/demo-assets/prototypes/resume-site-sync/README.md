# PROTOTYPE: `resume-site-sync` input model

## Question

Which input contract makes the clearest, safest, and most useful generic `resume-site-sync` skill?

- [Option A: two PDFs](./option-a-two-pdf.md)
- [Option B: one updated PDF and the current website](./option-b-updated-pdf-and-website.md)
- [Option A recording dry-run script](./recording-script-option-a-two-pdf.md)
- [Option B recording dry-run script](./recording-script-option-b-updated-pdf-and-website.md)

These are throwaway planning prototypes, not final skill instructions.

## Fixed test state

Both options use the same artifacts:

- Original resume: `common/Jamie Rivera - Resume.pdf`
- Updated resume: `episode-07/demo-assets/Jamie Rivera - Resume Updated.pdf`
- Current portfolio: inferred from the repository open in GitHub Copilot

The updated resume contains four intentional differences:

1. Junior becomes senior.
2. Content Strategy Intern at Northwest Community Media is added for Summer 2026.
3. Barista experience is removed.
4. First-Gen Voices becomes 28 episodes and 4,500-plus downloads.

## Shared behavior

Regardless of input model, the prototype must:

1. Read its source inputs without editing anything.
2. Map resume evidence to existing portfolio content.
3. Show a numbered proposal before making changes.
4. Support `approve all` or selected rows such as `approve 1,3`.
5. State clearly that approval authorizes edit, validation, commit, and push.
6. Edit only approved portfolio fields.
7. Stop without committing or pushing if validation fails.
8. Commit only the approved portfolio changes and push to the configured remote.

## Evaluation

Use [evaluation-scorecard.md](./evaluation-scorecard.md) after walking through both options.
