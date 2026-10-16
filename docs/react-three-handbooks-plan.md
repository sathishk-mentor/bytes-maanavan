# React.js — Three-Handbook Build Specification

Status: authoring/review branch; not production-ready.
Source of truth: [Handbook Development Standard](./handbook-development-standard.md).
Approved structure: **3 standalone handbooks × 5 Bytes = 15 Bytes**.

## Design and editorial contract

- Existing Bytes navigation, typography, MDX renderer, accessible interactive labs, scored 5-question quizzes, eight takeaways, author card, related learning and SEO pipeline are required.
- Each Byte follows all 12 mandated sections in `docs/handbook-development-standard.md`. Standalone explanations; no compulsory previous Byte.
- English canonical copy; Tanglish optional only with concept/visual/lab/quiz parity.
- No unverified claims about actual corporate systems. No screenshots of copyrighted products.
- React documentation: https://react.dev/learn ; https://react.dev/reference/react
- TypeScript handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- Vite: https://vite.dev/guide/ ; React Router: https://reactrouter.com/
- No deployment or merge to production until verified preview and approval.

## Handbook 1 — React Fundamentals

Proposed slug: `react-fundamentals` (five Bytes; beginner).

| # | Canonical Byte topic | Specific interactive concept lab |
|---|---|---|
| 01 | What Is React? Components, UI Trees and Rendering | Assemble a component tree from a UI scenario |
| 02 | JSX, Components and Props | Choose props and observe updated reusable cards |
| 03 | React State and Event Handling with useState | Predict next rendered counter/list after events |
| 04 | When and How to Use useEffect | Classify effect vs render/event logic; inspect cleanup |
| 05 | Essential React Hooks: useRef, useMemo and useCallback | Pick appropriate Hook or no Hook for concrete scenarios |

## Handbook 2 — Advanced React Development

Proposed slug: `advanced-react` (five Bytes; intermediate).

| # | Canonical Byte topic | Specific interactive concept lab |
|---|---|---|
| 01 | React Forms, Validation and useReducer | Debug validation and reducer state transitions |
| 02 | React API Integration and Server State | Diagnose loading, success, error and retry UI |
| 03 | React Router, Context and Custom Hooks | Map navigation and shared-state ownership |
| 04 | TypeScript with React: Props, State and Hooks | Fix typed props, events and API responses |
| 05 | React Performance, Accessibility and Testing | Identify bottlenecks, missing semantics and test cases |

## Handbook 3 — Industry React Project: Support Ticket Dashboard

Proposed slug: `react-support-ticket-project` (five Bytes; project-first).

**Illustrative business brief:** Support agents receive issues, prioritize and assign cases, and record resolution. Educational application, not a production customer-data system.

### Milestones

| # | Development step | Shippable checkpoint |
|---|---|---|
| 01 | Initialize Vite, React, TypeScript, Tailwind; define ticket schema | Responsive application shell, mock records |
| 02 | Build dashboard, ticket list and detail views | Reusable typed cards, table, filters, accessible empty state |
| 03 | Build ticket creation, editing, assignment and status flow | Validated forms, reducer-driven state transitions |
| 04 | Add routing, API boundary and shared state | Navigation, loading/error/retry, mock REST adapter |
| 05 | Test, optimize, document and deploy | Tested repository, deployment checklist, Vercel preview |

### Suggested ticket shape

```ts
type TicketStatus = 'open' | 'in_progress' | 'resolved';
type Priority = 'low' | 'medium' | 'high';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  assignee: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### Engineering boundaries

- Demo/mock data only. Do not claim secure enterprise authentication, real user authorization, or production data persistence.
- API layer uses a replaceable mock adapter before any real backend.
- Accessibility: label every input; keyboard focus, form errors and status messages.
- Tests: ticket status reducer, form validation and primary ticket-list interactions.
- Model state changes and request/error behaviours precisely. Explain useEffect only for synchronization with external systems; avoid teaching it for derived state.

## Routing and discovery plan

- The existing repository uses `/handbooks/` for discovery and root slug routes for published handbook landings. Integrate with `lib/handbooks.ts`, category metadata and static params; don't bolt on stand-alone pages.
- Three handbook landing routes: `/react-fundamentals/`, `/advanced-react/`, `/react-support-ticket-project/`.
- Fifteen child Byte routes follow each handbook's landing prefix; check current `app/[categorySlug]/[byteSlug]/page.tsx` and `lib/mdx.ts` before introducing category slugs.
- Verify category is Software Engineering on handbook discovery; internal category IDs and URL prefixes must be consistent.
- Add contextual links to `https://www.maanavan.com/learn-react-in-tamil` and existing valid course/membership CTAs; do not fabricate destinations.
- Verify sitemap, feed, LLM files, schema metadata, canonical tags and all 15 URLs.

## Release checklist

1. Produce all 15 compliant MDX lessons (12 sections, original topic visuals and labs, 8 takeaways, 5-question scored quizzes).
2. Register three handbook records and all URLs, verify sidebar / previous-next / final CTA.
3. Build and test locally (`npm run build`), inspect mobile & desktop, exercise each lab and quiz.
4. Create a review PR; verify preview deployment URL actually serves landing and Byte pages.
5. Obtain explicit approval before any production release.
