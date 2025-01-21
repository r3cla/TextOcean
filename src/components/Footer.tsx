import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-2 px-4 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
          asChild
        >
          <a
            href="https://github.com/yourusername/textocean"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <Github className="h-3 w-3" />
            View Source
          </a>
        </Button>
        <span>•</span>
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
          asChild
        >
          <a
            href="https://github.com/yourusername/textocean/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open-Source Under MIT
          </a>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;