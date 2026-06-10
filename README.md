# Andreas Kotsadam — personal website

A simple, self-contained static website (plain HTML + CSS, no build step) to
replace the old WordPress page. All paper drafts and pre-analysis plans are
hosted locally in `files/`, so the site does **not** depend on WordPress.

## Files

| File | What it is |
|------|------------|
| `index.html` | The whole site (one page: About, Working papers, Publications, Contact). |
| `style.css` | Styling. |
| `picture_kotsadam_2025.jpg` | Profile photo. |
| `files/` | All hosted PDFs, replication archives, and the CV (`cv-andreas-kotsadam.pdf`). |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is. |

## How to publish it (one-time, ~5 minutes)

1. Go to <https://github.com/new> and create a repository named **exactly**
   `YOURUSERNAME.github.io` (replace `YOURUSERNAME` with your GitHub username).
   Make it **Public**.
2. Upload everything in this folder: click **"uploading an existing file"**,
   then drag in `index.html`, `style.css`, `picture_kotsadam_2025.jpg`,
   `.nojekyll`, and the whole `files/` folder. Commit.
3. In the repo, go to **Settings → Pages**. Under "Build and deployment",
   set Source = **Deploy from a branch**, Branch = **main**, folder = **/ (root)**.
   Save.
4. Wait 1–2 minutes. Your site is live at
   **`https://YOURUSERNAME.github.io/`**.

(Claude can do steps 1–3 for you with the `gh` command-line tool if you sign in
to GitHub once with `gh auth login`.)

## How to update it later

The easiest path: just tell Claude Code, e.g.
*"add this new JPE paper to my publications"* or *"move the fertility paper from
working papers to publications"*. Claude edits `index.html` and commits.

To do it by hand: each publication / working paper is one `<li>` block in
`index.html`. Copy an existing block, change the title, journal line, and links.
A link to a hosted file looks like `<a href="files/the-file.pdf">Draft</a>`;
drop the PDF into `files/` first.

## To attach a custom domain later (e.g. andreaskotsadam.com)

Buy the domain from any registrar, then in **Settings → Pages → Custom domain**
enter it and follow the DNS instructions GitHub shows. The free `.github.io`
address keeps working too.
