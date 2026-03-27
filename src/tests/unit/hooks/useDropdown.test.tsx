import { act, render, renderHook, screen } from "@testing-library/react";

import { useDropdown } from "@/hooks/useDropdown";

const DropdownTestComponent = () => {
  const { isOpen, toggle, close, open, ref } = useDropdown();
  return (
    <div>
      <div ref={ref} data-testid="dropdown">
        Dropdown
        <button data-testid="toggle" onClick={toggle}>
          Toggle
        </button>
        <button data-testid="open" onClick={open}>
          Open
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

describe("useDropdown", () => {
  it("defaults to closed", () => {
    const { result } = renderHook(() => useDropdown());
    expect(result.current.isOpen).toBe(false);
  });

  it("toggle opens and closes", () => {
    const { result } = renderHook(() => useDropdown());
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it("open sets isOpen to true", () => {
    const { result } = renderHook(() => useDropdown());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it("close sets isOpen to false", () => {
    const { result } = renderHook(() => useDropdown());
    act(() => result.current.open());
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it("ref is defined", () => {
    const { result } = renderHook(() => useDropdown());
    expect(result.current.ref).toBeDefined();
  });

  it("closes on click outside (pointerdown on document)", async () => {
    render(<DropdownTestComponent />);
    act(() => {
      screen.getByTestId("open").click();
    });
    expect(screen.getByTestId("open-indicator")).toBeInTheDocument();
    act(() => {
      screen
        .getByTestId("outside")
        .dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    });
    expect(screen.queryByTestId("open-indicator")).not.toBeInTheDocument();
  });
});
