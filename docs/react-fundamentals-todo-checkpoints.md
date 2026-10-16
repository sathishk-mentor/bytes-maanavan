# React Fundamentals — To-Do List Code Checkpoints

This is the **learner reference** for the five React Fundamentals Bytes. The complete final application is assembled incrementally during the handbook. Use Vite + React + TypeScript. No backend is needed.

## Byte 01
Create the project with `npm create vite@latest task-manager -- --template react-ts`, then `npm install` and `npm run dev`.
Edit `src/App.tsx` to render a heading and two static list items. The visible result is a fixed To-Do List.

## Byte 02
Extract a typed `TaskItem` component, move `initialTasks` to `src/data/tasks.ts`, and render with `tasks.map`. Use the stable numeric task ID as the React key.

## Byte 03 — working interactive checkpoint

`src/components/TaskItem.tsx`
```tsx
export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TaskItem({
  task, onToggle
}: {
  task: Task;
  onToggle: (id: number) => void;
}) {
  return <li>
    <label>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </span>
    </label>
  </li>;
}
```

`src/data/tasks.ts`
```ts
import type { Task } from '../components/TaskItem';
export const initialTasks: Task[] = [
  { id: 1, title: 'Read React notes', completed: false },
  { id: 2, title: 'Practise JSX', completed: false }
];
```

`src/App.tsx`
```tsx
import { useState } from 'react';
import TaskItem, { type Task } from './components/TaskItem';
import { initialTasks } from './data/tasks';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draft, setDraft] = useState('');
  function addTask() {
    const title = draft.trim();
    if (!title) return;
    setTasks(current => [
      ...current,
      { id: Date.now(), title, completed: false }
    ]);
    setDraft('');
  }
  function toggleTask(id: number) {
    setTasks(current => current.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }
  return <main>
    <h1>My Task Manager</h1>
    <label htmlFor="new-task">New task</label>
    <input id="new-task" value={draft}
      onChange={event => setDraft(event.target.value)} />
    <button type="button" onClick={addTask}>Add</button>
    <p>{tasks.filter(task => !task.completed).length} pending</p>
    <ul>{tasks.map(task =>
      <TaskItem key={task.id} task={task} onToggle={toggleTask} />
    )}</ul>
  </main>;
}
```

## Byte 04 — save and restore

Retain all Byte 03 files. In `src/App.tsx`, import `useEffect` alongside `useState`. Replace only the `tasks` state initializer with:

```tsx
const [tasks, setTasks] = useState<Task[]>(() => {
  try {
    const saved = window.localStorage.getItem('my-tasks');
    return saved ? JSON.parse(saved) as Task[] : initialTasks;
  } catch {
    return initialTasks;
  }
});
```

Then add, **inside App and after the state declarations**:

```tsx
useEffect(() => {
  window.localStorage.setItem('my-tasks', JSON.stringify(tasks));
}, [tasks]);
```

This is a client-side Vite example. Saved data is browser-local and is not validated for untrusted/production use.

## Byte 05 — search and focus

Retain the Byte 04 code. Change the import to `import { useEffect, useRef, useState } from 'react';`.
Inside `App`, add:

```tsx
const [query, setQuery] = useState('');
const searchRef = useRef<HTMLInputElement>(null);
const visibleTasks = tasks.filter(task =>
  task.title.toLowerCase().includes(query.toLowerCase())
);
```

Place this JSX **above the `<ul>`**:

```tsx
<label htmlFor="task-search">Search tasks</label>
<input id="task-search" ref={searchRef}
  value={query} onChange={e => setQuery(e.target.value)} />
<button type="button" onClick={() => searchRef.current?.focus()}>
  Focus search
</button>
```

Replace the original `tasks.map(...)` with `visibleTasks.map(...)`.

**Final visible behavior:** Add a task, mark it complete, refresh to restore it, search by name, and click Focus. This is a complete **beginner To-Do List**; `useMemo` and `useCallback` are explained as optional optimization topics rather than required code.

## Safety and correctness checks

- A basic `Date.now()` ID is only a learning convenience; production apps require robust identity generation.
- Browser storage is local to the device and not a secure shared database.
- The tutorial avoids paid services, authentication, API keys and server deployment.
- Learners should see an expected UI result after every file change.
