# Episode 7: Turn a Workflow into a Skill

**Student AI Learning Series production one-pager**

| | |
| --- | --- |
| **Presenters** | Kurt Emrich and Kaleb Cole |
| **Runtime target** | 6:30-7:00 |
| **Format** | Studio conversation with GitHub Copilot app screen share |
| **Student story** | Jamie Rivera publishes from existing portfolio blog functionality |
| **Status** | Production draft |

## Episode objective

Show students how to recognize a repeatable AI workflow, capture it as a readable skill, reuse it with a different source, and discover an installable skill through a plugin marketplace without giving up human approval.

## Starting and ending state

**Starts with:** Jamie's existing portfolio and blog are open in one clean Episode 7 project. Two approved Word source documents are ready. No Episode 7 post has been published, and the marketplace plugin is not installed.

**Ends with:** One source-grounded post is published, the same workflow exists as a reusable `publish-blog` skill, a second Word source has reached its human review checkpoint, and an installed `resume-site-sync` skill has updated Jamie's portfolio from the approved resume changes.

## Production assumptions

These are accepted production assumptions for this draft rather than rehearsal results:

- Use one clean Episode 7 project with no student-facing branch switching.
- GitHub Copilot is signed into the selected filming account with streamer mode, repository access, preview access, and correct push permissions.
- No private work content or saved sessions are visible.
- The portfolio blog, local preview, configured remote, and reset state are known-good.
- The `student-learning-series` marketplace is available in the Copilot GUI.
- Use the two-PDF `resume-site-sync` contract: previous resume, updated resume, and the open portfolio.
- Long generation, validation, install, commit, and push waits are shortened in editing.
- Known-good outputs are available if a live operation fails.

## Teaching language

Use these definitions just in time:

- **Skill:** reusable instructions that teach Copilot a workflow.
- **Plugin:** an installable package that can contain a skill and its supporting resources.
- **Marketplace:** a catalog where people discover and install plugins.

Presenter shorthand:

> The skill is the know-how. The plugin is the package. The marketplace is where the package is shared.

## Run of show

| Time | Owner | Beat | Viewer outcome |
| --- | --- | --- | --- |
| 0:00-0:25 | Kurt + Kaleb | Hook: Jamie has a blog; publishing still takes a workflow | Understand the promise |
| 0:25-2:50 | Kurt | Run the first Word-to-published-blog workflow | See Word notes become a reviewed, approved post |
| 2:50-3:10 | Kurt -> Kaleb | Identify repetition and hand off the keyboard | Recognize why a skill is useful |
| 3:10-4:15 | Kaleb | Create and inspect `publish-blog` | Understand a readable project skill |
| 4:15-5:20 | Kaleb + Kurt | Reuse the skill with a second Word source | See the workflow transfer without losing approval |
| 5:20-6:25 | Kaleb + Kurt | Install and use `resume-site-sync` | Understand plugin and marketplace through action |
| 6:25-6:50 | Both | Recap and create-and-share CTA | Leave with one concrete next action |

## Presenter flow

### 1. Hook: publishing is more than one prompt

**Kurt**

Jamie's portfolio already has a blog. Today, we will turn Jamie's Word notes into a reviewed post, publish it, and then save that workflow so Jamie does not have to rebuild it next time.

**Kaleb**

The content will change, but the reliable steps do not have to. We will turn those steps into a skill, reuse it, and then install a workflow someone else has shared.

**On screen**

Show the existing portfolio blog and the two Word source documents under `episode-07/demo-assets/word-notes/`.

### 2. Kurt runs the first workflow manually

**Source:** `First-Gen-Voices-Notes.docx`

Kurt owns the keyboard for this complete sequence:

1. Open the approved Word notes.
2. Ask Copilot to create a source-grounded Markdown draft.
3. Ask Rubber Duck for concise, read-only critique.
4. Choose which feedback to accept.
5. Approve the revised Markdown draft.
6. Generate the static HTML post and update the existing blog index.
7. Preview the post locally.
8. Explicitly approve publication.
9. Commit and push only the generated blog output.

**Prompt cue: draft**

> Use the approved First-Gen Voices Word notes to create a clear, conversational Markdown draft in Jamie's voice. Use only facts supported by the notes. Do not publish anything. Save the draft for review and summarize how each section is grounded in the source.

**Expected screen outcome**

A Markdown review artifact appears. It preserves Jamie's facts and does not invent history, quotes, dates, outcomes, or supporting details.

**Prompt cue: critique**

> Ask Rubber Duck to critique this draft for source fidelity, clarity, structure, repetition, and usefulness to student creators. Return a short prioritized critique with reasons. Do not edit the draft.

**Kurt**

Rubber Duck is a second opinion, not the approver. Jamie still decides which feedback improves the post.

**Prompt cue: apply selected feedback**

> Apply only the feedback I selected. Preserve Jamie's voice and source facts, show the proposed changes, and stop for my approval before generating the website version.

**Human gate 1**

Kurt reviews and approves the revised Markdown draft.

**Prompt cue: prepare the blog post**

> Generate the static HTML post from the approved Markdown draft, update the existing blog index, preserve the portfolio design, and preview the result. Check the post link and return path. Do not commit or push. Stop for publication approval.

**Human gate 2**

Kurt reviews the local preview and says `publish`.

**Expected screen outcome**

Copilot validates, commits only the generated blog output, pushes to the configured remote, and reports the result. If a check fails, use the known-good backup and continue from the explanation.

### 3. Kurt identifies the reusable workflow

**Kurt**

We started with Word notes, drafted in Markdown, asked for critique, made a human decision, generated the website version, previewed it, and approved publication. Could we save that workflow so Jamie does not rebuild it next time?

**On screen**

Show:

`Word notes -> Markdown draft -> Rubber Duck critique -> Human approval -> HTML preview -> Publish`

Kurt hands the keyboard to Kaleb.

### 4. Kaleb creates and inspects `publish-blog`

**Kaleb**

A skill is reusable instructions that teach Copilot a workflow. Think of it as the readable checklist, context, and safety boundaries we want available every time.

**Prompt cue**

> Turn the approved Word-to-blog process we just completed into a repository skill named `publish-blog`. Preserve both human gates: approval after critique and approval after preview. Keep Word as the source input, Markdown as the review artifact, and static HTML as the published output. Use only source-supported facts and show me the finished `SKILL.md`.

**On screen**

Open `publish-blog/SKILL.md` and point to:

1. The name and trigger description.
2. Word notes as the source.
3. Rubber Duck as a read-only reviewer.
4. Human approval before HTML generation.
5. Human approval before commit and push.

**Kaleb**

The file is readable. We can inspect the workflow, improve it, keep it with the project, and share it with collaborators.

### 5. Reuse the skill with a different source

**Source:** `Recycling-Dashboard-Notes.docx`

Start a fresh Copilot conversation in the same project.

**Prompt cue**

> Use the `publish-blog` skill with the approved Recycling Dashboard Word notes. Use only those notes. Run the drafting and Rubber Duck critique steps, propose revisions, and stop at the human review checkpoint. Do not generate HTML or publish.

**On screen**

Use an edited montage:

1. Copilot reads the second Word source.
2. A different Markdown draft appears.
3. Rubber Duck returns critique.
4. Copilot proposes revisions.
5. The workflow stops for human approval.

**Kurt**

The story changed, but the workflow stayed reliable, and it still stopped for Jamie's decision.

### 6. Marketplace coda: reuse a workflow someone else shared

**Kaleb**

We created the blog skill ourselves. To share a skill for installation, we can place it inside a plugin. A marketplace is the catalog where people discover those plugins.

**On screen: trust check**

Open `microsoft/student-learning-series`, show the repository URL, and briefly inspect the readable `resume-site-sync` skill. Point out proposal-before-editing and approval-before-push.

**Kaleb**

This plugin contains a skill that compares a previous resume with an updated resume, proposes the matching portfolio changes, and waits for approval before editing.

**On screen: install**

Install the final plugin from the `student-learning-series` marketplace:

```text
/plugin install resume-site-sync@student-learning-series
```

Confirm the installed origin:

```text
/skills info resume-site-sync
```

**On screen: invoke**

```text
/resume-site-sync "common/Jamie Rivera - Resume.pdf" "episode-07/demo-assets/Jamie Rivera - Resume Updated.pdf"
```

**Kaleb**

Nothing has changed yet. The proposal identifies four approved change groups: Jamie is now a senior, has a new Summer 2026 internship, removed the Barista role from the updated resume, and has updated First-Gen Voices metrics.

**On screen**

Show one numbered proposal with:

1. Junior to senior.
2. The Content Strategy Intern role.
3. Verified resume removal of Barista, with portfolio deletion requiring human approval.
4. First-Gen Voices updated to 28 episodes and 4,500-plus downloads.

**Kurt**

Those are the changes we expect. The proposal is still only a proposal until we approve it.

```text
approve all
```

**On screen**

Edit over validation, commit, and push waits. Finish with one portfolio scroll showing all four updates and no unrelated redesign.

### 7. Close

**Kurt**

We started with a real task, not a file format. We proved the workflow once and kept the important decisions human.

**Kaleb**

Then we captured the repeatable steps as a skill, reused it with different content, and installed another skill through a plugin marketplace.

**Both**

Pick one workflow you repeat, turn it into a skill, and share it with someone who could use it.

## Presenter checklist

### Kurt

- Establish Jamie's existing portfolio and blog.
- Own the complete first Word-to-published-blog workflow.
- Make both human approvals visible.
- Recap the repeated steps and hand the keyboard to Kaleb.
- At the marketplace proposal, confirm the four expected resume changes.
- Close with the create-and-share action.

### Kaleb

- Explain Rubber Duck as critique, not approval.
- Create and inspect `publish-blog`.
- Reuse it with the second Word source only through human review.
- Explain skill, plugin, and marketplace just in time.
- Show the repository and readable skill before installation.
- Install and invoke `resume-site-sync`; keep long waits edited.

### Backup cues

- If Word extraction varies, cut to the prepared Markdown draft.
- If Rubber Duck output varies, show the prepared critique and continue with the human decision.
- If HTML generation or preview fails, cut to the known-good static HTML.
- If marketplace installation fails, use the preinstalled final plugin and state that it came from the shown marketplace.
- If validation, commit, or push fails, do not claim success; cut to the known-good final portfolio and identify the take as a backup.

## Public production files

- `episode-07/script.md`
- `episode-07/Episode 07 - Production Script.docx`
- `episode-07/demo-assets/word-to-blog-workflow.md`
- `episode-07/demo-assets/Jamie Rivera - Resume Updated.pdf`
- `.github/plugin/marketplace.json`
- `episode-07/demo-assets/plugins/resume-site-sync/`
