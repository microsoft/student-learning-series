# Episode 10 portfolio website

This folder contains Jamie Rivera's portfolio website for Episode 10.

## Folder contents

| Path | Purpose |
| --- | --- |
| `index.html` | Main portfolio page, including the homepage blog preview. |
| `styles.css` | Shared styling for the portfolio, blog, published posts, and section progress states. |
| `script.js` | Integrated Section Progress Navigation, responsive menu behavior, theme switching, reveal animations, and blog listing behavior. |
| `resume/` | Resume displayed and downloaded from the portfolio. |
| `blog/index.html` | Full list of published blog posts. |
| `blog/posts-src/` | Markdown source files used to write and edit posts. |
| `blog/posts/` | Static HTML pages generated for published posts. |
| `blog/posts.json` | Post titles, dates, summaries, and links shown in the website's blog lists. |
| `blog/generate_posts.py` | Converts approved Markdown sources into static post pages and updates `posts.json`. |

The website includes two published posts. To regenerate approved posts from their
Markdown sources, run `python blog/generate_posts.py` from this folder.
