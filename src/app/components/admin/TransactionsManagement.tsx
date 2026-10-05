import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Search, Download, DollarSign, TrendingUp, TrendingDown, Clock, Check, X } from "lucide-react";
import { mockTransactions, Transaction } from "../../data/admin-auth";
import { toast } from "sonner";

export function TransactionsManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "deposit" | "withdrawal" | "profit" | "subscription">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending" | "failed">("all");

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || tx.type === filterType;
    const matchesStatus = filterStatus === "all" || tx.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleApproveWithdrawal = (txId: string) => {
    setTransactions(transactions.map(tx => 
      tx.id === txId ? { ...tx, status: "completed" } : tx
    ));
    toast.success("Withdrawal approved and processed!");
  };

  const handleRejectWithdrawal = (txId: string) => {
    setTransactions(transactions.map(tx => 
      tx.id === txId ? { ...tx, status: "failed" } : tx
    ));
    toast.error("Withdrawal rejected.");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "deposit": return "bg-blue-100 text-blue-700";
      case "withdrawal": return "bg-purple-100 text-purple-700";
      case "profit": return "bg-green-100 text-green-700";
      case "subscription": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit": return <TrendingUp className="w-4 h-4" />;
      case "withdrawal": return <TrendingDown className="w-4 h-4" />;
      case "profit": return <DollarSign className="w-4 h-4" />;
      case "subscription": return <DollarSign className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const pendingWithdrawals = transactions.filter(tx => tx.type === "withdrawal" && tx.status === "pending");
  const completedToday = transactions.filter(tx => 
    tx.status === "completed" && 
    new Date(tx.date).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Volume</p>
                <p className="text-2xl font-bold text-gray-900">${totalVolume.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Withdrawals</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingWithdrawals.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">{completedToday}</p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Monitor and manage platform transactions</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by user or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  onClick={() => setFilterType("all")}
                  size="sm"
                >
                  All Types
                </Button>
                <Button
                  variant={filterType === "subscription" ? "default" : "outline"}
                  onClick={() => setFilterType("subscription")}
                  size="sm"
                >
                  Subscriptions
                </Button>
                <Button
                  variant={filterType === "withdrawal" ? "default" : "outline"}
                  onClick={() => setFilterType("withdrawal")}
                  size="sm"
                >
                  Withdrawals
                </Button>
                <Button
                  variant={filterType === "profit" ? "default" : "outline"}
                  onClick={() => setFilterType("profit")}
                  size="sm"
                >
                  Profits
                </Button>
              </div>
              
              <div className="border-l pl-2 flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  All Status
                </Button>
                <Button
                  variant={filterStatus === "completed" ? "default" : "outline"}
                  onClick={() => setFilterStatus("completed")}
                  size="sm"
                >
                  Completed
                </Button>
                <Button
                  variant={filterStatus === "pending" ? "default" : "outline"}
                  onClick={() => setFilterStatus("pending")}
                  size="sm"
                >
                  Pending
                </Button>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className={`border rounded-lg p-4 transition-all ${
                  tx.status === "pending" && tx.type === "withdrawal"
                    ? "border-yellow-300 bg-yellow-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(tx.type)}`}>
                      {getTypeIcon(tx.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{tx.userName}</h4>
                        <Badge className={getTypeColor(tx.type)}>
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(tx.status)}>
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{tx.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(tx.date).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        tx.type === "withdrawal" ? "text-red-600" : "text-green-600"
                      }`}>
                        {tx.type === "withdrawal" ? "-" : "+"}${tx.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">ID: {tx.id}</p>
                    </div>

                    {tx.status === "pending" && tx.type === "withdrawal" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRejectWithdrawal(tx.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveWithdrawal(tx.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
