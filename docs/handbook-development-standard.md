# MaanavaN Bytes Handbook Development Standard

This document is the source of truth for every current and future MaanavaN Bytes handbook. Uploaded Markdown is source material, not a publish-ready structure. Rework it to this standard before review.

## 1. Learning promise

- Write for a complete beginner without making the explanation childish.
- Explain **why the concept is needed** before introducing terminology.
- Every Byte must work independently. Never assume the learner completed another Byte or handbook.
- Other Bytes and handbooks may appear only as optional backlinks.
- Use familiar Indian and everyday scenarios where they genuinely improve understanding.
- A five-Byte handbook should progress from understanding to visualising, applying and explaining.

## 2. Required 12-section spine

Section labels may adapt slightly to a coding or conceptual topic, but the learning purpose and order must remain intact.

1. **Quick Start** — hook, why it matters, prerequisite and visible learning outcome.
2. **Start from Basics / Familiar Scenario** — plain-language scenario and essential vocabulary.
3. **Core Explanation** — mental model, analogy and what fails without the concept.
4. **Architecture and Flow** — topic-specific visual workflow with readable labels.
5. **Interactive Concept or Decision Lab** — learner makes a decision after the concept is taught.
6. **Guided Walkthrough / Real-World Scale** — trace the system, code or operational flow step by step.
7. **Failure Cases and Common Mistakes** — realistic failures, misleading assumptions and recovery.
8. **Role-Based Application** — how a developer, product, support, DevOps or relevant role uses it.
9. **Comparison / User View vs System View** — make hidden system behaviour visible.
10. **Hands-On Practice** — one achievable task with a visible result or decision.
11. **Final Thought and Next Path** — exactly eight concise takeaways and one optional next action.
12. **FAQ, Knowledge Check and References** — FAQ, five-question scored interactive quiz, interview-ready explanation and credible sources.

For coding Bytes, Sections 5–10 must include code → expected output → visual execution explanation. Do not show a simulator before teaching the concept required to use it.

## 3. Interactive learning rules

- Every Byte needs at least one topic-specific interactive lab—not a decorative animation.
- The learner must choose, configure, run, compare or diagnose something.
- Show immediate right/wrong feedback, explain why, allow retry and display the resulting system behaviour.
- End with a five-question scored knowledge check and a full reset/retry action.
- Controls must be keyboard accessible, have visible focus states and use `aria-live` for feedback.
- Motion must respect `prefers-reduced-motion`.

## 4. Visual and typography rules

- Learning-path cards stay high-level: one meaningful topic visual, Byte number, stage, title, concise transformation, duration and progress.
- Detailed architecture belongs inside the Byte, not inside the library card.
- Avoid repeating one generic three-card or dashboard design across unrelated topics.
- Visuals must explain the current Byte’s system, decision or result.
- Keep labels readable on desktop and mobile; never use tiny diagram text.
- Use generous spacing, clear heading hierarchy, comfortable paragraph width and premium but restrained animation.
- Never use a digital book-cover treatment for handbook cards.

## 5. Language policy

- English is the default reading mode and canonical SEO content.
- When clean Tanglish content is supplied, provide it on the same canonical URL through the language switch.
- Tanglish must be conversational and natural, not word-for-word translation, textbook Tamil or corrupted mixed Unicode.
- Keep English technical terms when that is how learners encounter them in real work.
- English and Tanglish must have concept, visual, lab, practice and quiz parity.

## 6. Content integrity

- Do not present an illustrative architecture as a company’s confirmed internal system.
- Avoid unsupported scale numbers, invented claims and vague “industry says” language.
- Prefer official documentation, engineering blogs, standards and primary sources.
- External reference links open in a new tab.
- Avoid self-referential copy such as “Across our other handbooks…”; use an optional related-learning link instead.
- Do not add “100% human reviewed,” “Personally reviewed,” dated review labels or unnecessary LMS language.

## 7. Required page experience

- Premium breadcrumb, quick Byte navigation and correct previous/next behaviour.
- First Byte: next only. Middle Bytes: previous and next. Final Byte: previous only.
- Sathish Kumar educator/LinkedIn card.
- MaanavaN Course Library and membership continuation CTA at the end of the handbook path.
- External CTAs open in a new tab.
- Responsive mobile layout, no horizontal overflow and no clipped diagram labels.

## 8. SEO and LLM readiness

- Use a clear learner-intent title, clean slug, unique summary, relevant tags and current `updatedAt`.
- One canonical URL per Byte; language switching must not create duplicate indexable URLs.
- Use descriptive headings, concise definitions, comparison tables, FAQ and explicit source links.
- Preserve old URLs only when suitable; otherwise add a deliberate redirect plan.
- Update sitemap, feed and LLM text outputs through the existing content pipeline.

## 9. Definition of done

Before review, confirm:

- 12 required sections in the correct learning order.
- Beginner prerequisite, why, failure and visible outcome are clear.
- Standalone Byte; no prerequisite phrasing tied to another Byte.
- Topic-specific visual and learner-driven lab.
- Exactly eight takeaways.
- Five-question scored knowledge check with feedback and retry.
- English/Tanglish parity when Tanglish is present.
- Credible references and new-tab external links.
- Desktop and mobile QA, keyboard accessibility and reduced-motion behaviour.
- `npm run build` succeeds with no new errors.

Publish only to a review branch first. Share the verified Vercel preview. Merge or deploy to production only after explicit approval, then verify the production handbook path and at least one Byte route.
