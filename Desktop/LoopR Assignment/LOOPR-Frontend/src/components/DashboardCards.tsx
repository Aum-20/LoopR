import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Wallet, DollarSign } from "lucide-react";
import transactions from "@/data/transactions.json";

export const DashboardCards = () => {
  // Calculate metrics from transactions
  const revenue = transactions
    .filter((t) => t.category === "Revenue" && t.status === "Paid")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.category === "Expense" && t.status === "Paid")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = revenue - expenses;

  // Example: savings as 10% of revenue (customize as needed)
  const savings = revenue * 0.1;

  const cards = [
    {
      title: "Balance",
      amount: `$${balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      icon: Wallet,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Revenue",
      amount: `$${revenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      icon: ArrowUp,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Expenses",
      amount: `$${expenses.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      icon: ArrowDown,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Savings",
      amount: `$${savings.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.title} className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-white">{card.amount}</p>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};