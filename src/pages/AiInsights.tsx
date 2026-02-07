import { useState } from "react";
import { Sparkles, Send, TrendingUp, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const suggestions = [
  "Show sales by country last 30 days",
  "Top 10 products this month",
  "Revenue trend compared to last quarter",
  "Which categories are declining?",
];

const insightCards = [
  {
    icon: TrendingUp,
    title: "Revenue Surge Detected",
    description: "Revenue increased by 23% in the last 2 weeks, driven primarily by Electronics (+31%) and Clothing (+18%). This exceeds the seasonal average by 8%.",
    type: "trend" as const,
  },
  {
    icon: AlertTriangle,
    title: "Anomaly: Conversion Drop",
    description: "Conversion rate dropped 12% on Tuesday. Correlating with a 3s increase in page load time for mobile users. Investigate CDN performance.",
    type: "anomaly" as const,
  },
  {
    icon: Lightbulb,
    title: "Opportunity: Bundle Products",
    description: "Customers who buy Wireless Headphones have a 62% chance of also purchasing a USB-C Hub within 7 days. Consider creating a bundle.",
    type: "recommendation" as const,
  },
];

const typeStyles = {
  trend: "border-chart-green/30 bg-chart-green/5",
  anomaly: "border-chart-amber/30 bg-chart-amber/5",
  recommendation: "border-primary/30 bg-primary/5",
};

const iconStyles = {
  trend: "text-chart-green bg-chart-green/10",
  anomaly: "text-chart-amber bg-chart-amber/10",
  recommendation: "text-primary bg-primary/10",
};

export default function AiInsights() {
  const [nlQuery, setNlQuery] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Insights</h1>
        <p className="text-sm text-muted-foreground">Ask questions in natural language or explore auto-generated insights</p>
      </div>

      {/* Natural Language Query */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="text-base font-semibold text-foreground">Ask your data</h3>
        </div>
        <div className="flex gap-2">
          <Input
            value={nlQuery}
            onChange={(e) => setNlQuery(e.target.value)}
            placeholder="e.g., Show me the top 10 customers by revenue..."
            className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
          />
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
            <Send className="h-4 w-4" /> Ask
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setNlQuery(s)}
              className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Smart Insights */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Smart Insights</h3>
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">AI Generated</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
          {insightCards.map((card) => (
            <div
              key={card.title}
              className={cn("rounded-xl border p-5 transition-all hover:shadow-md", typeStyles[card.type])}
            >
              <div className={cn("mb-3 inline-flex items-center justify-center rounded-lg p-2", iconStyles[card.type])}>
                <card.icon className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">{card.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

