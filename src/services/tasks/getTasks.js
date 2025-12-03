import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

/**
 * Get tasks for a user, optionally filtered by completion state.
 * @param {string} userId - The user's UID.
 * @param {boolean|null} completedFilter - true = only completed, false = only active, null/undefined = all.
 * @returns {Promise<Array>} - Sorted tasks.
 */
export const getTasks = async (userId, completedFilter = null) => {
  const tasksRef = collection(db, "tasks");
  const snapshot = await getDocs(tasksRef);

  let tasks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  tasks = tasks.filter((task) => task.userId === userId);

  tasks = tasks.filter((task) => task.isArchived === false);

  if (completedFilter === true) {
    tasks = tasks.filter((task) => task.isCompleted === true);
  } else if (completedFilter === false) {
    tasks = tasks.filter((task) => task.isCompleted === false);
  }

  tasks.sort(
    (taskA, taskB) => taskB.updatedAt.seconds - taskA.updatedAt.seconds,
  );

  return tasks;
};
