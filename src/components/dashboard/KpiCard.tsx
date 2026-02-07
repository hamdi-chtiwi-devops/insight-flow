import { DollarSign, Users, Target, ShoppingCart, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  dollar: DollarSign,
  users: Users,
  target: Target,
  cart: ShoppingCart,
};

interface KpiCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
  delay?: number;
}

export function KpiCard({ label, value, change, positive, icon, delay = 0 }: KpiCardProps) {
  const Icon = iconMap[icon] || DollarSign;
  const TrendIcon = positive ? TrendingUp : TrendingDown;

  return (
    <div
      className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-glow-primary"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground animate-count-up">{value}</p>
          <div className="mt-2 flex items-center gap-1.5">
            <TrendIcon className={cn("h-3.5 w-3.5", positive ? "text-chart-green" : "text-chart-rose")} />
            <span className={cn("text-sm font-medium", positive ? "text-chart-green" : "text-chart-rose")}>
              {change}
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
          positive ? "bg-primary/10" : "bg-chart-rose/10"
        )}>
          <Icon className={cn("h-5 w-5", positive ? "text-primary" : "text-chart-rose")} />
        </div>
      </div>
    </div>
  );
}
