interface CodeBlockProps {
  code: string;
  language?: "tsx" | "bash";
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  return (
    <div className="relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <span className="absolute top-2 right-2 text-[10px] font-mono text-gray-400 uppercase">
        {language}
      </span>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-gray-800">
        <code>{code}</code>
      </pre>
    </div>
  );
}
