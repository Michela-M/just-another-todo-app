import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";
import React from "react";

describe("Button component", () => {
  test("renders with given label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText(/click me/iu)).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText(/click me/iu));
    // eslint-disable-next-line no-magic-numbers
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button label="Click me" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
