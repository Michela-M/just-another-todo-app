import React from "react";
import ChecklistItem from "./ChecklistItem";

export default function TaskSection({ title, tasks, onToggle, onDelete }) {
  return (
    <section className="flex flex-col gap-2 w-full">
      <h2 className="text-3xl text-primary">{title}</h2>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => (
          <ChecklistItem
            key={task.id}
            id={task.id}
            text={task.text}
            isCompleted={task.isCompleted}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </section>
  );
}
