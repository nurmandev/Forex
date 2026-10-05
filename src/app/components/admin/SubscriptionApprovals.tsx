import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check, X, Clock, User, Mail, Package, Server, Shield, Eye } from "lucide-react";
import { mockSubscriptionRequests, SubscriptionRequest } from "../../data/admin-auth";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";

export function SubscriptionApprovals() {
  const [requests, setRequests] = useState<SubscriptionRequest[]>(mockSubscriptionRequests);
  const [selectedRequest, setSelectedRequest] = useState<SubscriptionRequest | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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
            reviewedBy: "admin"
          } 
        : r
    ));
    const request = requests.find(r => r.id === requestId);
    toast.success(`Subscription for ${request?.userName} approved successfully!`);
    setShowDetailsModal(false);
  };

  const handleReject = (requestId: string) => {
    setRequests(requests.map(r => 
      r.id === requestId 
        ? { 
            ...r, 
            status: "rejected",
            reviewedAt: new Date().toISOString(),
            reviewedBy: "admin"
          } 
        : r
    ));
    const request = requests.find(r => r.id === requestId);
    toast.error(`Subscription for ${request?.userName} rejected.`);
    setShowDetailsModal(false);
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
      {/* Alert for Pending */}
      {pendingCount > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-900">Pending Approvals</p>
                <p className="text-sm text-yellow-700 mt-1">
                  You have {pendingCount} subscription request(s) awaiting your review.
                  Please verify MT4/MT5 credentials and approve or reject.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
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

      {/* Requests List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscription Requests</CardTitle>
              <CardDescription>Review and approve MT4/MT5 account connections</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filter Buttons */}
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

          {/* Requests */}
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
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
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
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Shield className="w-3 h-3" />
                      <span>Account Type</span>
                    </div>
                    <p className="font-semibold text-gray-900">{request.accountType}</p>
                    <p className="text-sm text-gray-600">{request.mt4Username}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Server className="w-3 h-3" />
                      <span>Server</span>
                    </div>
                    <p className="font-semibold text-gray-900">{request.mt4Server}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    <p>Submitted: {new Date(request.submittedAt).toLocaleString()}</p>
                    {request.reviewedAt && (
                      <p className="mt-1">
                        Reviewed: {new Date(request.reviewedAt).toLocaleString()} by {request.reviewedBy}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowDetailsModal(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
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
                          Approve
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
              <p className="text-gray-500">No subscription requests found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Subscription Request Details</DialogTitle>
            <DialogDescription>Review all information before approval</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              {/* User Information */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">User Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Name</Label>
                    <p className="font-medium text-gray-900">{selectedRequest.userName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Email</Label>
                    <p className="font-medium text-gray-900">{selectedRequest.userEmail}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">User ID</Label>
                    <p className="font-medium text-gray-900">{selectedRequest.userId}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Status</Label>
                    <Badge className={getStatusColor(selectedRequest.status)}>
                      {selectedRequest.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Plan Information */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Plan Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Plan Name</Label>
                    <p className="font-medium text-gray-900">{selectedRequest.planName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Investment Amount</Label>
                    <p className="font-medium text-gray-900">${selectedRequest.amount}</p>
                  </div>
                </div>
              </div>

              {/* MT4/MT5 Credentials */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">MT4/MT5 Account Details</h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-500">Account Type</Label>
                      <p className="font-medium text-gray-900">{selectedRequest.accountType}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Username/Login</Label>
                      <p className="font-medium text-gray-900">{selectedRequest.mt4Username}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-gray-500">Server</Label>
                      <p className="font-medium text-gray-900">{selectedRequest.mt4Server}</p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800">
                    <strong>Note:</strong> Password is encrypted and stored securely. Verify these credentials are valid before approval.
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Timeline</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Submitted:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(selectedRequest.submittedAt).toLocaleString()}
                    </span>
                  </div>
                  {selectedRequest.reviewedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Reviewed:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedRequest.reviewedAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {selectedRequest.reviewedBy && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Reviewed By:</span>
                      <span className="font-medium text-gray-900">{selectedRequest.reviewedBy}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {selectedRequest.status === "pending" && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowDetailsModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(selectedRequest.id)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject Subscription
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(selectedRequest.id)}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve Subscription
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
