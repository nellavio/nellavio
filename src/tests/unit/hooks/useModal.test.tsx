import { act, render, renderHook, screen } from "@testing-library/react";

import { useModal } from "../../../hooks/useModal";

const ModalTestComponent = () => {
  const { isOpen, toggle, close, ref } = useModal();
  return (
    <div>
      <div ref={ref} data-testid="modal">
        Modal
        <button data-testid="toggle" onClick={toggle}>
          Toggle
        </button>
      </div>
      <button data-testid="close" onClick={close}>
        Close
      </button>
      <div data-testid="outside">Outside</div>
      {isOpen && <div data-testid="open-indicator">Open</div>}
    </div>
  );
};

describe("useModal", () => {
  it("defaults to closed", () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);
  });

  it("toggle opens and closes", () => {
    const { result } = renderHook(() => useModal());
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it("close sets isOpen to false", () => {
    const { result } = renderHook(() => useModal());
    act(() => result.current.toggle());
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it("closes on click outside (mousedown on document)", () => {
    render(<ModalTestComponent />);
    act(() => {
      screen.getByTestId("toggle").click();
    });
    expect(screen.getByTestId("open-indicator")).toBeInTheDocument();
    act(() => {
      screen
        .getByTestId("outside")
        .dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(screen.queryByTestId("open-indicator")).not.toBeInTheDocument();
  });

  it("ref is defined", () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.ref).toBeDefined();
  });
});
