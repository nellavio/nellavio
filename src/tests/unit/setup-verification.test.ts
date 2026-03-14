describe("Vitest setup verification", () => {
  it("should run a basic test", () => {
    expect(1 + 1).toBe(2);
  });

  it("should have access to jsdom environment", () => {
    expect(typeof document).toBe("object");
    expect(typeof window).toBe("object");
  });

  it("should have ResizeObserver mock available", () => {
    expect(ResizeObserver).toBeDefined();
  });

  it("should have matchMedia mock available", () => {
    expect(window.matchMedia).toBeDefined();
  });
});
