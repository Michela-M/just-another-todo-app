import React from "react";
import ChecklistItem from "./ChecklistItem";

export default function TaskSection({ title, tasks, onToggle, onDelete }) {
  return (
    <section>
      <h2>{title}</h2>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => (
          <ChecklistItem
            key={task.id}
            id={task.id}
            text={task.text}
            completed={task.completed}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </section>
  );
}
