import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useState, useEffect } from "react";
import { saveTask } from "../../services/tasks/saveTask";
import { getTasks } from "../../services/tasks/getTasks";
import { toggleTaskCompletion } from "../../services/tasks/toggleTaskCompletion";
import { deleteTask } from "../../services/tasks/deleteTask";
import TaskSection from "./components/TaskSection";

export default function HomePage() {
  const [taskTitle, setTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const activeTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await saveTask(taskTitle, () => {
        console.log("Task added!");
      });

      setTaskTitle("");

      fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (id, isCompleted) => {
    await toggleTaskCompletion(id, isCompleted);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="bg-amber-50">
      <div className="max-w-[40%] mx-auto flex flex-col items-center gap-6 min-h-screen justify-center">
        <h1 className="text-4xl text-primary">Today&apos;s Tasks</h1>
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Enter a task"
            value={taskTitle}
            onChange={setTaskTitle}
          />
          <Button
            label={isLoading ? "Saving..." : "Save Task"}
            onClick={handleSave}
            disabled={isLoading || !taskTitle.trim()}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>

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
    </div>
  );
}
