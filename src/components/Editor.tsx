import MonacoEditor, { Monaco } from "@monaco-editor/react";
import { EditorProps } from "@/types/editor";

const Editor = ({ content, onChange, language, isRawView, height = "460px", theme = "vs-dark" }: EditorProps) => {
  const handleEditorMount = (editor: any, monaco: Monaco) => {
    // Add Format Document command
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => {
      editor.getAction('editor.action.formatDocument').run();
    });
  };

  const renderRawView = () => (
    <pre className="p-4 pr-8 whitespace-pre-wrap break-words font-mono text-sm" style={{ height }}>
      {content}
    </pre>
  );

  const renderMonacoEditor = () => (
    <MonacoEditor
      height={height}
      language={language}
      value={content}
      onChange={(value) => onChange(value ?? "")}
      theme={theme}
      onMount={handleEditorMount}
      options={{
        minimap: { enabled: false },
        fontSize: 12,
        wordWrap: "on",
        padding: { top: 16 },
        formatOnPaste: true,
        formatOnType: true,
        scrollbar: {
          vertical: 'visible',
          horizontalSliderSize: 12,
          verticalSliderSize: 12,
          horizontal: 'visible',
          useShadows: true,
          verticalScrollbarSize: 16,
          horizontalScrollbarSize: 16
        }
      }}
    />
  );

  return isRawView ? renderRawView() : renderMonacoEditor();
};

export default Editor;