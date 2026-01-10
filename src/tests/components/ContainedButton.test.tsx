import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ContainedButton } from "../../components/common/ContainedButton";
import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";

jest.mock("../../assets/icons/SpinnerIcon");

describe("ContainedButton Component", () => {
  const mockHandleClick = jest.fn();

  beforeEach(() => {
    mockHandleClick.mockClear();
    // Provide the mock implementation for SpinnerIcon before each test
    (SpinnerIcon as jest.Mock).mockImplementation(() => (
      <svg data-testid="spinner-icon" />
    ));
  });

  // Test 1: Basic rendering with text
  it("should render with text and default props", () => {
    const buttonText = "Click Me";
    render(<ContainedButton text={buttonText} />);
    const button = screen.getByRole("button", { name: buttonText });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(buttonText);
    expect(button).toHaveAttribute("type", "button");
    expect(button).toBeEnabled();
  });

  // Test 2: Rendering with children (should override text)
  it("should render children when provided", () => {
    const buttonText = "Should Not Show";
    const childContent = "Child Content";
    render(
      <ContainedButton text={buttonText}>
        <span>{childContent}</span>
      </ContainedButton>
    );
    const button = screen.getByText(childContent).closest("button");
    expect(button).toBeInTheDocument();
    expect(screen.getByText(childContent)).toBeInTheDocument();
    expect(screen.queryByText(buttonText)).not.toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  // Test 3: Rendering with an icon
  it("should render an icon when provided", () => {
    const buttonText = "Button With Icon";
    // Use a simple SVG for the test icon prop
    const icon = <svg data-testid="test-icon" />;
    render(<ContainedButton text={buttonText} icon={icon} />);
    const button = screen.getByRole("button", { name: buttonText });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(button).toContainElement(screen.getByTestId("test-icon"));
  });

  // Test 4: Click handler invocation
  it("should call handleClick when clicked and not disabled/loading", () => {
    const buttonText = "Clickable";
    render(<ContainedButton text={buttonText} handleClick={mockHandleClick} />);
    fireEvent.click(screen.getByRole("button", { name: buttonText }));
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  // Test 5: Disabled state via 'disabled' prop
  it("should be disabled when disabled prop is true", () => {
    const buttonText = "Disabled Button";
    render(
      <ContainedButton
        text={buttonText}
        handleClick={mockHandleClick}
        disabled={true}
      />
    );
    const button = screen.getByRole("button", { name: buttonText });
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(mockHandleClick).not.toHaveBeenCalled();
  });

  // Test 6: Disabled state via 'loading' prop
  it("should be disabled and show spinner when loading prop is true", () => {
    const buttonText = "Loading Button";
    render(
      <ContainedButton
        text={buttonText}
        handleClick={mockHandleClick}
        loading={true}
      />
    );
    const button = screen.getByRole("button", { name: buttonText });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByTestId("spinner-icon")).toBeInTheDocument(); // Check mocked spinner
    expect(screen.queryByText(buttonText)).not.toBeInTheDocument();
    expect(mockHandleClick).not.toHaveBeenCalled();
  });

  // Test 7: Setting button type attribute
  it("should have the specified type attribute", () => {
    const buttonText = "Submit Button";
    render(<ContainedButton text={buttonText} type="submit" />);
    const button = screen.getByRole("button", { name: buttonText });
    expect(button).toHaveAttribute("type", "submit");
  });

  // Test 8: ARIA attributes application
  it("should apply custom aria-label and aria-pressed attributes", () => {
    const customLabel = "Perform Action";
    render(
      <ContainedButton
        text="Irrelevant Text"
        ariaLabel={customLabel}
        ariaPressed={true}
      />
    );
    const button = screen.getByRole("button", { name: customLabel });
    expect(button).toHaveAttribute("aria-label", customLabel);
    expect(button).toHaveAttribute("aria-pressed", "true");
  });
});
