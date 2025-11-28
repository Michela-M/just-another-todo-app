# Button Component

## Description

Provides a reusable button element for triggering actions.

## Props

- `label` _(string, required)_ – Text displayed inside the button.

- `onClick` _(function, required)_ – Callback triggered when the button is clicked.

- `disabled`_(boolean, optional)_ – Disabled the button when true.

## Usage

```jsx
<Button label="Click me" onClick={handleClick} />
<Button label="Click me" onClick={handleClick} disabled />
```

## Edge Cases

- Long labels wrap or truncate gracefully
- Disabled buttons remove hover/active states
- Ensure spacing when multiple buttons are grouped

## Notes

See [Design System: Buttons](https://www.notion.so/Button-2b20ecac3d4580b09550f651ef496019?source=copy_link) for usage guidelines and accessibility.
