import { Clock, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { queryHistory } from "@/data/sample-data";
import { cn } from "@/lib/utils";

export default function History() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Query History</h1>
        <p className="text-sm text-muted-foreground">Previously executed queries</p>
      </div>

      <div className="space-y-3">
        {queryHistory.map((q) => (
          <div key={q.id} className="rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <code className="block truncate font-mono text-sm text-foreground">{q.query}</code>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{q.timestamp}</span>
                  <span>Duration: {q.duration}</span>
                  <span>{q.rows} rows</span>
                  <span className={cn(
                    "rounded-full px-2 py-0.5 font-medium",
                    q.status === "completed" ? "bg-chart-green/10 text-chart-green" : "bg-chart-rose/10 text-chart-rose"
                  )}>
                    {q.status}
                  </span>
                </div>
              </div>
              <div className="ml-4 flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Play className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
