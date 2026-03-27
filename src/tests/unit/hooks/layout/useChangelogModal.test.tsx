import { renderHook, waitFor } from "@testing-library/react";

import { useChangelogModal } from "@/components/layout/navbar/hooks/useChangelogModal";

describe("useChangelogModal", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("formatMarkdown", () => {
    it("converts h1 headings", () => {
      const { result } = renderHook(() => useChangelogModal());
      const html = result.current.formatMarkdown("# Changelog");
      expect(html).toContain("<h2");
      expect(html).toContain("Changelog");
    });

    it("converts h2 headings", () => {
      const { result } = renderHook(() => useChangelogModal());
      const html = result.current.formatMarkdown("## v2.0.0");
      expect(html).toContain("v2.0.0");
      expect(html).toContain("<p");
    });

    it("converts h3 headings", () => {
      const { result } = renderHook(() => useChangelogModal());
      const html = result.current.formatMarkdown("### Added");
      expect(html).toContain("Added");
    });

    it("converts list items", () => {
      const { result } = renderHook(() => useChangelogModal());
      const html = result.current.formatMarkdown("- New feature");
      expect(html).toContain("<li");
      expect(html).toContain("New feature");
    });

    it("converts fenced code blocks", () => {
      const { result } = renderHook(() => useChangelogModal());
      const input = "```\nnpm install\nnpm run dev\n```";
      const html = result.current.formatMarkdown(input);
      expect(html).toContain("npm install");
      expect(html).toContain("npm run dev");
      expect(html).toContain("font-mono");
    });

    it("escapes HTML to prevent XSS", () => {
      const { result } = renderHook(() => useChangelogModal());
      const html = result.current.formatMarkdown(
        "- <script>alert('xss')</script>",
      );
      expect(html).not.toContain("<script>");
      expect(html).toContain("&lt;script&gt;");
    });

    it("handles empty lines as spacers", () => {
      const { result } = renderHook(() => useChangelogModal());
      const html = result.current.formatMarkdown("");
      expect(html).toContain("my-2");
    });

    it("converts plain text to paragraphs", () => {
      const { result } = renderHook(() => useChangelogModal());
      const html = result.current.formatMarkdown("Just some text.");
      expect(html).toContain("<p");
      expect(html).toContain("Just some text.");
    });

    it("handles multi-line markdown document", () => {
      const { result } = renderHook(() => useChangelogModal());
      const input = [
        "# Changelog",
        "",
        "## v2.0.0",
        "### Added",
        "- Feature A",
        "- Feature B",
        "",
        "### Fixed",
        "- Bug fix",
      ].join("\n");

      const html = result.current.formatMarkdown(input);
      expect(html).toContain("Changelog");
      expect(html).toContain("v2.0.0");
      expect(html).toContain("Feature A");
      expect(html).toContain("Feature B");
      expect(html).toContain("Bug fix");
    });
  });

  describe("fetch behavior", () => {
    it("starts in loading state", () => {
      vi.stubGlobal(
        "fetch",
        vi.fn(() => new Promise(() => {})),
      );
      const { result } = renderHook(() => useChangelogModal());
      expect(result.current.isLoading).toBe(true);
      expect(result.current.changelogContent).toBe("");
    });

    it("sets content after successful fetch", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            text: () => Promise.resolve("# Test Changelog"),
          }),
        ),
      );

      const { result } = renderHook(() => useChangelogModal());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.changelogContent).toBe("# Test Changelog");
      expect(result.current.error).toBeNull();
    });

    it("sets error on fetch failure", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn(() =>
          Promise.resolve({
            ok: false,
            status: 404,
          }),
        ),
      );

      const { result } = renderHook(() => useChangelogModal());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeTruthy();
    });
  });
});
