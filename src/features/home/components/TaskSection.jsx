import ChecklistItem from "./ChecklistItem";
import PropTypes from "prop-types";
import React from "react";

const EMPTY_TASKS_LENGTH = 0;

export default function TaskSection({ title, tasks, onToggle, onDelete }) {
  return (
    <section className="flex flex-col gap-2 w-full">
      <h2 className="text-3xl text-primary">{title}</h2>
      {tasks.length === EMPTY_TASKS_LENGTH ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => (
          <ChecklistItem
            key={task.id}
            id={task.id}
            description={task.description}
            isCompleted={task.isCompleted}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </section>
  );
}

TaskSection.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};
