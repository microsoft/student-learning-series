# Recording dry run: Option A, two PDFs

## What this run tests

Can a student understand and execute a resume-to-portfolio sync when the skill receives both the previous and updated resumes?

The target is a 60-75 second marketplace segment. Do not rush the trust check, proposal, or approval to hit the target. Record the actual runtime.

## Before recording

- Open Jamie's portfolio repository in GitHub Copilot.
- Confirm the marketplace is available but the `resume-site-sync` plugin is not installed.
- Install `resume-site-sync@student-learning-series`.
- Run `/skills info resume-site-sync` and confirm it originates from the final `resume-site-sync` plugin.
- Keep these files easy to locate:
  - `common/Jamie Rivera - Resume.pdf`
  - `episode-07/demo-assets/Jamie Rivera - Resume Updated.pdf`
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
/plugin install resume-site-sync@student-learning-series
/skills info resume-site-sync
```

### 0:24-0:34 - Invoke with the previous and updated resumes

**Kaleb**

> This version compares Jamie's previous resume with her updated resume, then maps only those verified differences to her portfolio.

```text
/resume-site-sync "common/Jamie Rivera - Resume.pdf" "episode-07/demo-assets/Jamie Rivera - Resume Updated.pdf"
```

### 0:34-0:51 - Review the proposal

**Kaleb**

> Nothing has changed yet. The proposal found four change groups: Jamie is now a senior, she added a summer internship, she removed the Barista role from the new resume, and she updated both First-Gen Voices metrics.

**On screen**

Pause long enough to show:

1. Junior to senior.
2. The new Content Strategy Intern role.
3. The verified resume removal of Barista, with portfolio deletion still requiring approval.
4. The combined update to 28 episodes and 4,500-plus downloads.

The proposal must show evidence, the current portfolio content, the target file or field, and confidence for every row.

### 0:51-0:57 - Approve the complete sync

**Kaleb**

> These are the four changes I expect, so I remain the final gate.

```text
approve all
```

### 0:57-1:05 - Validate, commit, and push

**Kaleb**

> That approval authorizes only these edits, followed by validation, commit, and push.

**On screen**

Show the start of the authorized work, then edit over command wait time. Return when Copilot reports validation, the commit, and the push.

### 1:05-1:15 - Show the result

**Kaleb**

> Jamie's portfolio now reflects the updated resume without redesigning the site or changing unrelated content.

**On screen**

Use one final-state scroll to show senior status, the new internship, the removed Barista role, and both updated podcast metrics.

## Manual gate notes

Record these immediately after the take:

- Actual runtime:
- Could the previous and updated PDF roles be explained in one sentence?
- Did the proposal contain exactly four independently approvable change groups?
- Did the Barista row distinguish verified resume removal from human-approved portfolio deletion?
- Did `approve all` produce all four intended portfolio updates?
- Were unrelated wording and design preserved?
- Did the validation, commit, and push result read clearly on screen?
- Keep, revise, or reject this option:
