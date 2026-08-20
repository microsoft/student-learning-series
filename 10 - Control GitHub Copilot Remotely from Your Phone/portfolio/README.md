# Episode 10 portfolio website

This folder contains Jamie Rivera's portfolio website for Episode 10.

## Folder contents

| Path | Purpose |
| --- | --- |
| `index.html` | Main portfolio page, including the homepage blog preview. |
| `styles.css` | Bootstrap-aware styling for the portfolio, blog, published posts, gallery, and section progress states. |
| `script.js` | Integrated Section Progress Navigation, Bootstrap menu behavior, theme switching, reveal animations, gallery rotation, and blog listing behavior. |
| `campus-recycling-dashboard-case-study.html` | Detailed case study carried forward from Episode 5. |
| `resume/` | Resume displayed and downloaded from the portfolio. |
| `blog/index.html` | Full list of published blog posts. |
| `blog/posts-src/` | Markdown source files used to write and edit posts. |
| `blog/posts/` | Static HTML pages generated for published posts. |
| `blog/posts.json` | Post titles, dates, summaries, and links shown in the website's blog lists. |
| `blog/generate_posts.py` | Converts approved Markdown sources into static post pages and updates `posts.json`. |

This cumulative completed state includes Bootstrap 5.3.3 and Bootstrap Icons, two
published posts, the updated resume, hobbies, the Trail Journal photo gallery, and
desktop/mobile section progress. To regenerate approved posts from their Markdown
sources, run `python blog/generate_posts.py` from this folder.
