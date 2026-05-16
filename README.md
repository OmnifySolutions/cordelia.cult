# cordelia-cult

Static landing page for [@cordelia.cult](https://www.tiktok.com/@cordelia.cult) — an AI-generated dark academia persona.

## Stack

Pure HTML + CSS. No build step. EB Garamond from Google Fonts. The `.nojekyll` file tells GitHub Pages to serve raw HTML instead of running Jekyll.

## Local preview

```
cd gh-pages
python -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create the repo (one of):
   - **gh CLI:** `gh repo create cordelia-cult --public --source=. --push`
   - **manual:** create `cordelia-cult` on github.com, then `git remote add origin git@github.com:<user>/cordelia-cult.git && git push -u origin main`
2. On github.com → repo → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `/ (root)` → Save.
3. Wait ~1 min, then visit `https://<user>.github.io/cordelia-cult`.

## Custom domain (later)

When you buy `cordelia.cult` (or `cordeliavale.com`):
1. Drop a `CNAME` file in this folder with one line: the bare domain (e.g., `cordelia.cult`).
2. At your registrar, set DNS:
   - `A` records → GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `<user>.github.io`
3. Wait for DNS propagation (~15 min – 24 hrs).
4. Repo → Settings → Pages → Custom domain field → enter `cordelia.cult` → Enforce HTTPS.
