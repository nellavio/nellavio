import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/config/vitest.setup.ts"],
    include: ["src/tests/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next"],
    css: false,
    coverage: {
      provider: "v8",
      include: [
        "src/utils/**",
        "src/store/**",
        "src/hooks/**",
        "src/components/**",
      ],
      exclude: [
        "src/components/common/shadcn/stories/**",
        "src/components/views/charts/stories/**",
        "**/*.stories.{ts,tsx}",
        "**/*.d.ts",
      ],
    },
  },
});
