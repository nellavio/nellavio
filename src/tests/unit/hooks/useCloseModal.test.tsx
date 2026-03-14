import { render } from "@testing-library/react";
import { useRef } from "react";

import { useCloseModal } from "../../../hooks/useCloseModal";

const TestComponent = ({ onClose }: { onClose: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useCloseModal(ref, onClose);
  return (
    <div>
      <div ref={ref} data-testid="modal">
        Modal
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
};

describe("useCloseModal", () => {
  it("does not call onClose on click inside ref", () => {
    const onClose = vi.fn();
    const { getByTestId } = render(<TestComponent onClose={onClose} />);
    getByTestId("modal").dispatchEvent(
      new MouseEvent("mousedown", { bubbles: true }),
    );
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose on click outside ref", () => {
    const onClose = vi.fn();
    const { getByTestId } = render(<TestComponent onClose={onClose} />);
    getByTestId("outside").dispatchEvent(
      new MouseEvent("mousedown", { bubbles: true }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when event target is not a Node", () => {
    const onClose = vi.fn();
    render(<TestComponent onClose={onClose} />);
    const event = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event, "target", { value: null });
    window.dispatchEvent(event);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose on mousedown on document body", () => {
    const onClose = vi.fn();
    render(<TestComponent onClose={onClose} />);
    document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(onClose).toHaveBeenCalled();
  });
});
