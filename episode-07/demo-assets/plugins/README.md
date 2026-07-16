# Episode 7 plugin

This folder contains the final `resume-site-sync` plugin selected for Episode 7.

The skill compares a previous resume PDF with an updated resume PDF, then maps verified differences to the portfolio repository currently open. It proposes changes before editing and requires explicit approval before validation, commit, and push.

## Local dry-run setup

From a Copilot CLI session, add the repository checkout as a local marketplace:

```text
/plugin marketplace add C:\path\to\student-learning-series
```

Install the plugin:

```text
/plugin install resume-site-sync@student-learning-series
/skills info resume-site-sync
```

Remove it when resetting:

```text
/plugin uninstall resume-site-sync
```

`/skills info resume-site-sync` must identify the `resume-site-sync@student-learning-series` plugin before the take.

## Repository installation after merge

Once `.github/plugin/marketplace.json` is on the repository's default branch:

```text
/plugin marketplace add microsoft/student-learning-series
```

## Trust review

Before installation, show:

1. The `microsoft/student-learning-series` repository.
2. `.github/plugin/marketplace.json` and the selected plugin's `source`.
3. The selected plugin's `plugin.json`.
4. Its complete, readable `skills/resume-site-sync/SKILL.md`.

This plugin contains no hooks, MCP servers, executables, or pre-approved shell tools.
