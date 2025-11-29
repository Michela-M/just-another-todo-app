# `logout` Service

## Description

Ends the current Firebase Authentication session by signing out the active user. After calling `logout()`, the user is no longer authenticated, and `getCurrentUser()` will return `null`.

## Parameters

- _(none)_ — This function does not take any arguments.

## Return Value

- A Promise that resolves when the sign‑out is successful.

- If sign‑out fails, the Promise rejects with an `Error` containing the Firebase Auth error message.

## Usage

```jsx
import { logout } from "../services/authentication/logout";
import { getCurrentUser } from "../services/authentication/getCurrentUser";

async function handleLogout() {
  try {
    await logout();
    const user = getCurrentUser();
    console.log("User after logout:", user); // null
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
}
```

## Edge Cases

- **No user logged in** → calling `logout()` resolves successfully without throwing an error.

- **Network errors or permission issues** → Promise rejects with Firebase error.

- **Session state** → once logged out, all subsequent calls to `getCurrentUser()` return `null`.

- **Multiple logout calls** → safe to call repeatedly; subsequent calls will simply resolve with no effect.
