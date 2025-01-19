import { Button } from "@/components/ui/button";
import { Eye, Copy, Code2, Save, Plus } from "lucide-react";
import { SupportedLanguage } from "@/types/editor";

interface PasteActionsProps {
  isAuthenticated: boolean;
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  isRawView: boolean;
  onToggleView: () => void;
  onCopy: () => void;
  onSave: () => void;
  onNew: () => void;
  currentPasteId: string | null;
}

const PasteActions = ({
  isAuthenticated,
  isRawView,
  onToggleView,
  onCopy,
  onSave,
  onNew,
  currentPasteId,
}: PasteActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={onToggleView}>
        {isRawView ? <Code2 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        <span className="ml-2">{isRawView ? "Editor View" : "Raw View"}</span>
      </Button>
      <Button variant="outline" size="sm" onClick={onCopy}>
        <Copy className="h-4 w-4" />
        <span className="ml-2">Copy</span>
      </Button>
      {isAuthenticated && (
        <>
          <Button variant="outline" size="sm" onClick={onSave}>
            <Save className="h-4 w-4" />
            <span className="ml-2">{currentPasteId ? 'Update' : 'Save'}</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onNew}>
            <Plus className="h-4 w-4" />
            <span className="ml-2">New</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default PasteActions;