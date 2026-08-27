# Munzur Temizlik – Pixel-Perfect WordPress Rebuild

## Goal
Reproduce the live WordPress site (https://munzurtemizlik.com/) as closely as possible in the existing TanStack Start + React project, page by page and section by section.

## Scope
- Homepage: every section (hero, quote form, how it works, about, advantages/stats, services, testimonials, FAQ, blog, footer CTA) matched to the original layout, copy, images and colors.
- Header / footer: exact menu labels, order, icons, phone/search widgets and logo placement.
- All routes already created (`/hakkimizda/*`, `/hizmetlerimiz/*`, `/hizmet-bolgeleri/*`, `/blog`, `/iletisim`, `/teklif-formu`) updated to mirror the original pages.
- Favicon and logo already corrected; this plan focuses on the remaining visual fidelity.

## Approach
1. Fetch & inventory
   - Scrape the live homepage and key inner pages as markdown + screenshots via the agent gateway.
   - List every visible section, image URL, color value and font size.
   - Download any missing original images to `src/assets/images/`.
2. Homepage rebuild
   - Replace each homepage section with markup that matches the original structure and styling.
   - Use the design tokens in `src/styles.css`; add new tokens only when the original truly requires a value not already present.
   - Keep the existing data-driven components but adjust their layout to match.
3. Inner pages
   - Update `hakkimizda.index.tsx`, `hakkimizda.temizlik-sureci.tsx`, `hakkimizda.sikca-sorulan-sorular.tsx`.
   - Update `hizmetlerimiz.index.tsx` and `hizmetlerimiz.$slug.tsx`.
   - Update `hizmet-bolgeleri.index.tsx` and `hizmet-bolgeleri.$slug.tsx`.
   - Update `iletisim.tsx`, `teklif-formu.tsx`, `blog.index.tsx`, `/$slug.tsx`.
4. Shared chrome
   - Finalize `Header.tsx` and `Footer.tsx` against original screenshots.
5. Verification
   - Run `bunx tsc --noEmit` after each batch.
   - Capture preview screenshots and compare with original site screenshots.

## Deliverables
- Pixel-perfect homepage and inner pages.
- Clean build with no TypeScript errors.
- All original images and copy preserved locally.

## Notes
- The user explicitly asked for a 1:1 reproduction; no new design direction will be introduced.
- SEO metadata, canonical URLs and sitemap already exist and will be preserved.
