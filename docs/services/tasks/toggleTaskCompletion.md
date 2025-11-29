# `toggleTaskCompletion` Service

## Description

Updates the completion state of a task in the Firestore `tasks` collection. This function toggles a task between active and completed by updating the `isCompleted` field.

## Parameters

- `taskId` _(string, required)_ – The Firestore document ID of the task to update.
- `isCompleted` _(boolean, required)_ – The new completion state (`true` for completed, `false` for active).

## Usage

```jsx
import { toggleTaskCompletion } from "../services/taskService";

async function handleToggle(id, state) {
  try {
    await toggleTaskCompletion(id, state);
    console.log(`Task ${id} marked as ${state ? "completed" : "active"}`);
  } catch (error) {
    console.error("Error toggling task:", error);
  }
}
```

## Edge Cases

- If `taskId` does not exist, Firestore will throw an error.
- If the user lacks permission to update the document, the operation will fail.
- Ensure `isCompleted` is always a boolean — passing `null` or other types will cause errors.
- Network issues or invalid `db` references will reject the promise.
