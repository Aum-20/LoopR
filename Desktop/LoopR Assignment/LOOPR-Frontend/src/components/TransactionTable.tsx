import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUp, ArrowDown } from "lucide-react";
import { CSVExportModal } from "@/components/CSVExportModal";

// Transaction type matching transactions.json
interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: "Paid" | "Pending";
  user_id: string;
  user_profile: string;
}

export const TransactionTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Transaction>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showExportModal, setShowExportModal] = useState(false);

  // Add filter state for status
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"All" | "Paid" | "Pending">("All");

  // Fetch transactions.json
  useEffect(() => {
    fetch("/src/data/transactions.json")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  // Filter by user_id (search) or category and status
  const filteredTransactions = transactions.filter((transaction) => {
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      transaction.user_id.toLowerCase().includes(searchLower) ||
      transaction.category.toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === "All" || transaction.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sorting logic
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortField === "user_id") {
      return sortDirection === "asc"
        ? a.user_id.localeCompare(b.user_id)
        : b.user_id.localeCompare(a.user_id);
    }
    return 0;
  });

  const handleSort = (field: keyof Transaction) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Transactions</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                onClick={() => setShowExportModal(true)}
              >
                Export CSV
              </Button>
              <span className="text-blue-400 text-sm cursor-pointer hover:underline">
                See all
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by user or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                onClick={() => setShowFilter((prev) => !prev)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              {showFilter && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      statusFilter === "All" ? "bg-gray-700 text-white" : "text-gray-300"
                    } hover:bg-gray-700`}
                    onClick={() => setStatusFilter("All")}
                  >
                    All
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      statusFilter === "Paid" ? "bg-gray-700 text-white" : "text-gray-300"
                    } hover:bg-gray-700`}
                    onClick={() => setStatusFilter("Paid")}
                  >
                    Paid
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      statusFilter === "Pending" ? "bg-gray-700 text-white" : "text-gray-300"
                    } hover:bg-gray-700`}
                    onClick={() => setStatusFilter("Pending")}
                  >
                    Pending
                  </button>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-400 bg-gray-700 px-3 py-2 rounded-lg">
              {/* You can add a dynamic date range here if needed */}
              2024
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th
                    className="text-left py-3 px-2 text-gray-400 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort("user_id")}
                  >
                    <div className="flex items-center">
                      User
                      {sortField === "user_id" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : (
                            <ArrowDown className="w-4 h-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left py-3 px-2 text-gray-400 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center">
                      Date
                      {sortField === "date" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : (
                            <ArrowDown className="w-4 h-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left py-3 px-2 text-gray-400 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center">
                      Amount
                      {sortField === "amount" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : (
                            <ArrowDown className="w-4 h-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">
                    Category
                  </th>
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center">
                        <Avatar className="w-10 h-10 mr-3">
                          <AvatarImage src={transaction.user_profile} />
                          <AvatarFallback className="bg-gray-600 text-white">
                            {transaction.user_id
                              .replace("user_", "")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white font-medium">
                          {transaction.user_id}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`font-semibold ${
                          transaction.category === "Revenue"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {transaction.category === "Revenue" ? "+" : "-"}$
                        {Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-gray-400">
                      {transaction.category}
                    </td>
                    <td className="py-4 px-2">
                      <Badge
                        className={`${getStatusColor(
                          transaction.status
                        )} border`}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <CSVExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        data={sortedTransactions}
      />
    </>
  );
};