import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import TaskSection from "./TaskSection";

// Mock ChecklistItem so we can focus on TaskSection behavior
vi.mock("./ChecklistItem", () => ({
  default: ({ id, text, completed, onToggle, onDelete }) => (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id, !completed)}
        data-testid={`checkbox-${id}`}
      />
      <span>{text}</span>
      <button data-testid={`delete-${id}`} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  ),
}));

describe("TaskSection", () => {
  it("renders the title", () => {
    render(
      <TaskSection
        title="Completed Tasks"
        tasks={[]}
        onToggle={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(screen.getByText("Completed Tasks")).toBeInTheDocument();
  });

  it("shows 'No tasks' when list is empty", () => {
    render(
      <TaskSection
        title="To Do"
        tasks={[]}
        onToggle={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(screen.getByText("No tasks")).toBeInTheDocument();
  });

  it("renders a list of tasks", () => {
    const tasks = [
      { id: "1", text: "Buy milk", completed: false },
      { id: "2", text: "Walk dog", completed: true },
    ];
    render(
      <TaskSection
        title="My Tasks"
        tasks={tasks}
        onToggle={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Walk dog")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox clicked", async () => {
    const onToggle = vi.fn();
    const tasks = [{ id: "1", text: "Test task", completed: false }];
    render(
      <TaskSection
        title="My Tasks"
        tasks={tasks}
        onToggle={onToggle}
        onDelete={() => {}}
      />,
    );
    await userEvent.click(screen.getByTestId("checkbox-1"));
    expect(onToggle).toHaveBeenCalledWith("1", true);
  });

  it("calls onDelete when delete clicked", async () => {
    const onDelete = vi.fn();
    const tasks = [{ id: "1", text: "Test task", completed: false }];
    render(
      <TaskSection
        title="My Tasks"
        tasks={tasks}
        onToggle={() => {}}
        onDelete={onDelete}
      />,
    );
    await userEvent.click(screen.getByTestId("delete-1"));
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
