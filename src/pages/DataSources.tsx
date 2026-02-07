import { Database, Plus, RefreshCw, Settings, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dataSources } from "@/data/sample-data";
import { cn } from "@/lib/utils";

const dbIcons: Record<string, string> = {
  PostgreSQL: "🐘",
  BigQuery: "📊",
  Firestore: "🔥",
  MySQL: "🐬",
};

export default function DataSources() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Data Sources</h1>
          <p className="text-sm text-muted-foreground">Manage your database connections</p>
        </div>
        <Button className="gap-2 gradient-primary text-primary-foreground border-0 hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Connection
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {dataSources.map((ds) => (
          <div key={ds.id} className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-glow-primary">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-xl">
                  {dbIcons[ds.type] || "💾"}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{ds.name}</h3>
                  <p className="text-sm text-muted-foreground">{ds.type}</p>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                ds.status === "connected" ? "bg-chart-green/10 text-chart-green" : "bg-chart-rose/10 text-chart-rose"
              )}>
                {ds.status === "connected" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {ds.status}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
              <div className="flex gap-6 text-xs text-muted-foreground">
                <span><Database className="mr-1 inline h-3 w-3" />{ds.tables} tables</span>
                <span><RefreshCw className="mr-1 inline h-3 w-3" />{ds.lastSync}</span>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                <Settings className="mr-1 h-3.5 w-3.5" /> Configure
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
