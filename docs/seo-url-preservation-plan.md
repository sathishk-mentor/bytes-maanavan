# MaanavaN Bytes SEO URL Preservation Plan

## Final inventory

- 105 existing tutorial URLs
- 35 URLs retained as rewritten Handbook chapters
- 70 old tutorial URLs redirected to their closest relevant chapter
- 7 category URLs retained as Handbook landing pages
- 7 duplicate `/category/...` aliases redirected to canonical category URLs
- Homepage retained
- `/docs/` redirected after the new Handbook library is published

## Redirect policy

1. Do not activate a redirect until its destination chapter is published.
2. Use temporary redirects during staged reconstruction.
3. Change a redirect to permanent only after editorial and live-page review.
4. Never redirect an old tutorial to the homepage when a relevant chapter exists.
5. Remove redirected URLs from the XML sitemap and keep only canonical URLs.
6. Preserve the old URL, destination, activation date and review status in source control.

## New editorial structure

1. The Generative AI Handbook
2. The AI Agents Handbook
3. The Data Engineering Handbook
4. The Cloud & DevOps Handbook
5. The GitHub Copilot Handbook
6. The AI Cybersecurity Handbook
7. The Real-World AI Systems Handbook

The executable mapping is maintained in `data/seo-url-plan.ts`.
