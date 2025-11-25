import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function toggleTaskCompletion(taskId, completed) {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, { completed });
}
