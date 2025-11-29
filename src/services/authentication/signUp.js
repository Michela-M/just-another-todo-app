import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

/**
 * Sign up a new user with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<{user: {uid: string, email: string}}>} - The created user object.
 * @throws {Error} - Throws if email is invalid or password is too weak.
 */
export async function signUp(email, password) {
  const auth = getAuth();

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}
