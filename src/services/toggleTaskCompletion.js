import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function toggleTaskCompletion(taskId, isCompleted) {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, { isCompleted });
}
