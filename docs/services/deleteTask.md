# `deleteTask` Service

## Description

Deletes a task document from the Firebase Firestore database. This function is used to remove tasks from the `tasks` collection by their document ID.

## Parameters

- `taskId` _(string, required)_ – The Firestore document ID of the task to delete.

## Usage

```jsx
import { deleteTask } from "../services/taskService";

async function handleDelete(id) {
  try {
    await deleteTask(id);
    console.log("Task deleted:", id);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}
```

## Edge Cases

- If `taskId` does not exist in Firestore, the operation will silently succeed (Firestore ignores missing docs).
- If the user does not have permission to delete the document (rules), the function will throw an error.
- Network issues or invalid `db` references will cause the promise to reject.
- Ensure `taskId` is always a valid string — passing `null` or `undefined` will throw.
