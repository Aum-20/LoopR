import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import transactions from "@/data/transactions.json";

// Helper for unique categories/colors
const COLORS = [
  "#22c55e", "#eab308", "#3b82f6", "#f472b6", "#f87171", "#a78bfa", "#f59e42"
];

export const ChartSection = () => {
  // Filter states
  const [status, setStatus] = useState<"All" | "Paid" | "Pending">("All");
  const [category, setCategory] = useState<string>("All");
  const [user, setUser] = useState<string>("All");
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // Get unique categories and users for filter dropdowns
  const categories = useMemo(
    () => Array.from(new Set(transactions.map((t) => t.category))),
    []
  );
  const users = useMemo(
    () => Array.from(new Set(transactions.map((t) => t.user_id))),
    []
  );

  // Filtered transactions
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (status !== "All" && t.status !== status) return false;
      if (category !== "All" && t.category !== category) return false;
      if (user !== "All" && t.user_id !== user) return false;
      if (minAmount && t.amount < parseFloat(minAmount)) return false;
      if (maxAmount && t.amount > parseFloat(maxAmount)) return false;
      if (dateFrom && new Date(t.date) < new Date(dateFrom)) return false;
      if (dateTo && new Date(t.date) > new Date(dateTo)) return false;
      return true;
    });
  }, [status, category, user, minAmount, maxAmount, dateFrom, dateTo]);

  // Group by month for line chart
  const chartData = useMemo(() => {
    const monthMap: Record<string, { income: number; expenses: number }> = {};
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    filtered.forEach((t) => {
      const month = new Date(t.date).getMonth();
      const key = monthNames[month];
      if (!monthMap[key]) monthMap[key] = { income: 0, expenses: 0 };
      if (t.category === "Revenue") {
        monthMap[key].income += t.amount;
      } else {
        monthMap[key].expenses += t.amount;
      }
    });

    return monthNames.map((month) => ({
      month,
      income: Number(monthMap[month]?.income?.toFixed(2)) || 0,
      expenses: Number(monthMap[month]?.expenses?.toFixed(2)) || 0,
    }));
  }, [filtered]);

  // Category breakdown for pie chart
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map).map(([name, value]) => ({
      name,
      value: Math.abs(value),
    }));
  }, [filtered]);

  // Summary metrics
  const summary = useMemo(() => {
    let totalRevenue = 0, totalExpenses = 0, count = filtered.length;
    filtered.forEach((t) => {
      if (t.category === "Revenue") totalRevenue += t.amount;
      else totalExpenses += t.amount;
    });
    return {
      totalRevenue,
      totalExpenses,
      count,
    };
  }, [filtered]);

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-white">Financial Overview</CardTitle>
          <div className="flex flex-wrap gap-2">
            <select
              className="bg-gray-700 border-gray-600 text-white rounded px-2 py-1"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
            <select
              className="bg-gray-700 border-gray-600 text-white rounded px-2 py-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              className="bg-gray-700 border-gray-600 text-white rounded px-2 py-1"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            >
              <option value="All">All Users</option>
              {users.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Min Amount"
              className="bg-gray-700 border-gray-600 text-white rounded px-2 py-1 w-24"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Amount"
              className="bg-gray-700 border-gray-600 text-white rounded px-2 py-1 w-24"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
            <input
              type="date"
              className="bg-gray-700 border-gray-600 text-white rounded px-2 py-1"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <input
              type="date"
              className="bg-gray-700 border-gray-600 text-white rounded px-2 py-1"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-6 mt-4">
          <div className="text-green-400 text-lg font-semibold">
            Revenue: ${summary.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <div className="text-yellow-400 text-lg font-semibold">
            Expenses: ${Math.abs(summary.totalExpenses).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <div className="text-gray-300 text-lg font-semibold">
            Transactions: {summary.count}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#eab308"
                  strokeWidth={3}
                  dot={{ fill: "#eab308", strokeWidth: 2, r: 4 }}
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 h-80 flex flex-col items-center justify-center">
            <div className="text-gray-300 mb-2 font-semibold">Category Breakdown</div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {categoryData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );    
};