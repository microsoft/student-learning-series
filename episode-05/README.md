# Episode 5 — Context

**Phase 2 · Concepts**

In this episode, Shivani and Emily explain how context, tokens, and the context window affect Copilot’s work. They compare the same portfolio task before and after adding concise project notes, demonstrating how relevant context can reduce repeated questions, corrections, and broad file searches.

## Demo artifact: Student portfolio

**Folder:** `portfolio/`

The portfolio begins without a `README.md` or `AGENTS.md`. During the episode, Copilot:

- Attempts to create a case-study page without project context.
- Creates concise project notes for future sessions.
- Repeats the identical task in a fresh session.
- Compares the actual prompts and corrections required.
- Produces a style-matched case-study page and links it from the corresponding project.

## How to open it

From the repository root, run:

```powershell
python -m http.server 8765 --bind 127.0.0.1 --directory episode-05\portfolio
```

Then open http://127.0.0.1:8765/.

The site uses plain HTML, CSS, JavaScript, Markdown source files, and a small standard-library Python generator. It has no package installation or build-tool dependency.

## Project notes

The demo creates two files that act as notes for the agent:

- ```README.md```: explains what the portfolio is, who it is for, and how it is organized.
- ```AGENTS.md```: directs Copilot to the README and records concise, reusable working instructions.

Reusable project facts belong in these files. Temporary requirements for the current task remain in the current prompt.

## Prompts used in the demo

Folder:  demo-assets/prompts/ 

### Case-study prompt

This exact prompt is used for both the before-context and after-context attempts:

```Add a case-study page for [Project X] that matches my portfolio. Include what the project was, what I did, and the result. Link it from the matching project.```

Both attempts use the same repository, model, reasoning effort, and session mode.

### Project-context prompt

```Inspect this portfolio and draft two concise files. README.md should explain what the portfolio is, who it is for, and its main sections. AGENTS.md should tell Copilot to read README.md before making changes and should contain only reusable instructions: where verified project facts live, which visual style to match, what a case study must include, and how to verify a change. Do not include temporary task details. Show me both drafts before saving them.```

The files are reviewed for accuracy, duplication, and irrelevant details before they are saved.

## Before-and-after sessions

The comparison uses two separate Copilot app sessions under the same repository:

• Case study — No context
• Case study — With context

The first session runs without ```README.md``` or ```AGENTS.md```. The second begins with fresh conversation history and can use the reviewed project notes.

### Context, tokens, and the context window

The episode uses a suitcase analogy:

• Context is all the information Copilot can use for the current task.
• Tokens are the pieces used to process that information.
• The context window is the limited space available for those pieces.

Too little relevant context can cause questions, guesses, or incorrect assumptions. Too much irrelevant context consumes space without helping.

Tokens are not the same as premium requests or AI credits. Tokens describe processed information, while premium requests and credits relate to plan usage.

## Visual explainer

The lightboard shows a suitcase labeled Context Window filled with token blocks labeled:

- Prompt
- Conversation
- Files
- README
- AGENTS.md

It then compares:

| No Project Guide | Concise Project Guide |
|---|---|
| Repeated corrections | Reusable facts |
| Broad searches | Focused current task |
| Guesses and assumptions | Fresh session |


The goal is not to provide the most context possible. It is to provide the smallest accurate set of information needed for the task.

## Session guidance

Continue the current session while refining the same goal. Start a fresh session when the goal changes or the existing conversation is mostly irrelevant.

Separate sessions keep their own conversation context and may use different modes, models, reasoning effort, working trees, and branches. Use separate working trees when multiple sessions will modify files simultaneously.

If  /compact  is available in the filmed Copilot app build, it may be used to summarize older conversation while continuing the same task. It is not a substitute for separating unrelated work.

## What a viewer can do after this episode

- Explain context, tokens, and the context window in nontechnical language.
- Distinguish reusable project context from task-specific instructions.
- Create and review concise  README.md  and  AGENTS.md  notes in the Copilot app.
- Use separate sessions to keep conversation context focused.
- Compare actual prompt and correction counts.
- Decide whether to continue, compact, or start fresh.
-  Review Copilot’s output rather than assuming that context guarantees correctness.
