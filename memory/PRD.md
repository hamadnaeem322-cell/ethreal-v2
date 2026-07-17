# IRON & BLOSSOM — PRD

## What this project actually is
A personal tribute website dedicated to a person the owner loved.
It is NOT a fragrance/perfume brand site — it was originally scaffolded with
fragrance-brand placeholder copy, and all of that framing was removed on
2026-07-18. Do not reintroduce fragrance/perfume/olfactory language.

Brand mark: IRON & BLOSSOM. Tone: mysterious, cinematic, dark, reverent.
Video phases: 0-5s field reveal, 5-10s push to knight, 10-15s petal on armor.
CTA: "Enter the World". Sections: story, visual process, contact.
Reference scroll effect: https://skeleton-rebuild.preview.emergentagent.com/

## User Choices (2026-05-10)
- Contact: dummy/visual form (no backend, no email)
- Hero: scroll-scrubbed video using uploaded video.mp4
- Sections: only the 3 requested (story, process, contact)

## Architecture
- Frontend only (React 19 + Tailwind + framer-motion + sonner)
- Backend: unchanged hello-world template (no endpoints used)
- No 3rd-party integrations

## Core Requirements (static)
1. Scroll-scrubbed cinematic hero video with 3 synchronized phase texts
2. "Enter the World" CTA -> scroll to contact
3. Cinematic story narrative (tribute, told in three movements)
4. Visual process showcase (3 knight images)
5. Minimal contact form (dummy)
6. Dark aesthetic, Cormorant Garamond + Manrope
7. Data-testid coverage on all interactive elements

## Implemented (2026-05-10, de-branded 2026-07-18)
- Navigation with scrollTo links + mobile-safe brand mark
- HeroScroll: 500vh sticky video, framer-motion useScroll + spring, 3 phase cross-fades, poster fallback (aerial knight)
- Story (was FragranceStory): marquee, drop-cap, 3-movement triptych (Iron / Blossom / Vow)
- VisualProcess: tetris-grid using 3 knight assets + parallax
- Contact: underline-only form + sonner toasts (validation + success)
- Footer ("A Tribute · MMXXV")
- Grain + vignette overlays, reduced-motion fallback
- Tested: 100% of critical flows passing (iteration_1.json)

## Removed on 2026-07-18 (fragrance de-branding)
- Perfume note triptych (Top/Heart/Base: Iron Dew / Blossom Vow / Forge & Loam) -> tribute movements
- All "olfactory" / "scent" / "perfume" copy
- Fake atelier address (Grasse), fake email (atelier@ironandblossom.studio)
- Fake credits strip (L. Vance / K. Idris / Studio Pyre / Maison V.)
- Fake footer social links (Instagram / Vimeo / Press)
- "A Fragrance Forged in Petals" page title -> "A Tribute"

## Backlog (P1/P2)
- P2: Lenis smooth-scroll (optional cinematic polish)
- P2: Lower-res mobile video variant for cellular networks
- P2: Personal dedication text (name / dates) once the owner provides it

## Known Environment Notes
- Hero video is h264 mp4; Playwright bundled Chromium cannot decode it (MEDIA_ERR_SRC_NOT_SUPPORTED). Real Chrome/Safari/Firefox users will see full scroll-scrubbed playback. Poster image is shown as fallback in test envs.
