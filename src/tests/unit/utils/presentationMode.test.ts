import {
  hasValidAuthUrl,
  hasValidBackendUrl,
  isPresentationMode,
  isPresentationModeClient,
} from "@/utils/presentationMode";

describe("presentationMode utilities", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("hasValidBackendUrl", () => {
    it("returns false when GRAPHQL_URL is undefined", () => {
      vi.stubEnv("GRAPHQL_URL", "");
      expect(hasValidBackendUrl()).toBe(false);
    });

    it("returns false when GRAPHQL_URL is empty string", () => {
      vi.stubEnv("GRAPHQL_URL", "");
      expect(hasValidBackendUrl()).toBe(false);
    });

    it("returns true for http:// URL", () => {
      vi.stubEnv("GRAPHQL_URL", "http://localhost:4000/graphql");
      expect(hasValidBackendUrl()).toBe(true);
    });

    it("returns true for https:// URL", () => {
      vi.stubEnv("GRAPHQL_URL", "https://api.example.com/graphql");
      expect(hasValidBackendUrl()).toBe(true);
    });

    it("returns false for ftp:// URL", () => {
      vi.stubEnv("GRAPHQL_URL", "ftp://files.example.com");
      expect(hasValidBackendUrl()).toBe(false);
    });

    it("returns false for invalid URL", () => {
      vi.stubEnv("GRAPHQL_URL", "invalid");
      expect(hasValidBackendUrl()).toBe(false);
    });
  });

  describe("hasValidAuthUrl", () => {
    it("returns false when NEXT_PUBLIC_AUTH_URL is empty", () => {
      vi.stubEnv("NEXT_PUBLIC_AUTH_URL", "");
      expect(hasValidAuthUrl()).toBe(false);
    });

    it("returns true for valid http URL", () => {
      vi.stubEnv("NEXT_PUBLIC_AUTH_URL", "http://localhost:3000/api/auth");
      expect(hasValidAuthUrl()).toBe(true);
    });
  });

  describe("isPresentationMode", () => {
    it("returns true when no backend URL", () => {
      vi.stubEnv("GRAPHQL_URL", "");
      expect(isPresentationMode()).toBe(true);
    });

    it("returns false when valid backend URL exists", () => {
      vi.stubEnv("GRAPHQL_URL", "http://localhost:4000/graphql");
      expect(isPresentationMode()).toBe(false);
    });
  });

  describe("isPresentationModeClient", () => {
    it("returns true when NEXT_PUBLIC_AUTH_URL is missing", () => {
      vi.stubEnv("NEXT_PUBLIC_AUTH_URL", "");
      expect(isPresentationModeClient()).toBe(true);
    });

    it("returns false when valid NEXT_PUBLIC_AUTH_URL exists", () => {
      vi.stubEnv("NEXT_PUBLIC_AUTH_URL", "http://localhost:3000/api/auth");
      expect(isPresentationModeClient()).toBe(false);
    });
  });
});
