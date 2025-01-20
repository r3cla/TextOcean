export type SupportedLanguage = "javascript" | "typescript" | "python" | 
  "html" | "css" | "markdown" | "plaintext";

export interface EditorProps {
  content: string;
  onChange: (value: string) => void;
  language: SupportedLanguage;
  isRawView: boolean;
  height?: string;
}

export interface LanguageSelectorProps {
  value: SupportedLanguage;
  onChange: (value: SupportedLanguage) => void;
}

export interface Language {
  value: SupportedLanguage;
  label: string;
}