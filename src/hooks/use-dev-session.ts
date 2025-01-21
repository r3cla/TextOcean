import { useSession } from "@supabase/auth-helpers-react";

// Mock session for development
const DEV_SESSION = {
  user: {
    id: "dev-user-id",
    email: "dev@example.com",
    role: "authenticated",
  },
  access_token: "fake-token",
  refresh_token: "fake-refresh-token",
};

export const useDevSession = () => {
  const session = useSession();
  
  // Only override in development
  if (import.meta.env.DEV && import.meta.env.VITE_USE_DEV_AUTH === "true") {
    return DEV_SESSION;
  }

  return session;
};