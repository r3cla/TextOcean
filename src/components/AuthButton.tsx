import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";

interface AuthButtonProps {
  // Extensible for future props if needed
}

// Maps auth error codes to user-friendly messages
const getAuthErrorMessage = (error: AuthError): string => {
  const errorMessages: Record<string, string> = {
    'auth/invalid-credentials': 'Invalid login credentials',
    'auth/user-not-found': 'User not found',
    'auth/service-unavailable': 'Authentication service is unavailable',
    // Add more error mappings as needed
  };
  
  return errorMessages[error.message] || 'An error occurred during authentication';
};

const AuthButton: React.FC<AuthButtonProps> = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleAuthError = (error: AuthError, action: 'signin' | 'signout') => {
    console.error(`Auth error during ${action}:`, error);
    const errorMessage = getAuthErrorMessage(error);
    toast.error(errorMessage);
  };

  const handleDiscordSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: window.location.origin,
          skipBrowserRedirect: false
        }
      });

      if (error) throw error;
    } catch (error) {
      handleAuthError(error as AuthError, 'signin');
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Signed out successfully');
    } catch (error) {
      handleAuthError(error as AuthError, 'signout');
    }
  };

  const renderAuthenticatedView = () => (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500">
        {session?.user.email}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );

  const renderUnauthenticatedView = () => (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDiscordSignIn}
    >
      <LogIn className="h-4 w-4 mr-2" />
      Sign in with Discord
    </Button>
  );

  return session ? renderAuthenticatedView() : renderUnauthenticatedView();
};

export default AuthButton;