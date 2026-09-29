# Radh Shahmat — Portfolio

Static site: `index.html` + `css/style.css` + `js/main.js`. No build step — open `index.html`
in a browser, or deploy the whole folder as-is (e.g. GitHub Pages, same as your current setup).

## Before you publish

1. **Add your CV** — drop your resume PDF into `assets/` and name it exactly
   `Radh_Shahmat_CV.pdf`. All three "Download CV" buttons already point there.
   (Delete `assets/PUT_YOUR_CV_HERE.txt` once you've added it.)

2. **Contact form** — the form now sends submissions directly to
   `radhshahmat91@gmail.com` through FormSubmit, so visitors do not need an email app.
   The first live submission triggers a one-time activation/confirmation email from
   FormSubmit; click that confirmation link to activate the endpoint. After activation,
   future messages are delivered directly to the inbox.

3. **Project thumbnails** — the project cards use relevant Unsplash images and keep the
   existing card layout and visual treatment.

## Structure

```
index.html
css/style.css     — theme, layout, all animations
js/main.js        — cube name-reveal intro, scroll reveals, cursor/tilt effects, form
assets/           — put Radh_Shahmat_CV.pdf here
```

## Notes

- The intro name-reveal is drawn on canvas at runtime (no video/gif), so it's crisp on any
  screen size and respects the visitor's OS-level "reduce motion" setting.
- Project cards link out to each live demo and its GitHub repo — update those in
  `index.html` under `<section id="work">` whenever a project changes.
