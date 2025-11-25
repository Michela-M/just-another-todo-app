import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input"; // your component

describe("Input component", () => {
  it("renders with a placeholder", () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("renders with an optional label", () => {
    render(<Input placeholder="Email" label="Email Address" />);
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
  });

  it("renders with optional helper text", () => {
    render(
      <Input
        placeholder="Password"
        helperText="Must be at least 8 characters"
      />,
    );
    expect(
      screen.getByText("Must be at least 8 characters"),
    ).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    await userEvent.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });
});
