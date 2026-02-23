# Quick overview

This repo is the source for **aditisingh.xyz** — a personal portfolio site built with plain HTML, CSS, and JavaScript.

## What you’re looking at

- **One-page site:** Hero, ML projects, resume timeline, about, and contact. Everything is in this repo; no separate backend.
- **Content in code:** Resume and project entries live in `script.js` (`resumeData` and `projects`). The HTML is mostly structure; the JS renders the timeline and project cards. That keeps updates in one place and the structure easy to follow.
- **No build step:** You can open `index.html` in a browser or run any static file server from the project root to view the site. No `npm install` or build required.
- **Notebook viewer:** Project cards open Jupyter notebooks in a modal. For that to work, the site must be served over HTTP (not opened as `file://`). Run a local server from the project root, e.g. `npx serve` or `python -m http.server 8000`, then open `http://localhost:8000` (or `http://localhost:3000` for `npx serve`). For **visitors** on the live site to see notebooks, the `projects/` folder (with all `.ipynb` files) must be committed and deployed—see README, “Ensuring visitors can always see the notebooks”.

## Features at a glance

| Feature | Where it lives | What it does |
|--------|----------------|--------------|
| Resume timeline | `script.js` → `resumeData` | Experience (left) and education (right); responsive, PDF link in section header |
| Projects | `script.js` → `projects` | Cards with title, description, tags, date; optional link to notebook HTML |
| Email gate | `script.js` → `initEmailGate()` | Optional first-visit email prompt; Formspree if configured, else still unlocks |
| Contact form | `index.html` + `script.js` | Standard form; can be wired to Formspree or another endpoint |
| Styling | `styles.css` | Layout, typography (Inter), CSS variables, responsive breakpoints |

## Design choices (train of thought)

- **Minimal stack** — No React/Vue/etc.; the code is quick to skim and run. Structure and intent are easy to see without digging through a build pipeline.
- **Data-driven UI** — Changing resume or projects means editing the arrays in `script.js`, not scattered HTML. Clear separation between data and presentation.
- **Progressive behavior** — Email gate and Formspree are optional; the site works and unlocks even if they’re not configured. No hard dependency on external services to view the portfolio.
- **Readable structure** — Comments in `script.js` mark sections (resume, projects, email gate, etc.); `styles.css` is organized by page section so it’s obvious what styles what.

For more detail (file structure, how to run locally, deployment), see **README.md**.
