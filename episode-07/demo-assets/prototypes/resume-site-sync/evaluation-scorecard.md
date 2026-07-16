# `resume-site-sync` prototype evaluation scorecard

Score each criterion from 1 (poor) to 5 (excellent) after walking through both prototypes.

| Criterion | Option A: two PDFs | Option B: updated PDF + website | Notes |
| --- | ---: | ---: | --- |
| Student understands the invocation immediately |  |  |  |
| Proposal explains where each change came from |  |  |  |
| Additions are handled correctly |  |  |  |
| Changed facts are handled correctly |  |  |  |
| Removals are handled safely |  |  |  |
| Website-only content is handled safely |  |  |  |
| Human approval boundary is obvious |  |  |  |
| Commit and push consequences are obvious |  |  |  |
| Fits the Episode 07 coda runtime |  |  |  |
| Feels useful beyond this specific demo |  |  |  |

## Evaluation scenarios

Run both prototypes through the same questions:

1. Can the student explain what each input represents?
2. Why is the Barista row treated differently?
3. Can the student approve rows 1, 2, and 4 while rejecting row 3?
4. Does the skill make any edit before approval?
5. Does approval clearly authorize validation, commit, and push?
6. What happens if site validation fails?
7. Would this workflow still make sense for a different resume and portfolio?

## Decision

- Selected option: Option A, two PDFs.
- Reason: The independent evaluation tied both options at 42/50, but Option A supports one evidence-backed four-row proposal that can flow through a literal `approve all` to the intended final portfolio. It also completed the benchmark with lower mean time and token use.
- Rejected option: Option B, updated PDF and website.
- Trade-off accepted: The student must provide both the previous and updated resumes. In return, additions, changed facts, and resume removals have explicit before-and-after evidence.
- Follow-up changes applied: The final skill distinguishes verified resume removal from human-approved portfolio deletion, groups the two First-Gen Voices metrics into one proposal row, and sanitizes internal paths and output details.
- Production gate: The recording owner accepted marketplace execution and recording topology as production assumptions for script creation rather than requiring the planned dry runs before selection.
