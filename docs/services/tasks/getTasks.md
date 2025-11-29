# `getTasks` Service

## Description

Fetches all non‑archived tasks from the Firestore `tasks` collection. Optionally filters tasks by completion state (`isCompleted`) and returns them sorted by `updatedAt` (most recent first).

## Parameters

- `userId` _(string, required)_ – The UID of the user whose tasks should be fetched. Tasks belonging to other users are excluded.

- `isCompleted` _(boolean / null, optional)_ –
  - `true`: return only completed tasks.
  - `false`: return only active tasks.
  - `null` (default): return all non-archived tasks.

## Return Value

- An array of task objects with the following shape:
  - `id` (string) — Firestore document ID.
  - `description` (string) — Task text.
  - `userId` (string) – The UID of the task owner.
  - `isCompleted` (boolean) — Completion state.
  - `updatedAt` (timestamp) — Last update time.
  - Any other fields stored in the document.

## Usage

```jsx
import { getTasks } from "../services/authentication/getTasks";

async function loadTasks() {
  try {
    const activeTasks = await getTasks("abc123", false);
    const completedTasks = await getTasks("abc123", true);
    const allTasks = await getTasks("abc123"); // returns all non-archived tasks
    console.log(activeTasks, completedTasks, allTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}
```

## Edge Cases

- If no tasks exist, returns an empty array.
- If `updatedAt` is missing, defaults to `0` (those tasks will sort last).
- Firestore query only filters `isArchived == false` — archived tasks are excluded automatically.
- Passing an invalid or missing userId will result in an empty array.
- Network errors or permission issues will throw an exception.
- Large collections may impact performance — consider pagination or limiting results if scaling.
