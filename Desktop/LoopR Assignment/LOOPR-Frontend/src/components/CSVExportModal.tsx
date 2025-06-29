
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface CSVExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
}

export const CSVExportModal = ({ isOpen, onClose, data }: CSVExportModalProps) => {
  const [selectedColumns, setSelectedColumns] = useState({
    name: true,
    date: true,
    amount: true,
    status: true,
  });

  const columns = [
    { key: "name", label: "Name", description: "Customer or vendor name" },
    { key: "date", label: "Date", description: "Transaction date" },
    { key: "amount", label: "Amount", description: "Transaction amount" },
    { key: "status", label: "Status", description: "Transaction status" },
  ];

  const handleColumnToggle = (columnKey: string) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey as keyof typeof selectedColumns],
    }));
  };

  const generateCSV = () => {
    const selectedKeys = Object.keys(selectedColumns).filter(
      (key) => selectedColumns[key as keyof typeof selectedColumns]
    );

    if (selectedKeys.length === 0) {
      toast({
        title: "No columns selected",
        description: "Please select at least one column to export.",
        variant: "destructive",
      });
      return;
    }

    // Create CSV headers
    const headers = selectedKeys.map((key) => 
      columns.find(col => col.key === key)?.label || key
    ).join(",");

    // Create CSV rows
    const rows = data.map((row) =>
      selectedKeys.map((key) => {
        const value = row[key];
        // Handle special formatting
        if (key === "amount") {
          return `"$${Math.abs(value).toFixed(2)}"`;
        }
        return `"${value}"`;
      }).join(",")
    );

    const csvContent = [headers, ...rows].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `transactions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: `CSV file with ${data.length} transactions has been downloaded.`,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Export Transactions</DialogTitle>
          <DialogDescription className="text-gray-400">
            Configure which columns to include in your CSV export
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-gray-400">
            Select columns to export ({data.length} transactions)
          </div>

          <div className="space-y-3">
            {columns.map((column) => (
              <Card key={column.key} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={column.key}
                      checked={selectedColumns[column.key as keyof typeof selectedColumns]}
                      onCheckedChange={() => handleColumnToggle(column.key)}
                      className="border-gray-500 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={column.key}
                        className="text-sm font-medium text-white cursor-pointer"
                      >
                        {column.label}
                      </label>
                      <p className="text-xs text-gray-400 mt-1">
                        {column.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={generateCSV}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Export CSV
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
