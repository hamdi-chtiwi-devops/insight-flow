import { KpiCard } from "@/components/dashboard/KpiCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { TopProductsTable } from "@/components/dashboard/TopProductsTable";
import { kpiData } from "@/data/sample-data";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your business at a glance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} delay={i * 100} />
        ))}
      </div>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CategoryPieChart />
        </div>
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>
      </div>

      {/* Products Table */}
      <TopProductsTable />
    </div>
  );
}
