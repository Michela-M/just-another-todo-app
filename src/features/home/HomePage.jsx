import Button from "../../components/Button";
import Input from "../../components/Input";
import { useState, useEffect } from "react";
import { saveTask } from "../../services/saveTask";
import { getTasks } from "../../services/getTasks";
import { toggleTaskCompletion } from "../../services/toggleTaskCompletion";
import { deleteTask } from "../../services/deleteTask";
import TaskSection from "./components/TaskSection";

export default function HomePage() {
  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      await saveTask(taskTitle, () => {
        console.log("Task added!");
      });

      setTaskTitle("");

      fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id, completed) => {
    await toggleTaskCompletion(id, completed);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
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
      <TaskSection
        title="To do"
        tasks={activeTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
      <TaskSection
        title="Completed"
        tasks={completedTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
