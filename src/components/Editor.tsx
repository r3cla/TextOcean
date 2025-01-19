import MonacoEditor from "@monaco-editor/react";
import { EditorProps } from "@/types/editor";

const Editor = ({ content, onChange, language, isRawView }: EditorProps) => {
  const renderRawView = () => (
    <pre className="p-4 whitespace-pre-wrap break-words font-mono text-sm h-[460px] overflow-y-auto">
      {content}
    </pre>
  );

  const renderMonacoEditor = () => (
    <MonacoEditor
      height="460px"
      language={language}
      value={content}
      onChange={(value) => onChange(value ?? "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
        padding: { top: 16 },
      }}
    />
  );

  return isRawView ? renderRawView() : renderMonacoEditor();
};

export default Editor;