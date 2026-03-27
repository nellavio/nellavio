import { cn } from "@/utils/classNames";

describe("cn (classNames utility)", () => {
  it("merges multiple Tailwind classes", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
  });

  it("resolves Tailwind conflicts with rightmost precedence", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("handles falsy values (null, undefined, false, empty string)", () => {
    expect(cn("text-red-500", null, undefined, false, "")).toBe("text-red-500");
  });

  it("returns empty string when no arguments provided", () => {
    expect(cn()).toBe("");
  });

  it("handles conditional objects", () => {
    expect(cn({ "text-red-500": true, "bg-blue-500": false })).toBe(
      "text-red-500",
    );
  });

  it("handles arrays of classes", () => {
    expect(cn(["text-red-500", "bg-blue-500"])).toBe(
      "text-red-500 bg-blue-500",
    );
  });

  it("resolves complex Tailwind conflicts", () => {
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
    expect(cn("mx-2", "mx-4")).toBe("mx-4");
  });

  it("combines conditional objects with string classes", () => {
    expect(cn("base-class", { active: true, disabled: false }, "extra")).toBe(
      "base-class active extra",
    );
  });
});
