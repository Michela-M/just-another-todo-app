import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const saveTask = async (title, onTaskAdded) => {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    throw new Error("Task title is required");
  }

  await addDoc(collection(db, "tasks"), {
    archived: false,
    isCompleted: false,
    createdAt: serverTimestamp(),
    text: trimmedTitle,
    updatedAt: serverTimestamp(),
  });

  if (onTaskAdded) {
    onTaskAdded();
  }
};
