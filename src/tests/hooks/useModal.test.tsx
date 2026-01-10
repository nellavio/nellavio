import { render, fireEvent, cleanup } from "@testing-library/react";

import { useModal } from "../../hooks/useModal";

const TestComponent = () => {
  const { isOpen, toggle, close, ref } = useModal();

  return (
    <div>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && (
        <div ref={ref}>
          <div>Modal Content</div>
          <button onClick={close}>Close Modal</button>
        </div>
      )}
    </div>
  );
};

describe("useModal", () => {
  afterEach(cleanup);

  it("should open the modal when toggle is called", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    expect(queryByText("Modal Content")).toBeNull();

    // Click to open the modal
    fireEvent.click(getByText("Toggle Modal"));

    expect(getByText("Modal Content")).toBeInTheDocument();
  });

  it("should close the modal when close is called", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    // Click to open the modal
    fireEvent.click(getByText("Toggle Modal"));
    expect(getByText("Modal Content")).toBeInTheDocument();

    // Click to close the modal
    fireEvent.click(getByText("Close Modal"));
    expect(queryByText("Modal Content")).toBeNull();
  });

  it("should close the modal when clicking outside", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    // Click to open the modal
    fireEvent.click(getByText("Toggle Modal"));
    expect(getByText("Modal Content")).toBeInTheDocument();

    // Simulate a click outside the modal
    fireEvent.mouseDown(document);

    expect(queryByText("Modal Content")).toBeNull();
  });
});
