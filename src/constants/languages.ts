import { Language } from "@/types/editor";

interface Language {
  value: SupportedLanguage;
  label: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "plaintext", label: "None" },
];