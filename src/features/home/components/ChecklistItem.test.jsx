import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ChecklistItem from "./ChecklistItem";

describe("ChecklistItem", () => {
  it("renders unchecked state correctly", () => {
    render(<ChecklistItem id="1" text="Buy milk" completed={false} />);

    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).not.toBeChecked();

    const text = screen.getByText("Buy milk");
    expect(text).not.toHaveClass("line-through");

    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
  });

  it("renders checked state correctly", () => {
    render(<ChecklistItem id="2" text="Buy eggs" completed={true} />);

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
        text="Buy bread"
        completed={false}
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
        text="Buy butter"
        completed={false}
        onDelete={onDelete}
      />,
    );

    await userEvent.click(screen.getByTestId("delete-icon"));
    expect(onDelete).toHaveBeenCalledWith("4");
  });
});
