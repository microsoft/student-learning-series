# Ep 8 — Find GitHub repositories that fit your vision (evergreen query)

One of the most useful things an MCP unlocks: your agent can **search GitHub for you**. Instead of scrolling through thousands of repos, describe what you want and let the agent find, vet, and shortlist real repositories that match — a starting template, a reference, or inspiration.

This uses the **GitHub MCP** (built into the Copilot CLI — no extra setup). The prompt is written to stay **resilient and current**: it never hardcodes repo names, usernames, star counts, or a fixed year, so it keeps working as GitHub evolves.

## The reusable prompt
Replace **[vision]** with your own and paste it into the CLI:

> Find GitHub repositories that match this vision: **[describe the style, type, and tech — e.g., "a clean, minimalist dark‑mode developer portfolio in plain HTML and CSS that I can fork and customize"]**.
>
> Use the GitHub MCP and keep the search resilient and current:
> - Turn my vision into search qualifiers: the most relevant `topic:` tags, the right `language:` filters, and keywords from my description.
> - Only surface repos usable today: `archived:false`, and recently maintained — compute a `pushed:>` date about two years before **today's** date (don't hardcode a year).
> - Prefer licenses I can reuse (MIT, Apache‑2.0, or clearly stated) and rank by a blend of stars and recent activity, not a fixed star count.
> - Return the top 5. For each: name + link, a one‑line description, stars, last‑updated, license, and one sentence on **why it fits my vision**.
> - If there are fewer than 5 strong matches, broaden the terms and search again before answering.
> - Only list repositories the search actually returns; flag any that look unmaintained or have an unclear license.

## Why this stays evergreen
It leans only on **stable GitHub search qualifiers**, and lets the agent compute the time‑sensitive parts:

| Qualifier | Why it's resilient |
|---|---|
| `topic:` (e.g., `portfolio`, `portfolio-template`) | Topics are curated and long‑lived |
| `language:HTML` / `language:CSS` | Language names don't churn |
| `archived:false` | Always excludes dead repos |
| `pushed:>` *(agent computes ~2y ago)* | Relative to *today*, so it never goes stale |
| `license:` filter | Keeps results reusable |
| **Sort** by stars + recent activity | Surfaces what's good *now*, not a frozen list |

No repo names, usernames, dates, or star thresholds are baked in — so the same prompt works this year and next.

## Swap the vision — it's fully generic
The exact same prompt finds a starting point for anything:
- *"a modern SaaS landing page with a hero, features, and pricing, using Tailwind CSS"*
- *"a minimalist markdown blog I can deploy on GitHub Pages"*
- *"a React dashboard template with charts, MIT‑licensed"*
- *"a simple restaurant one‑pager with a menu and a contact form"*

## Good habits to teach on camera
- **Check the license** before forking — ten seconds, saves headaches.
- **Open the top result** and skim the README and last commit — the agent can do this for you.
- **Describe outcomes, not repo names** — you search by *vision*; the agent handles the syntax.

> This move replaces any hardcoded, dated repo lists. It's the difference between "here are my six repos" (specific, ages badly) and "find me what fits, right now" (generic, always current).
