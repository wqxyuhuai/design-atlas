import clsx from "clsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { EffectCodeLanguage } from "../../types/effect";

interface CodeBlockProps {
  code: string;
  language?: EffectCodeLanguage;
  maxHeight?: number;
  showCopy?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  maxHeight,
  showCopy = false
}: CodeBlockProps) {
  return (
    <div className="relative min-w-0 overflow-hidden rounded-[16px] bg-[#0f1011]">
      <div
        className={clsx("min-w-0 rounded-[inherit]", maxHeight ? "overflow-auto" : undefined)}
        style={maxHeight ? { maxHeight } : undefined}
      >
        <SyntaxHighlighter
          language={language}
          style={coldarkDark}
          customStyle={{
            margin: 0,
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            overflowX: "auto",
            background: "#0f1011",
            padding: showCopy ? "56px 16px 18px" : "18px 16px",
            borderRadius: "16px",
            fontSize: "12px",
            lineHeight: 1.6
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
