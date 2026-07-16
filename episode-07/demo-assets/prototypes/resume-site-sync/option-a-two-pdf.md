# PROTOTYPE A: compare two PDFs, then map to the website

## Input contract

```text
/resume-site-sync "common/Jamie Rivera - Resume.pdf" "episode-07/demo-assets/Jamie Rivera - Resume Updated.pdf"
```

The first PDF is the previous resume. The second PDF is the latest resume. The current repository is the portfolio target.

## Prototype behavior

1. Compare the previous and latest PDFs.
2. Identify additions, removals, and changed facts.
3. Map each resume difference to the relevant portfolio content.
4. Distinguish a verified resume change from a portfolio implementation decision.
5. Present one numbered proposal table.
6. Wait for `approve all` or selected row numbers.
7. Apply only approved rows, validate the portfolio, commit, and push.

## Example proposal

No files have changed yet.

| # | Resume evidence | Current portfolio | Proposed portfolio change | Target | Confidence |
| --- | --- | --- | --- | --- | --- |
| 1 | `Junior` → `Senior` | About section says `junior` | Replace `junior` with `senior` | About section | Direct match |
| 2 | New `Content Strategy Intern, Northwest Community Media — Summer 2026` entry | No matching experience entry | Add a new experience entry using the updated resume wording | Experience section | Direct addition |
| 3 | `Barista, Foghorn Coffee` was removed from the latest resume | Barista remains on the portfolio | Remove the Barista experience entry | Experience section | Verified removal |
| 4 | `15 episodes and 2,000-plus downloads` → `28 episodes and 4,500-plus downloads` | Project card shows the old metrics | Update only the two First-Gen Voices metrics | First-Gen Voices project | Direct match |

```text
Approval will edit the selected portfolio fields, validate the site, commit only those changes, and push to the configured remote.
Reply "approve all" or list rows, for example "approve 1,3,4".
```

## What this option proves

- Removals are explicit because the old and new resumes can be compared directly.
- The skill can separate resume history from website mapping.
- Every proposed change can cite a before-and-after resume fact.

## Risks to evaluate

- Requires the user to locate and pass two resume files.
- Introduces three states to reconcile: old resume, new resume, and current website.
- The old resume may not be available or may not match the website's current source.
- The longer invocation and explanation may slow the on-camera coda.

