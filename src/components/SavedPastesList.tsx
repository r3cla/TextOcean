// SavedPastesList.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface SavedPastesListProps {
  pastes: any[];
  onLoadPaste: (paste: any) => void;
  onDeletePaste: (pasteId: string) => void;
  onUpdateTitle: (pasteId: string, newTitle: string) => void;
}

const SavedPastesList = ({ pastes, onLoadPaste, onDeletePaste, onUpdateTitle }: SavedPastesListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const validateTitle = (title: string) => {
    if (title.length === 0) return "Title cannot be empty";
    if (!/^[a-zA-Z0-9]+$/.test(title)) return "Only letters and numbers allowed";
    return null;
  };

  const handleEditStart = (paste: any) => {
    setEditingId(paste.id);
    setEditTitle(paste.title || paste.content.slice(0, 15));
    setError(null);
  };

  const handleEditSave = (pasteId: string) => {
    const validationError = validateTitle(editTitle);
    if (validationError) {
      setError(validationError);
      return;
    }
    onUpdateTitle(pasteId, editTitle);
    setEditingId(null);
    setError(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditTitle("");
    setError(null);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setEditTitle(newValue);
    setError(validateTitle(newValue));
  };

  const handleDeleteClick = (pasteId: string) => {
    setDeleteId(pasteId);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      onDeletePaste(deleteId);
      setDeleteId(null);
    }
  };

  if (pastes.length === 0) {
    return <p className="text-sm text-muted-foreground">No saved pastes yet</p>;
  }

  return (
    <>
      <div className="space-y-2">
        {pastes.map((paste) => (
          <div key={paste.id} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {editingId === paste.id ? (
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Input
                      value={editTitle}
                      onChange={handleTitleChange}
                      className={`h-8 text-sm ${error ? 'border-destructive' : ''}`}
                      maxLength={15}
                      placeholder="Enter title"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-500"
                      onClick={() => handleEditSave(paste.id)}
                      disabled={!!error}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={handleEditCancel}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {error && (
                    <span className="text-xs text-destructive ml-1">{error}</span>
                  )}
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="flex-1 justify-start text-left hover:bg-muted"
                    onClick={() => onLoadPaste(paste)}
                  >
                    <span className="truncate text-foreground">
                      {paste.title || paste.content.slice(0, 15)}...
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEditStart(paste)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteClick(paste.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your saved paste.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SavedPastesList;