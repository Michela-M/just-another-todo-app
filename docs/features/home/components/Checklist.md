# Checklist Component

## Description

- Represents a single task in the checklist. Includes:
- A checkbox to toggle completion state.
- Task description text.
- A delete icon to remove the task. Completed tasks are visually distinguished with strikethrough text and a disabled‑style background.

## Props

- `id` _(string, required)_ – The Firebase document ID for the task. Used as a unique identifier when toggling or deleting.
- `description` _(string, required)_ – Text of the task.
- `isCompleted` _(boolean, required)_ – Whether the task is marked as completed.
- `onToggle` _(function, required)_ – Callback triggered when the checkbox is toggled. Receives `(id, newState)`.
- `onDelete` _(function, required)_ – Callback triggered when the delete icon is clicked. Receives `(id)`.

## Usage

```jsx
<ChecklistItem
  id="1"
  description="Buy milk"
  isCompleted={false}
  onToggle={onToggle}
/>
```

## Edge Cases

- Long descriptions should wrap gracefully without breaking layout.
- Ensure delete action doesn’t interfere with toggle (distinct clickable areas).
- Handle rapid toggling or deletion gracefully (avoid race conditions with persistence).
- Completed tasks should remain readable even with strikethrough styling.
- Ensure consistent spacing when multiple items are stacked.
