import { render } from "@testing-library/react";
import { useRef } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";

const TestComponent = ({ onClickOutside }: { onClickOutside: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);
  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
};

describe("useClickOutside", () => {
  it("does not call callback on click inside ref", () => {
    const callback = vi.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={callback} />);
    getByTestId("inside").dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true }),
    );
    expect(callback).not.toHaveBeenCalled();
  });

  it("calls callback on click outside ref", () => {
    const callback = vi.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={callback} />);
    getByTestId("outside").dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true }),
    );
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call callback when clicking element with role=dialog", () => {
    const callback = vi.fn();
    render(<TestComponent onClickOutside={callback} />);
    const dialog = document.createElement("div");
    dialog.setAttribute("role", "dialog");
    document.body.appendChild(dialog);
    dialog.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    expect(callback).not.toHaveBeenCalled();
    document.body.removeChild(dialog);
  });

  it("does not call callback when clicking element with data-slot=drawer-overlay", () => {
    const callback = vi.fn();
    render(<TestComponent onClickOutside={callback} />);
    const overlay = document.createElement("div");
    overlay.setAttribute("data-slot", "drawer-overlay");
    document.body.appendChild(overlay);
    overlay.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    expect(callback).not.toHaveBeenCalled();
    document.body.removeChild(overlay);
  });

  it("does not call callback when clicking child of dialog", () => {
    const callback = vi.fn();
    render(<TestComponent onClickOutside={callback} />);
    const dialog = document.createElement("div");
    dialog.setAttribute("role", "dialog");
    const child = document.createElement("button");
    dialog.appendChild(child);
    document.body.appendChild(dialog);
    child.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    expect(callback).not.toHaveBeenCalled();
    document.body.removeChild(dialog);
  });
});
