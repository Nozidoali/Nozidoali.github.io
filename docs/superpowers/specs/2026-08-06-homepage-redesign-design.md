# Personal Homepage Redesign — Design

Date: 2026-08-06
Status: approved (chat), implemented on branch `al-folio`

## Goal

Replace the hand-written HTML homepage at nozidoali.github.io with an al-folio (Jekyll)
academic site, then move it onto a personally-owned domain with custom-domain email.

## Decisions

- **Template**: al-folio v1.1 (Jekyll starter + `al_folio_core` gem runtime), academic
  multi-page layout: about / publications / projects / repositories / CV.
- **Hosting**: GitHub Pages, same repo (`Nozidoali/Nozidoali.github.io`).
  Deploy via the template's `deploy.yml` GitHub Action (push to `main` → build → `gh-pages` branch).
  After first deploy, Pages source must be switched to the `gh-pages` branch.
- **Old site**: preserved in git history on `main`; redesign developed on branch `al-folio`
  and merged only after user approval.
- **Publications**: `_bibliography/papers.bib`, entries pulled from DBLP and verified by
  coauthor lists; IWLS workshop papers hand-written. 12 entries, 3 with best-paper-nominee
  badges, 4 marked `selected` for the home page.
- **Domain** (user action): buy at Cloudflare Registrar; then add a `CNAME` file to the repo
  and a DNS CNAME record `www`/apex → `nozidoali.github.io`.
- **Email** (after domain): Cloudflare Email Routing (free) forwarding to Gmail, plus
  Gmail "Send mail as" over SMTP. No self-hosted mail server.

## Out of scope

- Blog (infrastructure kept, hidden from nav; no posts).
- Course list ("Inputs" section of the old site) — dropped, dated.
- Google Scholar ID — user to fill `scholar_userid` in `_data/socials.yml`.
