import { describe, it, expect, vi } from "vitest";
import { getCurrentUser } from "./getCurrentUser";

let mockCurrentUser = null;

vi.mock("firebase/auth", () => {
  return {
    getAuth: vi.fn(() => ({
      currentUser: mockCurrentUser,
    })),
  };
});

describe("getCurrentUser", () => {
  it("should return user object when logged in", () => {
    // Precondition: user is logged in
    mockCurrentUser = { uid: "abc123", email: "user@example.com" };

    const user = getCurrentUser();
    expect(user).toHaveProperty("uid", "abc123");
    expect(user).toHaveProperty("email", "user@example.com");
  });

  it("should return null when logged out", () => {
    // Precondition: no user session active
    mockCurrentUser = null;

    const user = getCurrentUser();
    expect(user).toBeNull();
  });
});
