import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

/**
 * Save a new task for a user.
 * @param {string} title - Task description.
 * @param {string} userId - User ID to attach task to.
 * @param {Function} [onTaskAdded] - Optional callback invoked after task is added.
 * @returns {Promise<object>} - The created task reference.
 */
export async function saveTask(title, userId, onTaskAdded) {
  if (!title) {
    throw new Error("Task title is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  const tasksRef = collection(db, "tasks");
  const taskData = {
    description: title,
    userId,
    isArchived: false,
    isCompleted: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(tasksRef, taskData);

  if (onTaskAdded) {
    onTaskAdded(docRef);
  }

  return docRef;
}
