# nozidoali.github.io

Personal academic homepage of Hanyu Wang, built with [al-folio](https://github.com/alshedivat/al-folio) (Jekyll).

## Local preview

```bash
docker compose up -d
# then open http://localhost:8080
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to the `gh-pages` branch (served by GitHub Pages).

## Content map

- `_pages/about.md` — home page bio
- `assets/bib/papers.bib` — publications (rendered by jekyll-scholar; also served raw at /assets/bib/papers.bib)
- `_publications/` — per-paper detail pages with Google Scholar citation meta (linked from bib entries via the `page` field)
- `_news/` — news items shown on the home page
- `_projects/` — project cards
- `_data/cv.yml` + `assets/pdf/cv.pdf` — CV page and PDF download
- `_data/socials.yml` — email / GitHub / Scholar links
