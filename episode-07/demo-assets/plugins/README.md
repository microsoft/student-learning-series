# Episode 7 plugin prototypes

This folder contains two temporary `resume-site-sync` plugin packages for the recording dry run. Install only one at a time because both intentionally expose the same `/resume-site-sync` skill command.

| Plugin | Input contract |
| --- | --- |
| `resume-site-sync-two-pdf` | Previous resume PDF, updated resume PDF, and the open portfolio |
| `resume-site-sync-updated-pdf` | Updated resume PDF and the open portfolio |

## Local dry-run setup

From a Copilot CLI session, add the repository checkout as a local marketplace:

```text
/plugin marketplace add C:\path\to\student-learning-series
```

Install Option A:

```text
/plugin install resume-site-sync-two-pdf@student-learning-series
/skills info resume-site-sync
```

Before testing Option B, remove Option A:

```text
/plugin uninstall resume-site-sync-two-pdf
/plugin install resume-site-sync-updated-pdf@student-learning-series
/skills info resume-site-sync
```

`/skills info resume-site-sync` must identify the expected originating plugin before each take. Restart the Copilot session if an uninstalled skill remains visible.

## Repository installation after merge

Once `.github/plugin/marketplace.json` is on the repository's default branch:

```text
/plugin marketplace add microsoft/student-learning-series
```

The final implementation will keep only the selected contract, promote its plugin name to `resume-site-sync`, and remove the rejected prototype.

## Trust review

Before installation, show:

1. The `microsoft/student-learning-series` repository.
2. `.github/plugin/marketplace.json` and the selected plugin's `source`.
3. The selected plugin's `plugin.json`.
4. Its complete, readable `skills/resume-site-sync/SKILL.md`.

These prototypes contain no hooks, MCP servers, executables, or pre-approved shell tools.
