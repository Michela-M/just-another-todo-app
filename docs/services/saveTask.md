# `saveTask` Service

## Description

Creates a new task document in the Firestore `tasks` collection.

The task is initialized as active (not completed, not archived) and includes timestamps for creation and last update.

## Parameters

- `title` \_(string, required)\_\_ – The text description of the task. Leading/trailing whitespace is trimmed.
- `onTasks` _(function, optional)_ – Callback executed after the task is successfully saved.

## Behavior

- Throws an error if `title` is empty after trimming.
- Adds a new document to the `tasks` collection with fields:
  - `isArchived: false`
  - `isCompleted: false`
  - `createdAt: serverTimestamp()`
  - `updatedAt: serverTimestamp()`
  - `description: trimmedTitle`
- Executes `onTaskAdded()` if provided.

## Usage

```jsx
import { saveTask } from "../services/taskService";

async function handleAddTask(title) {
  try {
    await saveTask(title, () => {
      console.log("Task successfully added!");
    });
  } catch (error) {
    console.error("Error saving task:", error.message);
  }
}
```

## Edge Cases

- Empty or whitespace‑only titles → throws `Error("Task title is required")`.
- Network errors or permission issues → promise rejects with Firestore error.
- Duplicate titles are allowed — uniqueness must be enforced at a higher level if needed.
- `onTaskAdded` is optional; ensure null checks before passing.
