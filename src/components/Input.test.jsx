import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "./Input";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("Input component", () => {
  const noopChange = vi.fn();

  it("renders with a placeholder", () => {
    render(
      <Input placeholder="Enter your name" value="" onChange={noopChange} />,
    );
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("renders with an optional label", () => {
    render(
      <Input
        placeholder="Email"
        label="Email Address"
        value=""
        onChange={noopChange}
      />,
    );
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
  });

  it("renders with optional helper text", () => {
    render(
      <Input
        placeholder="Password"
        helperText="Must be at least 8 characters"
        value=""
        onChange={noopChange}
      />,
    );
    expect(
      screen.getByText("Must be at least 8 characters"),
    ).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Type here" value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Type here");

    await userEvent.type(input, "Hello");

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith("H");
  });
});
