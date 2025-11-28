# TaskSection

## Description

A container component that groups and displays a list of tasks under a section title. Each task is rendered as a `ChecklistItem`. If no tasks are present, a placeholder message (“No tasks”) is shown.

## Props

- `title` _(string, required)_ – Section heading (e.g., "Active Tasks", "Completed Tasks").
- `tasks` _(array, required)_ – List of task objects with shape:
  - `id` _(string)_ – The Firebase document ID for the task. Used as a unique identifier when toggling or deleting.
  - `description` _(string)_ – Task text.
  - `isCompleted` _(boolean)_ – Completion state.
- `onToggle`_(function, required)_ – Callback triggered when a task's completion state changes.
- `onDelete` _(function, required)_ – Callback triggered when a task is deleted.

## Usage

```jsx
<TaskSection
  title="Completed Tasks"
  tasks={[]}
  onToggle={() => {}}
  onDelete={() => {}}
/>,
```

## Edge Cases

- Empty list → displays “No tasks” message.
- Long task descriptions should wrap without breaking layout.
- Ensure unique `id` values to avoid React key warnings.
- Large lists should be performant — consider virtualization if scaling beyond simple use cases.
- Section titles should remain consistent with app design (e.g., “Active” vs “Completed”).
