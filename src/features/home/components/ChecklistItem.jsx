import React from "react";

export default function ChecklistItem({
  id,
  text,
  isCompleted,
  onToggle,
  onDelete,
}) {
  return (
    <div className="card px-2 py-2 flex items-center gap-2">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onToggle(id, !isCompleted)}
        data-testid="checkbox"
        className="accent-primary w-4 h-4"
      />

      <span
        className={`flex-1 text-primary ${isCompleted ? "line-through" : ""}`}
      >
        {text}
      </span>

      <i
        data-testid="delete-icon"
        className="bi bi-trash cursor-pointer w-4 h-6 flex items-center justify-center leading-none text-primary"
        onClick={() => onDelete(id)}
      ></i>
    </div>
  );
}
