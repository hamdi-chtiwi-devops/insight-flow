import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { trafficData } from "@/data/sample-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
      <p className="text-sm font-medium text-foreground">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-xs text-muted-foreground">
          {entry.name}: <span className="font-medium text-foreground">{entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

export function TrafficChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold text-foreground">Weekly Traffic</h3>
      <p className="mb-4 text-sm text-muted-foreground">Visitors & page views this week</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trafficData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="visitors" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="pageViews" fill="hsl(262, 83%, 65%)" radius={[4, 4, 0, 0]} barSize={16} opacity={0.6} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
