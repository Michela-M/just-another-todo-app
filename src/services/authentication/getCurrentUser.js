import { getAuth } from "firebase/auth";

/**
 * Returns the current authenticated user or null if no session is active.
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser || null;
};
