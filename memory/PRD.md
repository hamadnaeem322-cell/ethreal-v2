# IRON & BLOSSOM — PRD

## What this project actually is
A personal tribute website dedicated to a person the owner loved.
It is NOT a fragrance/perfume brand site — it was originally scaffolded from
a fragrance-brand template, and all of that framing was removed on
2026-07-18. Do not reintroduce fragrance/perfume/olfactory language.

Brand mark: IRON & BLOSSOM. Tone: mysterious, cinematic, dark, reverent.
Video phases: 0-5s field reveal, 5-10s push to knight, 10-15s petal on armor.
Reference scroll effect: https://skeleton-rebuild.preview.emergentagent.com/

## Architecture
- Frontend only (React 19 + Tailwind + framer-motion + sonner)
- Backend: unchanged hello-world template (no endpoints used)
- No 3rd-party integrations

## What the site is (current)
1. Sound toggle (top-right): plays /media/theme.mp3 (Aşk Laftan Anlamaz theme) on loop
2. HeroScroll: 500vh sticky scroll-scrubbed video with 3 phase texts —
   The Memory / The Resonance / The Surrender — memory-themed copy
3. ThePoem: 600vh scroll-pinned bilingual poem — 5 stanzas, Arabic (RTL) with
   English translation, cross-fading one at a time over a deep-red heartbeat
   ambient light that pulses like a real heartbeat
4. Dark aesthetic, Cormorant Garamond + Manrope, grain + vignette overlays

## Removed on 2026-07-18 (fragrance de-branding)
- Unused fragrance-era components deleted: FragranceStory.jsx, VisualProcess.jsx,
  Contact.jsx, Footer.jsx, lib/assets.js (none were rendered by App.js)
- "A Fragrance Forged in Petals" page title -> "A Tribute"
- Stale fragrance comments in HeroScroll

## Deploy (2026-07-18)
- GitHub: https://github.com/hamadnaeem322-cell/ethreal-v2
- Vercel project: ethreal-v2 -> https://ethreal-v2.vercel.app
- frontend/vercel.json: SPA rewrites + CI=false (CRA warnings must not fail build)
- frontend/.npmrc: legacy-peer-deps=true (React 19 vs CRA-era peer deps)
- package.json pins ajv@^8 (fixes CRA "ajv/dist/compile/codegen" build error)

## Backlog (P2)
- Lower-res mobile video variant for cellular networks
- Personal dedication text (name / dates) once the owner provides it

## Known Environment Notes
- Hero video is h264 mp4; Playwright bundled Chromium cannot decode it (MEDIA_ERR_SRC_NOT_SUPPORTED). Real Chrome/Safari/Firefox users will see full scroll-scrubbed playback. Poster image is shown as fallback in test envs.
- Local ./node/ dir is a portable Node runtime (gitignored), not project source.
