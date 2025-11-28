# Home

## Purpose

The Home feature is the central view of the website. It provides a minimal, distraction‑free interface where users can quickly see their tasks, split into active and completed lists, and add new tasks with a single input.

## Structure

- `components/` – UI elements specific to home (e.g. TaskSections)

## Key Flows

- **Display active tasks**: Fetch and render all tasks that are not yet completed.
- **Display completed tasks**: Fetch and render all tasks marked as completed, visually distinguished with strikethrough and disabled background.
- **Add new task**: Input field allows users to create a new task, which is added to the active list.
- **Toggle task state**: Users can mark tasks as completed or revert them back to active via the checklist item.
- **Delete task**: Each task includes a delete action to remove it from the list.
- **Update view**: Lists update dynamically when tasks are added, toggled, or deleted, ensuring the home page always reflects the current state.
