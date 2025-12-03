import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export const deleteTask = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
};
