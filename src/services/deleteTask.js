import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteTask(taskId) {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
}
