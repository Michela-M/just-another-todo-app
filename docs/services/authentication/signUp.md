# `signup` Service

##

Registers a new user with Firebase Authentication using an email and password. If the credentials are valid and the email is not already in use, a new user account is created and returned. If the email is already registered or the password does not meet Firebase’s requirements, the function throws an authentication error.

## Parameters

- `email` _(string, required)_ – The new user’s email address.

- `password` _(string, required)_ – The new user’s password. Must meet Firebase’s minimum security requirements.

## Return Value

- A Promise that resolves to an object containing:
  - `user` (object) — Firebase Auth user object with fields such as:
    - `uid` (string) — Unique identifier for the user.
    - `email` (string) — User’s email address.
    - Other Firebase Auth fields depending on configuration.
- If registration fails, the Promise rejects with an `Error` containing the Firebase Auth error message.

## Usage

```jsx
import { signUp } from "../services/authentication/signUp";

async function handleSignUp() {
  try {
    const result = await signUp("newuser@example.com", "StrongPass123");
    console.log("New user created:", result.user.uid, result.user.email);
  } catch (error) {
    console.error("Sign up failed:", error.message);
  }
}
```

## Edge Cases

- **Email already in use** → rejects with an authentication error.

- **Weak or invalid password** → rejects with an authentication error.

- **Empty email or password** → Firebase Auth rejects with an error.

- **Network errors or permission issues** → Promise rejects with Firebase error.

- **Multiple sign‑up attempts** → only the first successful attempt creates the account; subsequent attempts with the same email will fail.
