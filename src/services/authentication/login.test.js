import { describe, it, expect, vi } from "vitest";
import { login } from "./login";

vi.mock("firebase/auth", () => {
  return {
    getAuth: vi.fn(() => ({})),
    signInWithEmailAndPassword: vi.fn((auth, email, password) => {
      const users = {
        "user@example.com": "ValidPass123",
      };

      if (!users[email]) {
        return Promise.reject(new Error("User not found"));
      }
      if (users[email] !== password) {
        return Promise.reject(new Error("Wrong password"));
      }
      return Promise.resolve({
        user: { uid: "abc123", email },
      });
    }),
  };
});

describe("Auth - Login", () => {
  it("should succeed with correct credentials", async () => {
    const result = await login("user@example.com", "ValidPass123");
    expect(result.user).toHaveProperty("uid");
    expect(result.user.email).toBe("user@example.com");
  });

  it("should fail with incorrect password", async () => {
    await expect(login("user@example.com", "WrongPass")).rejects.toThrow(
      "Wrong password",
    );
  });

  it("should fail with non-existent user", async () => {
    await expect(login("nouser@example.com", "ValidPass123")).rejects.toThrow(
      "User not found",
    );
  });
});
