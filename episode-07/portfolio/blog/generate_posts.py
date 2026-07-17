from __future__ import annotations

import html
import json
import re
from datetime import date
from pathlib import Path


BLOG_DIR = Path(__file__).parent
SOURCE_DIR = BLOG_DIR / "posts-src"
OUTPUT_DIR = BLOG_DIR / "posts"
POSTS_FILE = BLOG_DIR / "posts.json"
REQUIRED_FIELDS = ("title", "date", "summary")


def parse_post(source_path: Path) -> tuple[dict[str, str], str]:
    text = source_path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise ValueError(f"{source_path.name}: expected metadata between --- lines")

    try:
        metadata_text, body = text[4:].split("\n---\n", 1)
    except ValueError as error:
        raise ValueError(f"{source_path.name}: metadata is missing its closing --- line") from error

    metadata: dict[str, str] = {}
    for line in metadata_text.splitlines():
        key, separator, value = line.partition(":")
        if not separator or not key.strip() or not value.strip():
            raise ValueError(f"{source_path.name}: invalid metadata line: {line}")
        metadata[key.strip()] = value.strip()

    missing = [field for field in REQUIRED_FIELDS if not metadata.get(field)]
    if missing:
        raise ValueError(f"{source_path.name}: missing metadata: {', '.join(missing)}")

    date.fromisoformat(metadata["date"])
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", source_path.stem):
        raise ValueError(f"{source_path.name}: filename must be a lowercase kebab-case slug")

    return metadata, body.strip()


def render_inline(text: str) -> str:
    escaped = html.escape(text)
    escaped = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(
        r"\[([^\]]+)\]\((https?://[^)\s]+)\)",
        r'<a href="\2" rel="noopener noreferrer">\1</a>',
        escaped,
    )
    return escaped


def render_markdown(markdown: str) -> str:
    output: list[str] = []
    paragraph: list[str] = []
    list_type: str | None = None

    def flush_paragraph() -> None:
        if paragraph:
            output.append(f"<p>{render_inline(' '.join(paragraph))}</p>")
            paragraph.clear()

    def close_list() -> None:
        nonlocal list_type
        if list_type:
            output.append(f"</{list_type}>")
            list_type = None

    for raw_line in markdown.splitlines():
        line = raw_line.strip()
        if not line:
            flush_paragraph()
            close_list()
            continue

        heading = re.match(r"^(#{2,3})\s+(.+)$", line)
        unordered = re.match(r"^[-*]\s+(.+)$", line)
        ordered = re.match(r"^\d+\.\s+(.+)$", line)

        if heading:
            flush_paragraph()
            close_list()
            level = len(heading.group(1))
            output.append(f"<h{level}>{render_inline(heading.group(2))}</h{level}>")
        elif unordered or ordered:
            flush_paragraph()
            next_list_type = "ul" if unordered else "ol"
            if list_type != next_list_type:
                close_list()
                output.append(f"<{next_list_type}>")
                list_type = next_list_type
            item = (unordered or ordered).group(1)
            output.append(f"<li>{render_inline(item)}</li>")
        elif line.startswith("> "):
            flush_paragraph()
            close_list()
            output.append(f"<blockquote>{render_inline(line[2:])}</blockquote>")
        else:
            close_list()
            paragraph.append(line)

    flush_paragraph()
    close_list()
    return "\n        ".join(output)


def render_post_page(metadata: dict[str, str], body_html: str) -> str:
    title = html.escape(metadata["title"])
    published = html.escape(metadata["date"])
    summary = html.escape(metadata["summary"])
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | Jamie Rivera</title>
  <meta name="description" content="{summary}" />
  <link rel="stylesheet" href="../../styles.css" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <nav class="nav container" aria-label="Primary">
      <a href="../../" class="brand">Jamie Rivera</a>
      <ul id="nav-links" class="nav-links">
        <li><a href="../../">Home</a></li>
        <li><a href="../">Blog</a></li>
      </ul>
      <div class="nav-controls">
        <button id="theme-toggle" class="theme-toggle" type="button" aria-pressed="false" aria-label="Switch to dark mode">Dark mode</button>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" type="button">Menu</button>
      </div>
    </nav>
  </header>
  <main id="main">
    <article class="container section blog-post reveal">
      <p class="eyebrow">{published}</p>
      <h1>{title}</h1>
      <p class="summary">{summary}</p>
      {body_html}
      <p class="blog-actions"><a href="../"><span aria-hidden="true">&larr;</span> Back to blog</a></p>
    </article>
  </main>
  <footer class="site-footer">
    <div class="container"><p>&copy; <span id="year"></span> Jamie Rivera</p></div>
  </footer>
  <script src="../../script.js"></script>
</body>
</html>
"""


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    posts: list[dict[str, str]] = []

    for output_path in OUTPUT_DIR.glob("*.html"):
        output_path.unlink()

    for source_path in SOURCE_DIR.glob("*.md"):
        metadata, body = parse_post(source_path)
        output_name = f"{source_path.stem}.html"
        output_path = OUTPUT_DIR / output_name
        output_path.write_text(
            render_post_page(metadata, render_markdown(body)),
            encoding="utf-8",
        )
        posts.append(
            {
                "title": metadata["title"],
                "date": metadata["date"],
                "summary": metadata["summary"],
                "url": f"posts/{output_name}",
            }
        )

    posts.sort(key=lambda post: post["date"], reverse=True)
    POSTS_FILE.write_text(f"{json.dumps(posts, indent=2)}\n", encoding="utf-8")
    print(f"Generated {len(posts)} post(s).")


if __name__ == "__main__":
    main()
