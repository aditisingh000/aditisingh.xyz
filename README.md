# aditisingh.xyz

Personal portfolio site: ML projects, resume timeline, and contact. Built with plain HTML, CSS, and JavaScript—no frameworks—so it stays fast and easy to read in the repo.

## What’s in the repo

- **index.html** — Single-page layout: hero, projects, resume timeline, about, contact.
- **styles.css** — Layout, typography (Inter), and responsive breakpoints. CSS variables for colors and spacing so the look is consistent and easy to tweak.
- **script.js** — All behavior and content in one place: resume and project data, email gate, project cards, timeline rendering, smooth scrolling, and contact form handling.
- **projects/** — Optional Jupyter notebook exports (HTML) for project deep-dives; project list and metadata live in `script.js`.

## Features

- **Resume timeline** — Experience and education are defined in `resumeData` in `script.js` and rendered as a two-column timeline (experience left, education right). On small screens it collapses to one column. PDF link to the main resume is in the Resume section.
- **Projects** — The `projects` array in `script.js` drives the project cards. Each item can have a `notebookUrl` (opens in a modal or new context) or be description-only. Tags and dates are shown on the cards.
- **Email gate (optional)** — First-time visitors can be prompted for an email before seeing the main content. Submission is wired to Formspree when a form ID is set; access is remembered in `sessionStorage` for the tab. If no form ID is configured, the gate still unlocks so the site is always viewable.
- **Contact form** — Standard contact form; can be hooked to Formspree or another backend via the form action or script.
- **Responsive** — Layout and nav are tuned for desktop and mobile; the timeline and project grid adapt.

## Design and structure (train of thought)

- **Single data source** — Resume and project content live in `script.js` so updating the site is mostly editing data, not hunting through HTML. That keeps the HTML minimal and the logic visible.
- **No build step** — Open `index.html` or serve the folder to view the site. No bundler or framework, so recruiters and reviewers can run it locally without installing anything.
- **Readable code** — Sections in `script.js` are commented (resume data, projects, email gate, etc.). Styling is organized by section in `styles.css` so it’s clear what affects what.
- **Lightweight** — No heavy dependencies; fonts loaded from Google Fonts. Suited for quick loads and simple hosting (e.g. GitHub Pages, Netlify, or any static host).

## File structure

```
aditisingh.xyz/
├── index.html          # Page structure and sections
├── styles.css          # All styles and responsive rules
├── script.js           # Data (resume, projects), email gate, rendering, contact
├── projects/           # Optional notebook HTML files
├── Resume-AditiSingh.pdf
├── README.md
└── QUICKSTART.md       # Short overview for visitors and recruiters
```

## Viewing the site

- **Live:** [aditisingh.xyz](https://aditisingh.xyz) (or your deployed URL).
- **Local:** Open `index.html` in a browser, or run a simple static server (e.g. `npx serve .` or `python -m http.server`) from the repo root.

## Contact

Use the contact form on the site or the details in the About section.
