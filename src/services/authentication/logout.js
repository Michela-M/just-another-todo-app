import { getAuth, signOut } from "firebase/auth";

/**
 * Logs out the current user.
 * @returns {Promise<void>}
 */
export const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message, { cause: error });
  }
};
