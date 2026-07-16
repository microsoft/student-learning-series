# PROTOTYPE B: compare one updated PDF with the website

## Input contract

```text
/resume-site-sync "episode-07/demo-assets/Jamie Rivera - Resume Updated.pdf"
```

The PDF is the latest source. The current repository is both the comparison baseline and the portfolio target.

## Prototype behavior

1. Read the latest resume.
2. Inspect the current portfolio for matching profile, experience, project, and skill content.
3. Identify resume facts that differ from, are missing from, or may supersede portfolio content.
4. Treat website-only content as ambiguous rather than automatically obsolete.
5. Present one numbered proposal table.
6. Wait for `approve all` or selected row numbers.
7. Apply only approved rows, validate the portfolio, commit, and push.

## Example proposal

No files have changed yet.

| # | Updated resume evidence | Current portfolio | Proposed portfolio change | Target | Confidence |
| --- | --- | --- | --- | --- | --- |
| 1 | Summary says `Senior` | About section says `junior` | Replace `junior` with `senior` | About section | Direct mismatch |
| 2 | Resume includes `Content Strategy Intern, Northwest Community Media — Summer 2026` | No matching experience entry | Add a new experience entry using the resume wording | Experience section | Direct addition |
| 3 | Updated resume has no Barista entry | Barista remains on the portfolio | Flag Barista for possible removal; do not assume omission means deletion | Experience section | Human decision required |
| 4 | Resume says `28 episodes and 4,500-plus downloads` | Project card shows `15 episodes and 2,000-plus downloads` | Update only the two First-Gen Voices metrics | First-Gen Voices project | Direct mismatch |

```text
Approval will edit the selected portfolio fields, validate the site, commit only those changes, and push to the configured remote.
Reply "approve all" or list rows, for example "approve 1,3,4".
```

## What this option proves

- The invocation is short and matches the student goal: make the portfolio reflect the latest resume.
- The website itself is the before-state.
- Additions and changed facts map directly to visible portfolio content.
- Ambiguous removals remain human decisions.

## Risks to evaluate

- The skill cannot prove why content is absent from the updated resume.
- Resume omissions may reflect space constraints rather than a request to delete website content.
- A website may contain approved details that were never intended to appear on the resume.
- Removal proposals require more careful wording and human judgment.

