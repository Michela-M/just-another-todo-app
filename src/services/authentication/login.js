import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

/**
 * Log in an existing user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: {uid: string, email: string}}>}
 */
export async function login(email, password) {
  const auth = getAuth();

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}
