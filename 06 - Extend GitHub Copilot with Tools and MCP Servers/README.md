# Episode 6 - Extend GitHub Copilot with Tools and MCP Servers

Use built-in tools and a Model Context Protocol (MCP) server to help Copilot work beyond
the chat window.

## What you'll learn

- The difference between Copilot's reasoning and the tools it can call.
- How prompts help Copilot choose file, internet, and browser tools.
- What MCP servers add to a Copilot session.
- How Playwright can automate a browser after you approve tool use.

## Try it yourself

1. Open [`index.html`](index.html) and review the completed portfolio example.
2. Ask Copilot to find relevant files before changing the website.
3. Configure the Playwright MCP server through the Copilot app.
4. Start a fresh session and ask Playwright to open a page and report what it finds.

## Prompts

```text
Search my local files for suitable trail photos, explain which tools you use, and propose
where the images should appear in my portfolio before changing any files.
```

```text
Use Playwright to open the Microsoft Developer website, summarize the page, and take a
screenshot. Ask before installing software or changing browser settings.
```

## Expected result

The portfolio includes a Trail Journal photo gallery and a linked project case study.
Copilot can also call the configured browser tool in a new session.

## Troubleshooting

- If an MCP server does not appear, confirm it is enabled and start a fresh session.
- If Playwright cannot find its default browser, configure it to use an installed browser
  such as Microsoft Edge.
- If a tool call is blocked, review its requested permission instead of granting broad
  access automatically.
- If images or the case-study page do not load, confirm the relative paths still point to
  files in this folder or `../common/`.
