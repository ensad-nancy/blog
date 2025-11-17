<!-- .github/copilot-instructions.md - Guidance for AI coding agents working on this blog project -->
# Copilot instructions for this repository

This repository is a small PHP + static-assets blog used by students. The codebase is intentionally simple: PHP renders an index of markdown articles (in `articles/`) and serves articles rendered to HTML using `assets/Parsedown.php`.

Keep edits minimal, predictable, and backwards-compatible. Below are actionable rules and examples that reflect how this project is structured and how humans maintain it.

Core concepts
- Articles: each student has a folder under `articles/{student}/` containing one or more `*.md` files. Images for an article live in `articles/{student}/images/` and are referenced in markdown using a relative path under that folder (for example: `images/photo.jpg`).
- Front matter: markdown files may contain a YAML-like front matter block delimited by `---` at the top. `index.php` and `article.php` parse front matter with simple key:value splitting — do not rely on complex YAML features.
- Rendering: `article.php` uses `assets/Parsedown.php` to convert markdown to HTML. It rewrites image paths from `images/...` to `articles/{student}/images/...` before rendering.
- Themes: CSS themes live under `themes/index/` (used by `index.php`) and `themes/article/` (used by `article.php`); each student has a theme file named `{student}.css`.

What to change (and how)
- When modifying UI, prefer editing `assets/default-styles.css` or per-student theme files in `themes/`. Adding global styles is safe in `assets/default-styles.css`.
- When changing markdown handling, update `article.php` and `index.php` together. Both files implement a lightweight front-matter parser — keep changes compatible with simple key:value lines (e.g. `title: My Title`).
- When adding server-side features, avoid introducing composer or heavy dependencies: this project is deployed as a simple PHP site and expects minimal runtime requirements.

Patterns and examples (copyable)
- Link to an article from `index.php` (format):
  - /article.php?student=STUDENT&file=FILENAME.md&date=YYYY-MM-DD
- Example front matter the code expects:
  ---
  title: Article title
  date: 2025-11-17
  tags: tag1, tag2
  preview: preview.jpg
  ---
- Image rewrite performed in `article.php` before rendering:
  Find: `![(.*?)\]\((images\/.*?)\)` → Rewrites to `articles/{student}/$2`

Developer workflows and commands
- This is a static PHP site. To test locally you can run PHP's built-in server from the repo root:

  php -S localhost:8000

  Then open http://localhost:8000/index.php or http://localhost:8000/article.php?student=louis&file=article.md

- There are no automated tests or build steps included.

Conventions and gotchas
- File names: student folders and filenames may contain non-ASCII characters (e.g. `léa`). Take care when manipulating paths; use URL encoding for links.
- Front matter parsing: the parser is naive — values are taken as the substring after the first `:` on a line. Avoid multi-line values or YAML-specific features.
- Theme selection: client-side theme switching is implemented in `assets/script-index.js` and `assets/script-article.js`. Both insert a `<link id="theme-style">` element pointing to `themes/index/{student}.css` or `themes/article/{student}.css`.
- Security: inputs from `$_GET` are used to read files. Keep any new server-side file access tightly validated; prefer explicitly allowing only directories listed in `scandir('articles')`.

Where to look first (important files)
- `index.php` — builds the list of articles and the index view.
- `article.php` — loads a markdown file, parses front matter, rewrites image paths, and renders HTML via Parsedown.
- `assets/Parsedown.php` — third-party markdown parser; leave as-is unless updating Parsedown upstream.
- `assets/script-index.js` and `assets/script-article.js` — client-side theme switching and simple filters.
- `themes/` — per-student CSS files (index and article variants).
- `articles/` — content source; each student folder contains markdown files and an `images/` subfolder.

If you need clarification
- Ask for which student folder and article to test. Provide example URLs when you submit changes so a reviewer can quickly validate (see the “link to an article” format above).

If you modify this file
- Preserve the short, example-first style and keep the file under 50 lines where possible. Merge existing content if present — prefer concrete, repo-specific instructions over general advice.

End of instructions.
