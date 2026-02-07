import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Database,
  Sparkles,
  Settings,
  FileBarChart,
  Clock,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Query Builder", to: "/query", icon: Search },
  { label: "Data Sources", to: "/sources", icon: Database },
  { label: "AI Insights", to: "/ai", icon: Sparkles },
  { label: "Reports", to: "/reports", icon: FileBarChart },
  { label: "History", to: "/history", icon: Clock },
  { label: "Settings", to: "/settings", icon: Settings },
];

interface AppSidebarProps {
  open: boolean;
  onToggle: () => void;
}

export function AppSidebar({ open, onToggle }: AppSidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-surface-overlay transition-all duration-300",
        open ? "w-60" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 border-b border-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        {open && (
          <span className="text-base font-bold tracking-tight text-foreground animate-fade-in">
            InsightFlow
          </span>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
            !open && "ml-0"
          )}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", !open && "rotate-180")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary shadow-glow-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
              {open && <span className="animate-fade-in">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section */}
      {open && (
        <div className="border-t border-border p-3">
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-xs font-medium text-foreground">Pro Plan</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Unlimited queries</p>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className="h-full w-3/4 rounded-full gradient-primary" />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
