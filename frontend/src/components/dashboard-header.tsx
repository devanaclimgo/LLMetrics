import { useState } from "react";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY || "no-key";

  const handleCopy = () => {
    navigator.clipboard.writeText("sk-llm-abcd1234efgh5678ijkl9012mnop3x9f");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="flex flex-col gap-6 border-b border-border/50 bg-card/30 px-6 py-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">LLMetrics</h1>
        <p className="text-sm text-muted-foreground">
          AI Cost & Usage Observability
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
          <span className="text-xs text-muted-foreground">API Key:</span>
          <code className="font-mono text-xs">{apiKey}</code>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-success" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
