# Quantum Narrative School — Official Website

**Not open source.** All rights reserved © 2018–2026 Quantum Narrative School / Nanjie Ma.  
See [LICENSE](./LICENSE). Viewing the live site is allowed; copying this repo for reuse is not.

## Live site

- Custom domain (after DNS): https://www.q-n-s.com/
- GitHub Pages preview: `https://YOUR_USER.github.io/qns-website/`

## Deploy (GitHub Pages)

1. Create a GitHub account and a **public** repository named `qns-website`  
   (Free GitHub Pages requires a public repo — see note below.)
2. Upload this folder’s contents to the repo (`main` branch).
3. Repo → **Settings** → **Pages** → Source: `Deploy from a branch` → Branch `main` / `/ (root)`.
4. After the site works on `*.github.io`, point DNS for `www.q-n-s.com` (CNAME → `YOUR_USER.github.io`).
5. In `js/guard.js`, add your Pages host to `ALLOWED_HOSTS` if needed, e.g. `youruser.github.io`.

## Private repo?

| Goal | Free GitHub |
|------|-------------|
| Everyone can open the website | Repo must usually be **public** |
| Repo private + site still public | Use **Cloudflare Pages / Netlify** (free) from a private repo, or GitHub paid plan |

“Public repo” ≠ “open source”: the LICENSE forbids reuse; it only means GitHub can host the files for Pages.

## Contact

phoenix-mx@hotmail.com
