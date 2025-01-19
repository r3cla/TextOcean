import { Button } from "@/components/ui/button";

interface SavedPastesListProps {
  pastes: any[];
  onLoadPaste: (paste: any) => void;
}

const SavedPastesList = ({ pastes, onLoadPaste }: SavedPastesListProps) => {
  if (pastes.length === 0) {
    return <p className="text-sm text-muted-foreground">No saved pastes yet</p>;
  }

  return (
    <div className="space-y-2">
      {pastes.map((paste) => (
        <Button
          key={paste.id}
          variant="ghost"
          className="w-full justify-start text-left hover:bg-muted"
          onClick={() => onLoadPaste(paste)}
        >
          <span className="truncate text-foreground">
            {paste.content.slice(0, 30)}...
          </span>
        </Button>
      ))}
    </div>
  );
};

export default SavedPastesList;