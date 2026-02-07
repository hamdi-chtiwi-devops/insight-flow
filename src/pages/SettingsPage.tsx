import { User, Shield, Bell, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Profile</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Display Name</label>
            <Input defaultValue="Admin User" className="mt-1 border-border bg-secondary/50 text-foreground" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <Input defaultValue="admin@insightflow.io" className="mt-1 border-border bg-secondary/50 text-foreground" />
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Email reports", desc: "Receive scheduled reports via email" },
            { label: "Metric alerts", desc: "Notify when KPIs change significantly" },
            { label: "Query failures", desc: "Alert when scheduled queries fail" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch />
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Security</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-secondary/30 p-3">
            <div>
              <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm" className="border-border text-foreground">Enable</Button>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-secondary/30 p-3">
            <div>
              <p className="text-sm font-medium text-foreground">API Keys</p>
              <p className="text-xs text-muted-foreground">Manage your API access tokens</p>
            </div>
            <Button variant="outline" size="sm" className="border-border text-foreground">Manage</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
