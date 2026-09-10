# Muhammad Nabil Hakim — Portfolio

Personal portfolio website for Muhammad Nabil Hakim, Business Studies & Operation
Management student at Universiti Teknologi MARA (UiTM).

## Structure
- `index.html` — main site
- `style.css` — styling (dark, crimson-accent theme)
- `script.js` — mobile nav, contact form submission, footer year
- `images/hero-banner.png` — hero portrait/poster
- `Nabil_Hakim_Resume.pdf` — downloadable resume (linked from the nav, hero, and contact section)
- `contact.php` / `database/config.php` — optional backend for saving contact form submissions to MySQL (requires a `contact_messages` table)

## Deploying
Any static host works for the front end. If you want the contact form to actually
save submissions, you'll need PHP + MySQL hosting and to create the
`contact_messages` table referenced in `contact.php`.
