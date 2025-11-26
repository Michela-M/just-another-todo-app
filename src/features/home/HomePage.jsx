import Button from "../../components/Button";
import Input from "../../components/Input";
import { useState } from "react";
import { saveTask } from "../../services/saveTask"; // use named import

export default function HomePage() {
  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      await saveTask(taskTitle, () => {
        // optional callback after saving
        console.log("Task added!");
      });

      setTaskTitle(""); // clear input after save
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Today's Tasks</h1>
      <Input
        placeholder="Enter a task"
        value={taskTitle}
        onChange={setTaskTitle}
      />
      <Button
        label={loading ? "Saving..." : "Save Task"}
        onClick={handleSave}
        disabled={loading || !taskTitle.trim()}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
