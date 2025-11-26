import React from "react";

export default function ChecklistItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}) {
  return (
    <div className="flex items-center space-x-2">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id, !completed)}
        data-testid="checkbox"
      />

      {/* Text */}
      <span className={completed ? "line-through" : ""}>{text}</span>

      {/* Delete icon */}
      <i
        data-testid="delete-icon"
        className="bi bi-trash cursor-pointer text-red-500 ml-auto"
        onClick={() => onDelete(id)}
      ></i>
    </div>
  );
}
