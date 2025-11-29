# `login` Service

## Description

Authenticates an existing user with Firebase Authentication using their email and password.

If the credentials are valid, returns the authenticated user object.

If the credentials are invalid or the user does not exist, throws an authentication error.

## Parameters

- `email` _(string, required)_ – The user’s email address.
- `password` _(string, required)_ – The user’s password.

## Return Value

- A Promise that resolves to an object containing:
  - user (object) — Firebase Auth user object with fields such as:
    - uid (string) — Unique identifier for the user.
    - email (string) — User’s email address.
    - Other Firebase Auth fields depending on configuration.
- If authentication fails, the Promise rejects with an Error containing the Firebase Auth error message.

## Usage

```jsx
import { login } from "../services/authentication/login";

async function handleLogin() {
  try {
    const result = await login("user@example.com", "ValidPass123");
    console.log("Logged in user:", result.user.uid, result.user.email);
  } catch (error) {
    console.error("Login failed:", error.message);
  }
}
```

## Edge Cases

- **Incorrect password** → rejects with an authentication error.
- **Non‑existent user** → rejects with an authentication error.
- **Empty email or password** → Firebase Auth rejects with an error.
- **Network errors or permission issues** → Promise rejects with Firebase error.
- **Multiple login attempts** → Firebase handles session state; repeated calls will reuse the same session if already authenticated.
