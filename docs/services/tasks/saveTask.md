# `saveTask` Service

## Description

Creates a new task document in the Firestore `tasks` collection.

The task is initialized as active (not completed, not archived) and includes timestamps for creation and last update.

## Parameters

- `title` _(string, required)_ – The text description of the task. Leading/trailing whitespace is trimmed.
- `userId` _(string, required)_ – The UID of the user who owns the task.
- `onTasks` _(function, optional)_ – Callback executed after the task is successfully saved.

## Behavior

- Throws an error if `title` is empty after trimming.
- Throws an error if `userId` is missing.
- Adds a new document to the `tasks` collection with fields:
  - `isArchived: false`
  - `isCompleted: false`
  - `createdAt: serverTimestamp()`
  - `updatedAt: serverTimestamp()`
  - `description: trimmedTitle`
  - `userId`: provided userId
- Executes `onTaskAdded()` if provided.

## Usage

```jsx
import { saveTask } from "../services/authentication/saveTask";

async function handleAddTask(title, userId) {
  try {
    await saveTask(title, userId, () => {
      console.log("Task successfully added!");
    });
  } catch (error) {
    console.error("Error saving task:", error.message);
  }
}
```

## Edge Cases

- **Empty or whitespace‑only titles** → throws `Error("Task title is required")`.
- **Missing `userId`** → thows `Error("User ID is required")`.
- **Network errors or permission issues** → promise rejects with Firestore error.
- Duplicate titles are allowed — uniqueness must be enforced at a higher level if needed.
- `onTaskAdded` is optional; ensure null checks before passing.
