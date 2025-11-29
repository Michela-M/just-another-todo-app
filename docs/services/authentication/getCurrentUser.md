# `getCurrentUser`Service

## Description

Retrieves the currently authenticated user from Firebase Authentication. If no user session is active, the function returns `null`.

## Parameters

- _(none)_ — This function does not take any arguments.

## Return Value

- A user object if a session is active, with at least:
  - `uid` (string) — Unique identifier for the user.
  - `email` (string) — User’s email address.
  - Other fields may be present depending on Firebase Auth configuration.
- `null` if no user is logged in.

## Usage

```jsx
import { getCurrentUser } from "../services/authentication/getCurrentUser";

function checkSession() {
  const user = getCurrentUser();

  if (user) {
    console.log(`Logged in as ${user.email} (uid: ${user.uid})`);
  } else {
    console.log("No user session active");
  }
}
```

## Edge Cases

- **No active session** → returns `null`.
- **Session expired or revoked** → returns `null`.
- **User object shape** → may include additional Firebase Auth fields (e.g., `displayName`, `photoURL`) depending on provider.
- **Testing/mocking** → when mocked, ensure `getAuth().currentUser` is set appropriately to simulate logged‑in or logged‑out states.
