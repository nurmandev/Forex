import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Search, MoreVertical, UserX, UserCheck, Mail, Calendar, DollarSign, Shield } from "lucide-react";
import { mockUsers, UserManagement } from "../../data/admin-auth";
import { toast } from "sonner";

export function UsersManagement() {
  const [users, setUsers] = useState<UserManagement[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "pending" | "suspended">("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u
    ));
    const user = users.find(u => u.id === userId);
    toast.success(`User ${user?.name} ${user?.status === "suspended" ? "activated" : "suspended"} successfully`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "suspended": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.status === "active").length}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {users.filter(u => u.status === "pending").length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Suspended</p>
                <p className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.status === "suspended").length}
                </p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage and monitor user accounts</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                onClick={() => setFilterStatus("active")}
                size="sm"
              >
                Active
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                onClick={() => setFilterStatus("pending")}
                size="sm"
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "suspended" ? "default" : "outline"}
                onClick={() => setFilterStatus("suspended")}
                size="sm"
              >
                Suspended
              </Button>
            </div>
          </div>

          {/* Users List */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Join Date</p>
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Total Earned</p>
                        <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                          <DollarSign className="w-3 h-3" />
                          <span>${user.totalEarned.toFixed(2)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Wallet Balance</p>
                        <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                          <DollarSign className="w-3 h-3" />
                          <span>${user.walletBalance.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {user.subscription && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Current Subscription</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            {user.subscription.planName} - ${user.subscription.amount}
                          </span>
                          <Badge className={getStatusColor(user.subscription.status)}>
                            {user.subscription.status}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant={user.status === "suspended" ? "default" : "destructive"}
                      onClick={() => handleSuspendUser(user.id)}
                    >
                      {user.status === "suspended" ? (
                        <>
                          <UserCheck className="w-4 h-4 mr-1" />
                          Activate
                        </>
                      ) : (
                        <>
                          <UserX className="w-4 h-4 mr-1" />
                          Suspend
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
