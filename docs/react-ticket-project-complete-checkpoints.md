# React Support Ticket Dashboard — Runnable Project Checkpoints

This is the **source-of-truth build guide** for Bytes 11–15. Begin with the Vite React TypeScript template and execute each numbered checkpoint. All records are demonstration data; no server login, authorization or real persistence is provided.

## Byte 11 — Create the shell

```bash
npm create vite@latest support-desk -- --template react-ts
cd support-desk
npm install
npm install tailwindcss @tailwindcss/vite
```

Replace `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ plugins: [react(), tailwindcss()] });
```

Replace `src/index.css` with `@import "tailwindcss";`. Keep the Vite-generated `src/main.tsx`.

Create `src/App.tsx`:

```tsx
export default function App() {
 return <main className="mx-auto max-w-4xl p-6">
  <h1 className="text-3xl font-bold">Support Desk</h1>
  <p className="mt-2 text-slate-600">Track customer requests using demo data.</p>
 </main>;
}
```

Run `npm run dev`; verify the heading appears.

## Byte 12 — Typed tickets and reusable cards

Create `src/data/tickets.ts`:

```ts
export type Ticket = {
 id: number;
 subject: string;
 priority: 'Low' | 'Medium' | 'High';
 status: 'Open' | 'In progress' | 'Resolved';
};
export const initialTickets: Ticket[] = [
 { id: 101, subject: 'Unable to sign in', priority: 'High', status: 'Open' },
 { id: 102, subject: 'Payment receipt needed', priority: 'Medium', status: 'In progress' }
];
```

Create `src/components/TicketCard.tsx`:

```tsx
import type { Ticket } from '../data/tickets';
type Props = { ticket: Ticket; onResolve?: (id:number) => void };
export default function TicketCard({ ticket, onResolve }: Props) {
 return <article className="rounded-xl border border-slate-200 bg-white p-4">
   <h2 className="font-semibold">#{ticket.id} {ticket.subject}</h2>
   <p className="mt-1 text-sm">{ticket.priority} · {ticket.status}</p>
   {onResolve && ticket.status !== 'Resolved' &&
     <button type="button" onClick={() => onResolve(ticket.id)}
       className="mt-2 rounded bg-blue-700 px-3 py-2 text-white">Resolve</button>}
 </article>;
}
```

Replace `src/App.tsx`:

```tsx
import TicketCard from './components/TicketCard';
import { initialTickets } from './data/tickets';
export default function App() {
 return <main className="mx-auto max-w-4xl p-6">
  <h1 className="text-3xl font-bold">Support Desk</h1>
  <p>{initialTickets.length} tickets · {initialTickets.filter(t => t.status === 'Open').length} open</p>
  <div className="mt-4 grid gap-3">{initialTickets.map(t => <TicketCard key={t.id} ticket={t} />)}</div>
 </main>;
}
```

Expect two unique tickets, one Open.

## Byte 13 — Controlled form and reducer

Create `src/ticketReducer.ts`:

```ts
import type { Ticket } from './data/tickets';
export type Action =
 | { type: 'add'; ticket: Ticket }
 | { type: 'resolve'; id: number };
export function ticketReducer(state: Ticket[], action: Action): Ticket[] {
 switch (action.type) {
  case 'add': return [...state, action.ticket];
  case 'resolve': return state.map(t => t.id === action.id ? {...t, status:'Resolved'} : t);
 }
}
```

Replace `src/App.tsx`:

```tsx
import { useReducer, useState } from 'react';
import TicketCard from './components/TicketCard';
import { initialTickets } from './data/tickets';
import { ticketReducer } from './ticketReducer';
export default function App() {
 const [tickets, dispatch] = useReducer(ticketReducer, initialTickets);
 const [subject, setSubject] = useState('');
 const [error, setError] = useState('');
 function addTicket() {
  const title = subject.trim();
  if (!title) { setError('Enter a ticket subject'); return; }
  dispatch({type:'add', ticket:{id:Date.now(), subject:title, priority:'Low', status:'Open'}});
  setSubject(''); setError('');
 }
 return <main className="mx-auto max-w-4xl p-6">
  <h1 className="text-3xl font-bold">Support Desk</h1>
  <p>{tickets.length} tickets · {tickets.filter(t => t.status === 'Open').length} open</p>
  <label className="mt-4 block" htmlFor="subject">Ticket subject</label>
  <input className="w-full rounded border p-2" id="subject" value={subject}
    onChange={e => setSubject(e.target.value)} />
  {error && <p role="alert">{error}</p>}
  <button type="button" onClick={addTicket} className="my-3 rounded bg-blue-700 px-4 py-2 text-white">Create ticket</button>
  <div className="grid gap-3">{tickets.map(t =>
   <TicketCard key={t.id} ticket={t} onResolve={id => dispatch({type:'resolve',id})} />)}
  </div>
 </main>;
}
```

Try empty title, create one valid ticket, resolve it; check counts.

## Byte 14 — Mock API and navigation

Keep Byte 13 reducer and types. A full backend is **not** provided. Introduce a replaceable adapter, with loading/error/retry, and two routes.

```bash
npm install react-router
```

Create `src/api/tickets.ts`:

```ts
import { initialTickets } from '../data/tickets';
export async function fetchTickets() {
 await new Promise(resolve => setTimeout(resolve, 250));
 return initialTickets.map(t => ({...t}));
}
```

Update `src/main.tsx`: import `BrowserRouter` from `react-router` and wrap `<App />` inside `<BrowserRouter>`.

Create `src/pages/TicketsPage.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { Ticket } from '../data/tickets';
import { fetchTickets } from '../api/tickets';
export default function TicketsPage() {
 const [tickets, setTickets] = useState<Ticket[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
 const [attempt, setAttempt] = useState(0);
 useEffect(() => {
  let live = true;
  setLoading(true); setError('');
  fetchTickets().then(data => { if(live) setTickets(data); })
    .catch(() => { if(live) setError('Unable to load tickets'); })
    .finally(() => { if(live) setLoading(false); });
  return () => { live = false; };
 }, [attempt]);
 if (loading) return <p role="status">Loading tickets…</p>;
 if (error) return <div><p role="alert">{error}</p><button onClick={()=>setAttempt(v=>v+1)}>Retry</button></div>;
 return <ul>{tickets.map(t=><li key={t.id}><Link to={`/tickets/${t.id}`}>{t.subject}</Link></li>)}</ul>;
}
```

Create `src/pages/TicketDetailsPage.tsx`:

```tsx
import { Link, useParams } from 'react-router';
import { initialTickets } from '../data/tickets';
export default function TicketDetailsPage(){
 const { id } = useParams();
 const ticket = initialTickets.find(t => t.id === Number(id));
 if (!ticket) return <p role="alert">Ticket not found</p>;
 return <section><Link to="/tickets">← All tickets</Link><h2>{ticket.subject}</h2><p>{ticket.status}</p></section>;
}
```

For this checkpoint, replace `src/App.tsx` with a **routing shell** (the Byte 13 form is intentionally replaced rather than integrated):

```tsx
import { Link, Navigate, Route, Routes } from 'react-router';
import TicketsPage from './pages/TicketsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
export default function App(){
 return <main className="mx-auto max-w-4xl p-6">
  <h1 className="text-3xl font-bold">Support Desk</h1>
  <nav className="my-4"><Link to="/tickets">All tickets</Link></nav>
  <Routes>
   <Route path="/" element={<Navigate to="/tickets" replace />} />
   <Route path="/tickets" element={<TicketsPage />} />
   <Route path="/tickets/:id" element={<TicketDetailsPage />} />
  </Routes>
 </main>;
}
```

**Project design limitation:** This teaches the routing and mock API boundary, but does not yet preserve form edits from Byte 13 across navigation. Adding shared server state and durable ticket writes belongs in a subsequent full-stack project; do not imply these demonstration checkpoints have a database.

## Byte 15 — Tests and release

Install:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Create `src/ticketReducer.test.ts` using the reducer from Byte 13:

```ts
import { test, expect } from 'vitest';
import { ticketReducer } from './ticketReducer';
test('adds an issue', () => {
 const ticket = {id:1,subject:'Login issue',priority:'High' as const,status:'Open' as const};
 expect(ticketReducer([],{type:'add',ticket})).toEqual([ticket]);
});
```

Run `npx vitest run` and `npm run build`. Check list URL, valid detail URL, invalid detail URL, loading/error/retry, keyboard navigation, and mobile layout. Configure host fallback for nested client-side routes.

**Before real use:** add authentication and authorization, a real API and database, server-side validation, rate limits, monitoring and data privacy safeguards.

**Primary references:** React: https://react.dev/learn ; Vite: https://vite.dev/guide/ ; React Router: https://reactrouter.com/start/declarative/installation ; Testing Library: https://testing-library.com/docs/react-testing-library/intro/
