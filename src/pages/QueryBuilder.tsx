import { useState } from "react";
import { Play, Clock, Table, Sparkles, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { queryHistory } from "@/data/sample-data";
import { cn } from "@/lib/utils";

const sampleResult = [
  { id: 1, customer: "Acme Corp", total: "$12,450", orders: 34, region: "North America" },
  { id: 2, customer: "TechStart Inc", total: "$9,870", orders: 22, region: "Europe" },
  { id: 3, customer: "Global Foods", total: "$8,340", orders: 56, region: "Asia Pacific" },
  { id: 4, customer: "DataFlow LLC", total: "$7,200", orders: 18, region: "North America" },
  { id: 5, customer: "CloudNine", total: "$6,890", orders: 41, region: "Europe" },
];

export default function QueryBuilder() {
  const [query, setQuery] = useState("SELECT customer, SUM(total) as total, COUNT(*) as orders\nFROM orders\nGROUP BY customer\nORDER BY total DESC\nLIMIT 10;");
  const [showResults, setShowResults] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Query Builder</h1>
          <p className="text-sm text-muted-foreground">Write SQL or use natural language</p>
        </div>
        <Button className="gap-2 gradient-primary text-primary-foreground border-0 hover:opacity-90">
          <Sparkles className="h-4 w-4" />
          Ask AI
        </Button>
      </div>

      {/* SQL Editor */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">SQL Editor</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground">
              <Copy className="h-3.5 w-3.5" /> Copy
            </Button>
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> History
            </Button>
          </div>
        </div>
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-[140px] resize-none rounded-none border-0 bg-transparent font-mono text-sm text-foreground focus-visible:ring-0"
        />
        <div className="flex items-center justify-between border-t border-border px-4 py-2">
          <span className="text-xs text-muted-foreground">Target: Production Database (PostgreSQL)</span>
          <Button size="sm" onClick={() => setShowResults(true)} className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
            <Play className="h-3.5 w-3.5" /> Run Query
          </Button>
        </div>
      </div>

      {/* Results */}
      {showResults && (
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Table className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Results</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                5 rows · 0.23s
              </span>
            </div>
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground">
              <Download className="h-3.5 w-3.5" /> Export CSV
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {Object.keys(sampleResult[0]).map((key) => (
                    <th key={key} className="px-4 py-2.5 text-left font-medium text-muted-foreground capitalize">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleResult.map((row) => (
                  <tr key={row.id} className="border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/30">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="px-4 py-2.5 text-foreground">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Query History */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-base font-semibold text-foreground">Recent Queries</h3>
        <div className="mt-3 space-y-2">
          {queryHistory.map((q) => (
            <div key={q.id} className="flex items-center justify-between rounded-lg bg-secondary/30 px-4 py-3 transition-colors hover:bg-secondary/50">
              <div className="flex-1 min-w-0">
                <p className="truncate font-mono text-xs text-foreground">{q.query}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{q.timestamp} · {q.duration} · {q.rows} rows</p>
              </div>
              <span className={cn(
                "ml-3 rounded-full px-2 py-0.5 text-xs font-medium",
                q.status === "completed" ? "bg-chart-green/10 text-chart-green" : "bg-chart-rose/10 text-chart-rose"
              )}>
                {q.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
