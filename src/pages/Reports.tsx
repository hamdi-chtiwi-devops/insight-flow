import { FileBarChart, Download, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { revenueData, topProducts } from "@/data/sample-data";

const reports = [
  { name: "Monthly Revenue Report", date: "Feb 1, 2026", type: "PDF", size: "2.4 MB", auto: true },
  { name: "Q4 Customer Analysis", date: "Jan 15, 2026", type: "PDF", size: "5.1 MB", auto: false },
  { name: "Weekly Sales Summary", date: "Feb 5, 2026", type: "CSV", size: "340 KB", auto: true },
  { name: "Product Performance", date: "Jan 28, 2026", type: "PDF", size: "3.8 MB", auto: false },
  { name: "User Engagement Metrics", date: "Feb 3, 2026", type: "PDF", size: "1.9 MB", auto: true },
];

export default function Reports() {
  const exportRevenueCSV = () => {
    const headers = "Month,Revenue,Expenses,Profit";
    const rows = revenueData.map((r) => `${r.month},${r.revenue},${r.expenses},${r.profit}`).join("\n");
    downloadFile(`${headers}\n${rows}`, "revenue-report.csv", "text/csv");
    toast.success("Revenue report exported as CSV");
  };

  const exportProductsCSV = () => {
    const headers = "Product,Sales,Revenue,Trend";
    const rows = topProducts.map((p) => `${p.name},${p.sales},${p.revenue},${p.trend}`).join("\n");
    downloadFile(`${headers}\n${rows}`, "products-report.csv", "text/csv");
    toast.success("Products report exported as CSV");
  };

  const exportDashboardJSON = () => {
    const data = { revenue: revenueData, products: topProducts, exportedAt: new Date().toISOString() };
    downloadFile(JSON.stringify(data, null, 2), "dashboard-export.json", "application/json");
    toast.success("Dashboard data exported as JSON");
  };

  const handleShare = (name: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/reports?name=${encodeURIComponent(name)}`);
    toast.success("Share link copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">Generated and scheduled reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportRevenueCSV} className="gap-2 border-border text-foreground">
            <Download className="h-4 w-4" /> Revenue CSV
          </Button>
          <Button variant="outline" onClick={exportProductsCSV} className="gap-2 border-border text-foreground">
            <Download className="h-4 w-4" /> Products CSV
          </Button>
          <Button onClick={exportDashboardJSON} className="gap-2 gradient-primary text-primary-foreground border-0 hover:opacity-90">
            <FileBarChart className="h-4 w-4" /> Export All
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.name} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileBarChart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{r.name}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{r.date}</span>
                  <span>{r.type} · {r.size}</span>
                  {r.auto && <span className="rounded-full bg-chart-green/10 px-2 py-0.5 text-chart-green">Auto</span>}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleShare(r.name)} className="h-8 w-8 text-muted-foreground"><Share2 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={exportRevenueCSV} className="h-8 w-8 text-muted-foreground"><Download className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
