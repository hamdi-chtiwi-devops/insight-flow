import { TrendingUp, TrendingDown } from "lucide-react";
import { topProducts } from "@/data/sample-data";
import { cn } from "@/lib/utils";

export function TopProductsTable() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold text-foreground">Top Products</h3>
      <p className="mb-4 text-sm text-muted-foreground">Best performing products this quarter</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left font-medium text-muted-foreground">Product</th>
              <th className="pb-3 text-right font-medium text-muted-foreground">Sales</th>
              <th className="pb-3 text-right font-medium text-muted-foreground">Revenue</th>
              <th className="pb-3 text-right font-medium text-muted-foreground">Trend</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.slice(0, 6).map((product, i) => {
              const isPositive = product.trend.startsWith("+");
              return (
                <tr key={product.name} className="border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/30">
                  <td className="py-3 font-medium text-foreground">{product.name}</td>
                  <td className="py-3 text-right text-muted-foreground">{product.sales.toLocaleString()}</td>
                  <td className="py-3 text-right text-foreground">{product.revenue}</td>
                  <td className="py-3 text-right">
                    <span className={cn("inline-flex items-center gap-1 text-sm font-medium", isPositive ? "text-chart-green" : "text-chart-rose")}>
                      {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                      {product.trend}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
