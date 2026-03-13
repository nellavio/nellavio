import { headers } from "next/headers";

/**
 * Server-side session retrieval via Better Auth.
 * Forwards request cookies and returns { user, session } or null.
 */
export const getSession = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_AUTH_URL) {
      return null;
    }

    const headersList = await headers();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/get-session`,
      {
        headers: {
          cookie: headersList.get("cookie") || "",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data?.user ? data : null;
  } catch (error: unknown) {
    // Re-throw Next.js internal errors (e.g. DYNAMIC_SERVER_USAGE from
    // calling headers() at build time) so the framework can handle them
    // silently instead of flooding the build output with false errors.
    if (error instanceof Error && "digest" in error) {
      throw error;
    }

    console.error("Failed to get session:", error);
    return null;
  }
};
