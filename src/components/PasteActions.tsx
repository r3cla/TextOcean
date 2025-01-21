import { Button } from "@/components/ui/button";
import { Eye, Copy, Code2, Save, Plus } from "lucide-react";
import { SupportedLanguage } from "@/types/editor";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
     <Tooltip>
       <TooltipTrigger asChild>
         <Button variant="outline" size="sm" onClick={onToggleView}>
           {isRawView ? <Code2 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
         </Button>
       </TooltipTrigger>
       <TooltipContent>
         {isRawView ? "Switch to syntax highlighted editor" : "Switch to raw text view"}
       </TooltipContent>
     </Tooltip>

     <Tooltip>
       <TooltipTrigger asChild>
         <Button variant="outline" size="sm" onClick={onCopy}>
           <Copy className="h-4 w-4" />
         </Button>
       </TooltipTrigger>
       <TooltipContent>Copy content to clipboard</TooltipContent>
     </Tooltip>

     {isAuthenticated && (
       <>
         <Tooltip>
           <TooltipTrigger asChild>
             <Button variant="outline" size="sm" onClick={onSave}>
               <Save className="h-4 w-4" />
             </Button>
           </TooltipTrigger>
           <TooltipContent>
             {currentPasteId ? "Save changes to current paste" : "Save as new paste"}
           </TooltipContent>
         </Tooltip>

         <Tooltip>
           <TooltipTrigger asChild>
             <Button variant="outline" size="sm" onClick={onNew}>
               <Plus className="h-4 w-4" />
             </Button>
           </TooltipTrigger>
           <TooltipContent>Create a new empty paste</TooltipContent>
         </Tooltip>
       </>
     )}
   </div>
 );
};

export default PasteActions;