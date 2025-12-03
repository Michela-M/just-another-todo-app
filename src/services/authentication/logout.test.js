import { describe, expect, it, vi } from "vitest";
import { getCurrentUser } from "./getCurrentUser";
import { logout } from "./logout";

let mockCurrentUser = { email: "user@example.com", uid: "abc123" };

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({
    currentUser: mockCurrentUser,
  })),
  signOut: vi.fn(() => {
    mockCurrentUser = null;
    return Promise.resolve();
  }),
}));

describe("Auth - Logout", () => {
  it("should clear session and set current user to null (AUTH-UT-007)", async () => {
    // Precondition: user is logged in
    mockCurrentUser = { email: "user@example.com", uid: "abc123" };

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
