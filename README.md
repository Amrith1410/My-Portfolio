# Amrith Eshwar T T · Portfolio

Software Engineer · AI Engineer. A single-page React site with a self-routing PCB-trace background,
a chip-mounted portrait, a cursor flashlight over the board, a live multi-agent diagram, animated project illustrations and a small pet that walks along the bottom of the page.

- **No router, no backend, no API keys.** It builds to plain static files, so it can be hosted anywhere.
- **Fonts are bundled** (Bricolage Grotesque, JetBrains Mono, Instrument Serif), so it makes no third-party requests.
- **Respects `prefers-reduced-motion`**: animations switch off and all content stays visible.

## Run it

```bash
npm install
npm start          # http://localhost:3000
npm run build      # static site in ./build
```

Needs Node.js 18 or newer.

## Change the content

Every word, link and number lives in **`src/data.js`**. You normally never need to touch a component.

| To change… | Edit in `src/data.js` |
|---|---|
| Your employer and start date on the role card | `profile.company`, `profile.period` |
| A mail button in Contact | `profile.links.email` |
| Headline, typed phrases, intro | `hero` |
| About text and the three "rules" | `about` |
| Role summary and the wfguard case study | `work` |
| Featured projects, impact numbers, links | `projects` (set a project's `repo` to a URL to show its Source button, or `""` to hide it) |
| Older projects | `earlier` |
| Skills ("bill of materials") | `toolbox` |

Your photo is `src/Assets/avatar.webp`. The four older project screenshots are in `src/Assets/earlier/`.

## Put it online

The build is plain static files with relative paths, so any of these work.

**Vercel (recommended).** Push the project to GitHub, then on vercel.com choose *Add New → Project* and import the repo.
Vercel detects Create React App by itself (build command `npm run build`, output folder `build`). Every push
to `main` redeploys. No Git? Run `npx vercel --prod` inside this folder.

**Netlify Drop (no Git at all).** Run `npm run build`, open <https://app.netlify.com/drop> and drag the
`build` folder onto the page. Sign in so the site stays up.

**Cloudflare Pages / GitHub Pages.** Both work too: build command `npm run build`, output folder `build`.

### After you know your final address

LinkedIn, WhatsApp and Slack build their link preview from absolute URLs. In `public/index.html`, replace
`https://my-portfolio-silk-eight-56.vercel.app` with your real address in the three places marked
(`og:url`, `og:image`, `twitter:image`), then redeploy. The preview image itself is `public/og-image.png`.

## On LinkedIn

LinkedIn can't embed a website, but it does link to one in a few places:

1. **Contact info → Website**: shows on your profile.
2. **Featured → Add → Link**: pins the portfolio card (with the preview image) under your About.
3. **Experience / Projects entries → Add link**: attach the relevant project URL.
4. **A post**: paste the link and LinkedIn shows the preview card.

If you change the preview image or text and LinkedIn still shows the old card, refresh it at
<https://www.linkedin.com/post-inspector/>.

## Project layout

```
src/
  data.js            ← all the content
  hooks.js           reveal-on-scroll, typewriter, active section
  components/
    TraceBackground  the canvas "autorouter" behind the page
    Hero, About, Work, Projects, Toolbox, Contact, Nav, Footer, Preloader
    ProjectArt       the three animated SVG illustrations
  index.css          design tokens + base
  App.css            component styles
public/              index.html, favicon, og-image.png
```
