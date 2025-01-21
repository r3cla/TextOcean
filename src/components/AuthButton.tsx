import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AuthButtonProps {
  // Extensible for future props if needed
}

const getAuthErrorMessage = (error: AuthError): string => {
  const errorMessages: Record<string, string> = {
    'invalid_grant': 'Invalid login credentials',
    'user_not_found': 'User not found',
    'service_unavailable': 'Authentication service is unavailable',
    'invalid_request': 'Invalid authentication request',
    'unauthorized': 'Unauthorized access',
    // Add more Supabase-specific error codes as needed
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
          redirectTo: `${window.location.origin}`, // More explicit
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
      <span className="text-sm text-muted-foreground">
        {session?.user.email}
      </span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
          >
            Log Out
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-xs">Sign out of your account</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );

  const renderUnauthenticatedView = () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDiscordSignIn}
        >
          <LogIn className="h-4 w-4 mr-2" />
          Log In with Discord
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span className="text-xs">Sign in with Discord to sync and save your files</span>
      </TooltipContent>
    </Tooltip>
  );

  return session ? renderAuthenticatedView() : renderUnauthenticatedView();
};

export default AuthButton;