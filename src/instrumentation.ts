import packageJson from "../package.json";

const checkBackendHealth = async (): Promise<{
  isOnline: boolean;
  graphqlUrl: string | null;
  authUrl: string | null;
  hasAuth: boolean;
}> => {
  const graphqlUrl = process.env.GRAPHQL_URL;
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

  if (!graphqlUrl) {
    return {
      isOnline: false,
      graphqlUrl: null,
      authUrl: authUrl || null,
      hasAuth: Boolean(authUrl),
    };
  }

  const healthUrl = graphqlUrl.replace("/graphql", "/health");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(healthUrl, { signal: controller.signal });
    clearTimeout(timeout);

    return {
      isOnline: response.ok,
      graphqlUrl,
      authUrl: authUrl || null,
      hasAuth: Boolean(authUrl),
    };
  } catch {
    return {
      isOnline: false,
      graphqlUrl,
      authUrl: authUrl || null,
      hasAuth: Boolean(authUrl),
    };
  }
};

const getNodeVersion = () => {
  const g = globalThis as unknown as Record<string, Record<string, string>>;
  return g.process?.version ?? "unknown";
};

const printStartupBanner = async () => {
  const status = await checkBackendHealth();
  const port = process.env.PORT || 3000;
  const nodeEnv = process.env.NODE_ENV || "development";

  const separator = "-----";

  console.log("");
  console.log(separator);
  console.log("");
  console.log(`SPIREFLOW v${packageJson.version}`);
  console.log("");
  console.log(`📊 Environment: ${nodeEnv}`);
  console.log(`📦 Node: ${getNodeVersion()}`);
  console.log("");

  const authConfigured = status.graphqlUrl && status.hasAuth;

  if (status.isOnline && authConfigured) {
    console.log("🔌 Mode: Connected to backend");
    console.log("   ├─ Backend: online");
    console.log("   └─ Route protection: enabled");
  } else if (authConfigured) {
    console.log("🔌 Mode: Backend offline");
    console.log("   ├─ Using mock data");
    console.log("   └─ Route protection: enabled");
  } else {
    console.log("🔌 Mode: Standalone");
    console.log("   ├─ Using mock data");
    console.log("   └─ Route protection: disabled");
  }

  console.log("");
  console.log(`🌐 Dashboard: http://localhost:${port}`);
  console.log("");
  console.log(separator);
  console.log("");
};

export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await printStartupBanner();
  }
};
