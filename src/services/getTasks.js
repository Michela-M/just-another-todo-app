import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function getTasks(completed = null) {
  const q = query(collection(db, "tasks"), where("archived", "==", false));
  const querySnapshot = await getDocs(q);
  let tasks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (completed !== null) {
    tasks = tasks.filter((task) => task.completed === completed);
  }

  return tasks.sort((a, b) => {
    const aTime = a.updatedAt?.seconds ?? 0;
    const bTime = b.updatedAt?.seconds ?? 0;
    return bTime - aTime;
  });
}
