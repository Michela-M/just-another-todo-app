import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ChecklistItem from "./ChecklistItem";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("ChecklistItem", () => {
  it("renders unchecked state correctly", () => {
    render(<ChecklistItem id="1" description="Buy milk" isCompleted={false} />);

    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).not.toBeChecked();

    const text = screen.getByText("Buy milk");
    expect(text).not.toHaveClass("line-through");

    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
  });

  it("renders checked state correctly", () => {
    render(<ChecklistItem id="2" description="Buy eggs" isCompleted={true} />);

    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).toBeChecked();

    const text = screen.getByText("Buy eggs");
    expect(text).toHaveClass("line-through");

    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
  });

  it("calls toggle handler when checkbox clicked", async () => {
    const onToggle = vi.fn();
    render(
      <ChecklistItem
        id="3"
        description="Buy bread"
        isCompleted={false}
        onToggle={onToggle}
      />,
    );

    await userEvent.click(screen.getByTestId("checkbox"));
    expect(onToggle).toHaveBeenCalledWith("3", true);
  });

  it("calls delete handler when delete icon clicked", async () => {
    const onDelete = vi.fn();
    render(
      <ChecklistItem
        id="4"
        description="Buy butter"
        isCompleted={false}
        onDelete={onDelete}
      />,
    );

    await userEvent.click(screen.getByTestId("delete-icon"));
    expect(onDelete).toHaveBeenCalledWith("4");
  });
});
