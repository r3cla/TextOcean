// src/pages/Index.tsx
import { useState, useEffect, useRef } from "react";
import Editor from "@/components/Editor";
import { toast } from "sonner";
import { SupportedLanguage } from "@/types/editor";
import { useDevSession } from "@/hooks/use-dev-session";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import AuthButton from "@/components/AuthButton";
import SavedPastesList from "@/components/SavedPastesList";
import PasteActions from "@/components/PasteActions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SUPPORTED_LANGUAGES } from "@/constants/languages";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [content, setContent] = useState<string>("");
  const [language, setLanguage] = useState<SupportedLanguage>("markdown");
  const [isRawView, setIsRawView] = useState<boolean>(false);
  const [isSyntaxHighlighting, setIsSyntaxHighlighting] = useState<boolean>(true);
  const [savedPastes, setSavedPastes] = useState<any[]>([]);
  const [currentPasteId, setCurrentPasteId] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const session = useDevSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (session?.user) {
      fetchSavedPastes();
    }
  }, [session?.user]);

  useEffect(() => {
    if (isExpanded && editorContainerRef.current) {
      const rect = editorContainerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const newHeight = viewportHeight - rect.top - 40;
      editorContainerRef.current.style.height = `${newHeight}px`;
    } else if (editorContainerRef.current) {
      editorContainerRef.current.style.height = '';
    }
  }, [isExpanded]);

  const fetchSavedPastes = async () => {
    try {
      const { data, error } = await supabase
        .from('pastes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedPastes(data || []);
    } catch (error) {
      console.error('Error fetching pastes:', error);
      toast.error('Failed to fetch saved pastes');
    }
  };

  const handleSave = async () => {
    if (!session) {
      toast.error('Please sign in to save pastes');
      return;
    }

    try {
      const pasteData = {
        content,
        language,
        title: content.slice(0, 15),
        user_id: session.user.id,
      };

      if (currentPasteId) {
        const { error } = await supabase
          .from('pastes')
          .update({ content, language, title: content.slice(0, 15) })
          .eq('id', currentPasteId);

        if (error) throw error;
        toast.success('Paste updated successfully');
      } else {
        const { error } = await supabase
          .from('pastes')
          .insert([pasteData]);

        if (error) throw error;
        toast.success('Paste saved successfully');
      }

      fetchSavedPastes();
    } catch (error) {
      console.error('Error saving paste:', error);
      toast.error('Failed to save paste');
    }
  };

  const handleDeletePaste = async (pasteId: string) => {
    try {
      const { error } = await supabase
        .from('pastes')
        .delete()
        .eq('id', pasteId);

      if (error) throw error;

      if (pasteId === currentPasteId) {
        handleNewPaste();
      }

      toast.success('Paste deleted successfully');
      fetchSavedPastes();
    } catch (error) {
      console.error('Error deleting paste:', error);
      toast.error('Failed to delete paste');
    }
  };

  const handleUpdateTitle = async (pasteId: string, newTitle: string) => {
    try {
      const { error } = await supabase
        .from('pastes')
        .update({ title: newTitle })
        .eq('id', pasteId);

      if (error) throw error;
      toast.success('Title updated successfully');
      fetchSavedPastes();
    } catch (error) {
      console.error('Error updating paste title:', error);
      toast.error('Failed to update title');
    }
  };

  const handleNewPaste = () => {
    setContent("");
    setLanguage("markdown");
    setCurrentPasteId(null);
  };

  const handleLoadPaste = async (paste: any) => {
    setContent(paste.content);
    setLanguage(paste.language);
    setCurrentPasteId(paste.id);
    setIsSyntaxHighlighting(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy text:", error);
      toast.error("Failed to copy text to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 space-y-4">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-4 rounded-lg shadow-xl border border-border">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <img src="./logo.webp" alt="TextOcean Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <h1 className="text-2xl font-bold text-foreground">TextOcean</h1>
            </div>
            <AuthButton />
          </div>
          <PasteActions
            isAuthenticated={!!session}
            language={language}
            setLanguage={setLanguage}
            isRawView={isRawView}
            onToggleView={() => setIsRawView(!isRawView)}
            onCopy={handleCopy}
            onSave={handleSave}
            onNew={handleNewPaste}
            currentPasteId={currentPasteId}
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {session && isSidebarVisible && (
            <div className="relative bg-card rounded-lg shadow-lg border border-border p-4 md:col-span-1 overflow-hidden max-h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">Saved Pastes</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarVisible(false)}
                  className="absolute -right-3 top-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <SavedPastesList
                pastes={savedPastes}
                onLoadPaste={handleLoadPaste}
                onDeletePaste={handleDeletePaste}
                onUpdateTitle={handleUpdateTitle}
              />
            </div>
          )}

          {session && !isSidebarVisible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarVisible(true)}
              className="absolute left-4 top-36 z-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          <div
            ref={editorContainerRef}
            className={`flex flex-col bg-card rounded-lg shadow-lg border border-border relative transition-all duration-200 ${session ? (isSidebarVisible ? 'md:col-span-5' : 'md:col-span-6') : 'md:col-span-6'
              }`}
          >
            <div className="flex-grow">
              <Editor
                content={content}
                onChange={setContent}
                language={isSyntaxHighlighting ? language : "plaintext"}
                isRawView={isRawView}
                height={isExpanded ? "calc(100vh - 180px)" : "460px"}
              />
            </div>
            <div className="flex items-center justify-between px-3 py-1 border-t border-border bg-muted/50">
              <div className="text-xs text-muted-foreground">
                {content.length} characters
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Syntax Highlighting</span>
                  <Switch
                    checked={isSyntaxHighlighting}
                    onCheckedChange={setIsSyntaxHighlighting}
                    className="h-4 w-7 data-[state=checked]:bg-green-500 [&>span]:h-3 [&>span]:w-3"
                  />
                </div>
                <Select value={language} onValueChange={(value) => setLanguage(value as SupportedLanguage)}>
                  <SelectTrigger className="w-[120px] h-6 text-xs">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value} className="text-xs">
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-6 px-2"
                >
                  {isExpanded ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;