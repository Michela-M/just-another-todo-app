import { getAuth, signOut } from "firebase/auth";

/**
 * Logs out the current user.
 * @returns {Promise<void>}
 */
export async function logout() {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
}
