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
- `_bibliography/papers.bib` — publications (rendered by jekyll-scholar)
- `_news/` — news items shown on the home page
- `_projects/` — project cards
- `_data/cv.yml` + `assets/pdf/cv.pdf` — CV page and PDF download
- `_data/socials.yml` — email / GitHub / Scholar links
