# Episode 08 — MCPs: Give Your Agent Superpowers

An **MCP** (Model Context Protocol server) is like a **USB-C port for your AI** — one standard plug
that lets your Copilot CLI agent use other apps: Word, PowerPoint, a web browser, and GitHub itself.
This episode adds real tools to the portfolio you built in Episode 2.

- **Persona:** Jamie Rivera (see [`../common/`](../common/)).

## The moves in this episode
- **Word MCP → a real résumé.** The agent generates a formatted `.docx` résumé —
  **`Jamie-Rivera-Resume.docx`** — which the site's "Download résumé" button points to.
- **PowerPoint MCP → a matching deck.** A slide deck built from the same résumé —
  **`Jamie-Rivera-Portfolio.pptx`**.
- **GitHub MCP → find a starting point.** The agent searches all of GitHub for repositories and
  templates that fit your vision. The reusable, evergreen prompt is in **`find-repos-prompt.md`**.

## What's in this folder
- **`find-repos-prompt.md`** — the resilient "find repositories that fit my vision" prompt (never
  hardcodes repo names, dates, or star counts, so it stays current).
- **`mcp-config.json`** — the Office (Word + PowerPoint) MCP configuration for the Copilot CLI.
- **`Jamie-Rivera-Resume.docx`** — the Word-MCP résumé.
- **`Jamie-Rivera-Portfolio.pptx`** — the PowerPoint deck.
- **`preview.png`** — the deck's title slide.

## Setup note
The Office MCP servers run via `uvx` (no local install needed). The Word server needs a raised
startup `timeout` — already set in `mcp-config.json` — or the CLI drops it during startup. Add them
with `copilot --additional-mcp-config "@episode-08/mcp-config.json"`. The GitHub MCP is built into
the Copilot CLI, so the "find repositories" move needs no extra setup.

