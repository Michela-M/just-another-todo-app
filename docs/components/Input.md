# Input Component

## Description

A reusable text input field with optional label, helper text, and leading/trailing icons.

## Props

- `label`_(string, optional)_ – Visible label for the input.

- `placeholder`_(string, optional)_ – Hint text shown when the field is empty.

- `helperText` _(string, optional)_ – Additional guidance or validation rules.

- `value` _(string, required)_ – Current input value.

- `onChange` _(function, required)_ – Callback triggered when the value changes.

## Usage

```jsx
<Input placeholder="Enter your name" value="" onChange={() => {}} />
<Input
  placeholder="Email"
  label="Email Address"
  helperText="Must be at least 8 characters"
  value=""
  onChange={() => {}}
/>
```

## Edge Cases

- Long labels or helper text should wrap gracefully without breaking layout.
- Input should handle empty values, invalid characters, and rapid typing without errors.
- Disabled inputs must remain readable but clearly non‑interactive.
- Ensure consistent spacing when multiple inputs are stacked vertically.
- Validation feedback (errors, warnings) should appear inline and be accessible.

## Notes

See [Design System: Input](https://www.notion.so/Input-2b90ecac3d45803fa854f93f0b76f66f?source=copy_link) for usage guidelines and accessibility.
