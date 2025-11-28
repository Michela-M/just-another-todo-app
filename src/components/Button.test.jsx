import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { describe, test, expect, vi } from "vitest";

describe("Button component", () => {
  test("renders with given label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button label="Click me" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
