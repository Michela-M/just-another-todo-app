import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

/**
 * Save a new task for a user.
 * @param {string} title - Task description.
 * @param {string} userId - User ID to attach task to.
 * @param {Function} [onTaskAdded] - Optional callback invoked after task is added.
 * @returns {Promise<object>} - The created task reference.
 */
export const saveTask = async (title, userId, onTaskAdded) => {
  if (!title) {
    throw new Error("Task title is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  const tasksRef = collection(db, "tasks");
  const taskData = {
    createdAt: serverTimestamp(),
    description: title,
    isArchived: false,
    isCompleted: false,
    updatedAt: serverTimestamp(),
    userId,
  };

  const docRef = await addDoc(tasksRef, taskData);

  if (onTaskAdded) {
    onTaskAdded(docRef);
  }

  return docRef;
};
