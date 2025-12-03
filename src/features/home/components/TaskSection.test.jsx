import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import TaskSection from "./TaskSection";
import userEvent from "@testing-library/user-event";

// Mock ChecklistItem so we can focus on TaskSection behavior
vi.mock("./ChecklistItem", () => ({
  default: ({ id, description, isCompleted, onToggle, onDelete }) => (
    <div>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onToggle(id, !isCompleted)}
        data-testid={`checkbox-${id}`}
      />
      <span>{description}</span>
      <button data-testid={`delete-${id}`} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  ),
}));

describe("TaskSection", () => {
  const noopToggle = vi.fn();
  const noopDelete = vi.fn();

  it("renders the title", () => {
    render(
      <TaskSection
        title="Completed Tasks"
        tasks={[]}
        onToggle={noopToggle}
        onDelete={noopDelete}
      />,
    );
    expect(screen.getByText("Completed Tasks")).toBeInTheDocument();
  });

  it("shows 'No tasks' when list is empty", () => {
    render(
      <TaskSection
        title="To Do"
        tasks={[]}
        onToggle={noopToggle}
        onDelete={noopDelete}
      />,
    );
    expect(screen.getByText("No tasks")).toBeInTheDocument();
  });

  it("renders a list of tasks", () => {
    const tasks = [
      { description: "Buy milk", id: "1", isCompleted: false },
      { description: "Walk dog", id: "2", isCompleted: true },
    ];
    render(
      <TaskSection
        title="My Tasks"
        tasks={tasks}
        onToggle={noopToggle}
        onDelete={noopDelete}
      />,
    );
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Walk dog")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox clicked", async () => {
    const tasks = [{ description: "Test task", id: "1", isCompleted: false }];
    render(
      <TaskSection
        title="My Tasks"
        tasks={tasks}
        onToggle={noopToggle}
        onDelete={noopDelete}
      />,
    );
    await userEvent.click(screen.getByTestId("checkbox-1"));
    expect(noopToggle).toHaveBeenCalledWith("1", true);
  });

  it("calls onDelete when delete clicked", async () => {
    const tasks = [{ description: "Test task", id: "1", isCompleted: false }];
    render(
      <TaskSection
        title="My Tasks"
        tasks={tasks}
        onToggle={noopToggle}
        onDelete={noopDelete}
      />,
    );
    await userEvent.click(screen.getByTestId("delete-1"));
    expect(noopDelete).toHaveBeenCalledWith("1");
  });
});
