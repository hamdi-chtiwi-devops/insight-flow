import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, TrendingUp, AlertTriangle, Lightbulb, BarChart3, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { streamChat } from "@/lib/ai-stream";
import { toast } from "sonner";

const suggestions = [
  "Show sales by country last 30 days",
  "Top 10 products this month",
  "Revenue trend compared to last quarter",
  "Which categories are declining?",
  "Analyze our conversion funnel",
];

type Message = { role: "user" | "assistant"; content: string };

export default function AiInsights() {
  const [nlQuery, setNlQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "insights">("chat");
  const [insights, setInsights] = useState<string>("");
  const [insightsLoading, setInsightsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setNlQuery("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        mode: "chat",
        onDelta: upsertAssistant,
        onDone: () => setIsLoading(false),
      });
    } catch (e: any) {
      toast.error(e.message || "AI request failed");
      setIsLoading(false);
    }
  };

  const generateInsights = async () => {
    setInsightsLoading(true);
    setInsights("");
    let result = "";

    try {
      await streamChat({
        messages: [
          {
            role: "user",
            content: `Analyze this business data and provide insights:
            - Revenue: $815K this month (+12.5% MoM)
            - Active Users: 24.8K (+8.2%)
            - Conversion Rate: 3.24% (-0.4%)
            - Top category: Electronics (35% of sales)
            - Fastest growing: Sports (+22.1%)
            - Weekly traffic peaks on Friday (1800 visitors)
            - Average order value: $68.40 (+5.1%)
            
            Provide 4-5 specific, actionable insights about trends, anomalies, and recommendations.`,
          },
        ],
        mode: "insights",
        onDelta: (chunk) => {
          result += chunk;
          setInsights(result);
        },
        onDone: () => setInsightsLoading(false),
      });
    } catch (e: any) {
      toast.error(e.message || "Failed to generate insights");
      setInsightsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Insights</h1>
          <p className="text-sm text-muted-foreground">Ask questions in natural language or generate smart insights</p>
        </div>
        <div className="flex rounded-lg border border-border bg-secondary/50 p-0.5">
          {(["chat", "insights"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-medium transition-all",
                activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === "chat" ? "AI Chat" : "Smart Insights"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "chat" ? (
        <div className="flex flex-col rounded-xl border border-border bg-card" style={{ height: "calc(100vh - 220px)" }}>
          {/* Chat Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Ask your data anything</h3>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  Type a question in natural language and AI will help you explore your data
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-foreground"
                  )}
                >
                  <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-xl bg-secondary/50 px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(nlQuery);
              }}
              className="flex gap-2"
            >
              <Input
                value={nlQuery}
                onChange={(e) => setNlQuery(e.target.value)}
                placeholder="Ask about your data..."
                className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !nlQuery.trim()} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Generate Smart Insights</h3>
                <p className="text-sm text-muted-foreground">AI will analyze your dashboard data and surface key findings</p>
              </div>
            </div>
            <Button
              onClick={generateInsights}
              disabled={insightsLoading}
              className="gap-2 gradient-primary text-primary-foreground border-0 hover:opacity-90"
            >
              {insightsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {insightsLoading ? "Analyzing..." : "Generate Insights"}
            </Button>
          </div>

          {insights && (
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-chart-amber" />
                <h3 className="font-semibold text-foreground">AI-Generated Insights</h3>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">AI</span>
              </div>
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground font-sans">{insights}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
