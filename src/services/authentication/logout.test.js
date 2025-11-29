import { describe, it, expect, vi } from "vitest";
import { logout } from "./logout";
import { getCurrentUser } from "./getCurrentUser";

let mockCurrentUser = { uid: "abc123", email: "user@example.com" };

vi.mock("firebase/auth", () => {
  return {
    getAuth: vi.fn(() => ({
      currentUser: mockCurrentUser,
    })),
    signOut: vi.fn(() => {
      mockCurrentUser = null;
      return Promise.resolve();
    }),
  };
});

describe("Auth - Logout", () => {
  it("should clear session and set current user to null (AUTH-UT-007)", async () => {
    // Precondition: user is logged in
    mockCurrentUser = { uid: "abc123", email: "user@example.com" };

    await logout();
    const user = getCurrentUser();

    expect(user).toBeNull();
  });

  it("should not throw error when no user is logged in (AUTH-UT-008)", async () => {
    // Precondition: no user logged in
    mockCurrentUser = null;

    await expect(logout()).resolves.not.toThrow();
    const user = getCurrentUser();

    expect(user).toBeNull();
  });
});
