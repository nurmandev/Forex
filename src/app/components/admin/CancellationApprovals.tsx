import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check, X, Clock, User, Mail, Package, AlertCircle } from "lucide-react";
import { mockCancellationRequests, CancellationRequest, mockUsers } from "../../data/admin-auth";
import { demoUser } from "../../data/auth";
import { toast } from "sonner";

export function CancellationApprovals() {
  const [requests, setRequests] = useState<CancellationRequest[]>(mockCancellationRequests);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const filteredRequests = requests.filter(req =>
    filterStatus === "all" || req.status === filterStatus
  );

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(r =>
      r.id === requestId
        ? {
            ...r,
            status: "approved",
            reviewedAt: new Date().toISOString(),
            reviewedBy: "admin",
          }
        : r
    ));
    const request = requests.find(r => r.id === requestId);
    // Cancel subscription in admin mock user store
    if (request) {
      const managedUser = mockUsers.find(u => u.email === request.userEmail);
      if (managedUser?.subscription) {
        managedUser.subscription.status = "cancelled";
        managedUser.subscription = undefined;
      }
      // Cancel matching plan in demo user subscriptions (keeps user dashboard in sync)
      if (demoUser.email === request.userEmail && demoUser.subscriptions) {
        demoUser.subscriptions = demoUser.subscriptions.map(s =>
          s.planId === request.planId ? { ...s, status: "cancelled" } : s
        );
      }
    }
    toast.success(`Plan cancellation for ${request?.userName} approved. Plan cancelled.`);
  };

  const handleReject = (requestId: string) => {
    setRequests(requests.map(r =>
      r.id === requestId
        ? {
            ...r,
            status: "rejected",
            reviewedAt: new Date().toISOString(),
            reviewedBy: "admin",
          }
        : r
    ));
    const request = requests.find(r => r.id === requestId);
    toast.error(`Cancellation request for ${request?.userName} rejected.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const pendingCount = requests.filter(r => r.status === "pending").length;

  return (
    <div className="space-y-6">
      {pendingCount > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-900">Pending Cancellations</p>
                <p className="text-sm text-yellow-700 mt-1">
                  You have {pendingCount} plan cancellation request(s) awaiting your review.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {requests.filter(r => r.status === "approved").length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {requests.filter(r => r.status === "rejected").length}
                </p>
              </div>
              <X className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Cancellation Requests</CardTitle>
              <CardDescription>Review and approve/reject plan cancellations</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              size="sm"
            >
              All ({requests.length})
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => setFilterStatus("pending")}
              size="sm"
            >
              Pending ({pendingCount})
            </Button>
            <Button
              variant={filterStatus === "approved" ? "default" : "outline"}
              onClick={() => setFilterStatus("approved")}
              size="sm"
            >
              Approved ({requests.filter(r => r.status === "approved").length})
            </Button>
            <Button
              variant={filterStatus === "rejected" ? "default" : "outline"}
              onClick={() => setFilterStatus("rejected")}
              size="sm"
            >
              Rejected ({requests.filter(r => r.status === "rejected").length})
            </Button>
          </div>

          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className={`border-2 rounded-lg p-5 transition-all ${
                  request.status === "pending"
                    ? "border-yellow-300 bg-yellow-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{request.userName}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="w-3 h-3" />
                        <span>{request.userEmail}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Package className="w-3 h-3" />
                      <span>Plan</span>
                    </div>
                    <p className="font-semibold text-gray-900">{request.planName}</p>
                    <p className="text-sm text-gray-600">${request.amount}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Requested</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Result</span>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {request.status === "approved" ? "Cancelled" : request.status === "rejected" ? "Kept Active" : "Pending"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    <p>Requested: {new Date(request.requestedAt).toLocaleString()}</p>
                    {request.reviewedAt && (
                      <p className="mt-1">
                        Reviewed: {new Date(request.reviewedAt).toLocaleString()} by {request.reviewedBy}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {request.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(request.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(request.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No cancellation requests found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
