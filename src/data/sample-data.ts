export const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
  { month: "Feb", revenue: 48000, expenses: 31000, profit: 17000 },
  { month: "Mar", revenue: 55000, expenses: 33000, profit: 22000 },
  { month: "Apr", revenue: 51000, expenses: 29000, profit: 22000 },
  { month: "May", revenue: 62000, expenses: 35000, profit: 27000 },
  { month: "Jun", revenue: 71000, expenses: 38000, profit: 33000 },
  { month: "Jul", revenue: 68000, expenses: 36000, profit: 32000 },
  { month: "Aug", revenue: 75000, expenses: 40000, profit: 35000 },
  { month: "Sep", revenue: 82000, expenses: 42000, profit: 40000 },
  { month: "Oct", revenue: 78000, expenses: 39000, profit: 39000 },
  { month: "Nov", revenue: 88000, expenses: 45000, profit: 43000 },
  { month: "Dec", revenue: 95000, expenses: 48000, profit: 47000 },
];

export const salesByCategory = [
  { name: "Electronics", value: 35, fill: "hsl(217, 91%, 60%)" },
  { name: "Clothing", value: 25, fill: "hsl(152, 69%, 50%)" },
  { name: "Food & Bev", value: 20, fill: "hsl(38, 92%, 60%)" },
  { name: "Home & Garden", value: 12, fill: "hsl(262, 83%, 65%)" },
  { name: "Sports", value: 8, fill: "hsl(350, 80%, 60%)" },
];

export const trafficData = [
  { day: "Mon", visitors: 1200, pageViews: 3400 },
  { day: "Tue", visitors: 1400, pageViews: 3900 },
  { day: "Wed", visitors: 1100, pageViews: 3100 },
  { day: "Thu", visitors: 1600, pageViews: 4500 },
  { day: "Fri", visitors: 1800, pageViews: 5100 },
  { day: "Sat", visitors: 900, pageViews: 2400 },
  { day: "Sun", visitors: 750, pageViews: 2000 },
];

export const topProducts = [
  { name: "Wireless Headphones", sales: 2453, revenue: "$122,650", trend: "+12.3%" },
  { name: "Smart Watch Pro", sales: 1891, revenue: "$94,550", trend: "+8.7%" },
  { name: "USB-C Hub", sales: 1654, revenue: "$49,620", trend: "+15.2%" },
  { name: "Mechanical Keyboard", sales: 1432, revenue: "$71,600", trend: "+5.1%" },
  { name: "4K Monitor", sales: 1120, revenue: "$89,600", trend: "-2.4%" },
  { name: "Laptop Stand", sales: 987, revenue: "$29,610", trend: "+22.1%" },
  { name: "Webcam HD", sales: 876, revenue: "$43,800", trend: "+3.8%" },
  { name: "Desk Mat XL", sales: 754, revenue: "$22,620", trend: "+18.9%" },
];

export const queryHistory = [
  { id: 1, query: "SELECT * FROM orders WHERE date > '2024-01-01'", status: "completed", duration: "0.23s", rows: 1247, timestamp: "2 min ago" },
  { id: 2, query: "SELECT category, SUM(revenue) FROM products GROUP BY category", status: "completed", duration: "0.45s", rows: 5, timestamp: "15 min ago" },
  { id: 3, query: "SELECT TOP 10 customers BY total_spend", status: "completed", duration: "0.12s", rows: 10, timestamp: "1 hr ago" },
  { id: 4, query: "SELECT monthly_active_users FROM analytics", status: "failed", duration: "2.10s", rows: 0, timestamp: "2 hr ago" },
  { id: 5, query: "SELECT * FROM inventory WHERE stock < 10", status: "completed", duration: "0.08s", rows: 34, timestamp: "3 hr ago" },
];

export const dataSources = [
  { id: 1, name: "Production Database", type: "PostgreSQL", status: "connected", tables: 47, lastSync: "2 min ago" },
  { id: 2, name: "Analytics Store", type: "BigQuery", status: "connected", tables: 23, lastSync: "5 min ago" },
  { id: 3, name: "User Events", type: "Firestore", status: "connected", tables: 12, lastSync: "Real-time" },
  { id: 4, name: "Legacy System", type: "MySQL", status: "disconnected", tables: 89, lastSync: "2 days ago" },
];

export const kpiData = [
  { label: "Total Revenue", value: "$815K", change: "+12.5%", positive: true, icon: "dollar" },
  { label: "Active Users", value: "24.8K", change: "+8.2%", positive: true, icon: "users" },
  { label: "Conversion Rate", value: "3.24%", change: "-0.4%", positive: false, icon: "target" },
  { label: "Avg Order Value", value: "$68.40", change: "+5.1%", positive: true, icon: "cart" },
];
