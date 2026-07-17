# Jamie Rivera portfolio

This is the frozen Episode 7 starting website. It extends the Jamie Rivera portfolio merged in commit
`aab5fdf72c21520c12a435528cb2d09c28f418f1` and uses plain HTML, CSS, and JavaScript.

## Blog folder contract

- Save authored Markdown drafts in `blog/posts-src/<post-slug>.md`.
- Generate approved static post pages in `blog/posts/<post-slug>.html`.
- Add approved post metadata to `blog/posts.json` so the homepage and full blog page list it.
- Keep links relative so the website works from a local HTTP server and from a repository subpath.

Drafts are source material and are not linked from the website. The starting `posts.json` is empty, so this
recording baseline intentionally contains no published posts.

Each Markdown source uses this metadata:

```markdown
---
title: Post title
date: 2026-07-17
summary: A short description shown on the homepage and blog page.
---
```

After approval, run `python blog/generate_posts.py` from this folder to regenerate the static post pages and
listing metadata.
