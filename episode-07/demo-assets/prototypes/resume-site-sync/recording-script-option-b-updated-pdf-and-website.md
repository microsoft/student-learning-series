# Recording dry run: Option B, updated PDF and website

## What this run tests

Can a student understand and execute a resume-to-portfolio sync when the skill receives only the updated resume and treats the current website as the before-state?

The target is a 60-75 second marketplace segment. This option may need one extra human-decision turn for the removed Barista role. Do not hide that cost; record the actual runtime.

## Before recording

- Open Jamie's portfolio repository in GitHub Copilot.
- Confirm the marketplace is available but the `resume-site-sync` plugin is not installed.
- Uninstall `resume-site-sync-two-pdf` if it was used in the previous take.
- Install only `resume-site-sync-updated-pdf@student-learning-series`.
- Run `/skills info resume-site-sync` and confirm it originates from `resume-site-sync-updated-pdf`.
- Keep `episode-07/demo-assets/Jamie Rivera - Resume Updated.pdf` easy to locate.
- Confirm the portfolio still shows junior status, no Summer 2026 internship, Barista experience, and the old First-Gen Voices metrics.

## Script

### 0:00-0:15 - Connect skill, plugin, and marketplace

**Kaleb**

> We just turned a workflow we proved ourselves into a skill: readable instructions that teach Copilot how to repeat it. A plugin packages that skill so other people can install it. A marketplace is the catalog where people can find the plugin and inspect what it does.

**On screen**

Show the `microsoft/student-learning-series` repository URL, then open the readable `resume-site-sync` `SKILL.md`.

### 0:15-0:24 - Establish trust and install

**Kaleb**

> This skill proposes portfolio changes before editing anything, and it waits for my approval before it validates, commits, or pushes. I'll install the plugin from this marketplace.

**On screen**

Briefly point to the proposal-before-editing and approval-before-push instructions. Install the plugin. Edit out installation wait time.

For the local dry run, use:

```text
/plugin uninstall resume-site-sync-two-pdf
/plugin install resume-site-sync-updated-pdf@student-learning-series
/skills info resume-site-sync
```

### 0:24-0:32 - Invoke with the updated resume

**Kaleb**

> This version uses Jamie's updated resume as the latest source and compares it directly with the portfolio I already have open.

```text
/resume-site-sync "episode-07/demo-assets/Jamie Rivera - Resume Updated.pdf"
```

### 0:32-0:49 - Review the proposal

**Kaleb**

> Nothing has changed yet. It found the new senior status, the summer internship, and both updated podcast metrics. It also noticed that Barista appears only on the website, but it does not assume that missing resume content should be deleted.

**On screen**

Pause long enough to show:

1. Junior to senior.
2. The new Content Strategy Intern role.
3. Barista as website-only content requiring human judgment.
4. The combined update to 28 episodes and 4,500-plus downloads.

The proposal must show evidence, the current portfolio content, the target file or field, and confidence for every row.

### 0:49-0:57 - Make the removal decision explicit

**Kaleb**

> I know Jamie intentionally removed Barista, so I need to make that decision rather than letting the skill infer it.

```text
Update the Barista proposal to remove that portfolio entry.
```

**On screen**

Confirm that the revised Barista row is actionable and still requires approval. Count this clarification as an additional interaction in the dry-run notes.

### 0:57-1:03 - Approve the complete sync

**Kaleb**

> The proposal now matches the four changes I expect, so I remain the final gate.

```text
approve all
```

### 1:03-1:11 - Validate, commit, and push

**Kaleb**

> That approval authorizes only these edits, followed by validation, commit, and push.

**On screen**

Show the start of the authorized work, then edit over command wait time. Return when Copilot reports validation, the commit, and the push.

### 1:11-1:21 - Show the result

**Kaleb**

> Jamie's portfolio now reflects the updated resume without treating every resume omission as a deletion.

**On screen**

Use one final-state scroll to show senior status, the new internship, the removed Barista role, and both updated podcast metrics.

## Manual gate notes

Record these immediately after the take:

- Actual runtime:
- Was the updated PDF plus open website input model immediately clear?
- Did the proposal contain exactly four independently reviewable change groups?
- Did website-only Barista content remain safe before the explicit human decision?
- Was the extra Barista clarification natural or distracting?
- After clarification, did `approve all` produce all four intended portfolio updates?
- Were unrelated wording and design preserved?
- Did the validation, commit, and push result read clearly on screen?
- Keep, revise, or reject this option:
