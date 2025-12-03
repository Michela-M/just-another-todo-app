import { describe, expect, it, vi } from "vitest";
import { getCurrentUser } from "./getCurrentUser";

let mockCurrentUser = null;

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({
    currentUser: mockCurrentUser,
  })),
}));

describe("getCurrentUser", () => {
  it("should return user object when logged in", () => {
    // Precondition: user is logged in
    mockCurrentUser = { email: "user@example.com", uid: "abc123" };

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
