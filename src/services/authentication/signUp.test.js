import { describe, expect, it, vi } from "vitest";
import { signUp } from "./signUp";

const MIN_PASSWORD_LENGTH = 6;

vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn((auth, email, password) => {
    if (!email.includes("@")) {
      return Promise.reject(new Error("Invalid email"));
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return Promise.reject(new Error("Weak password"));
    }
    return Promise.resolve({
      user: { email, uid: "12345" },
    });
  }),
  getAuth: vi.fn(() => ({})),
}));

describe("signUp", () => {
  it("should register a new user with valid credentials", async () => {
    const result = await signUp("user@example.com", "ValidPass123");
    expect(result.user).toHaveProperty("uid");
    expect(result.user.email).toBe("user@example.com");
  });

  it("should fail when email format is invalid", async () => {
    await expect(signUp("invalid-email", "ValidPass123")).rejects.toThrow(
      "Invalid email",
    );
  });

  it("should fail when password is too weak", async () => {
    await expect(signUp("user@example.com", "123")).rejects.toThrow(
      "Weak password",
    );
  });
});
