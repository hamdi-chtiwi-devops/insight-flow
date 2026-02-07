import { Bell, Menu, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function TopBar({ onToggleSidebar, sidebarOpen }: TopBarProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-card/50 px-4">
      {!sidebarOpen && (
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="text-muted-foreground">
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search dashboards, queries, data..."
          className="h-9 border-border bg-secondary/50 pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-chart-rose" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
        </Button>
      </div>
    </header>
  );
}
