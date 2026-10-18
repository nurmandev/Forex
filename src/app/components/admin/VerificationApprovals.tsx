import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check, X, Clock, User, Mail, Globe, CheckCircle2, Eye, MapPin, CreditCard } from "lucide-react";
import { mockVerificationRequests, VerificationRequest } from "../../data/admin-auth";
import { demoUser } from "../../data/auth";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";

export function VerificationApprovals() {
  const [requests, setRequests] = useState<VerificationRequest[]>(mockVerificationRequests);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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
    const approvedRequest = mockVerificationRequests.find(r => r.id === requestId);
    if (approvedRequest) {
      mockVerificationRequests[
        mockVerificationRequests.findIndex(r => r.id === requestId)
      ] = {
        ...approvedRequest,
        status: "approved",
        reviewedAt: new Date().toISOString(),
        reviewedBy: "admin",
      };
    }
    if (request && demoUser.email === request.userEmail) {
      demoUser.verified = true;
    }
    toast.success(`Verification for ${request?.userName} approved.`);
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
    const rejectedRequest = mockVerificationRequests.find(r => r.id === requestId);
    if (rejectedRequest) {
      mockVerificationRequests[
        mockVerificationRequests.findIndex(r => r.id === requestId)
      ] = {
        ...rejectedRequest,
        status: "rejected",
        reviewedAt: new Date().toISOString(),
        reviewedBy: "admin",
      };
    }
    toast.error(`Verification for ${request?.userName} rejected.`);
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
                <p className="font-medium text-yellow-900">Pending Verifications</p>
                <p className="text-sm text-yellow-700 mt-1">
                  You have {pendingCount} verification request(s) awaiting your review.
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
              <CardTitle>Verification Requests</CardTitle>
              <CardDescription>Review KYC verification submissions</CardDescription>
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
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="font-semibold text-gray-900">{request.fullName || "—"}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Globe className="w-3 h-3" />
                      <span>Country</span>
                    </div>
                    <p className="font-semibold text-gray-900">{request.country || "—"}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">ID Type</p>
                    <p className="font-semibold text-gray-900">{request.idType || "—"}</p>
                    <p className="text-sm text-gray-600">{request.idNumber || ""}</p>
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
                    {request.status === "approved" && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No verification requests found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Verification Request Details</DialogTitle>
            <DialogDescription>Review all submitted user information</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><Label className="text-gray-500">Full Name</Label><p className="font-medium text-gray-900">{selectedRequest.fullName || "—"}</p></div>
                <div><Label className="text-gray-500">Email</Label><p className="font-medium text-gray-900">{selectedRequest.email || selectedRequest.userEmail}</p></div>
                <div><Label className="text-gray-500">Phone</Label><p className="font-medium text-gray-900">{selectedRequest.phone || "—"}</p></div>
                <div><Label className="text-gray-500">Date of Birth</Label><p className="font-medium text-gray-900">{selectedRequest.dob || "—"}</p></div>
                <div><Label className="text-gray-500">Nationality</Label><p className="font-medium text-gray-900">{selectedRequest.nationality || "—"}</p></div>
                <div><Label className="text-gray-500">Occupation</Label><p className="font-medium text-gray-900">{selectedRequest.occupation || "—"}</p></div>
                <div className="col-span-2"><Label className="text-gray-500">Address</Label><p className="font-medium text-gray-900">{[selectedRequest.address, selectedRequest.city, selectedRequest.state, selectedRequest.postcode, selectedRequest.country].filter(Boolean).join(", ") || "—"}</p></div>
                <div><Label className="text-gray-500">ID Type</Label><p className="font-medium text-gray-900">{selectedRequest.idType || "—"}</p></div>
                <div><Label className="text-gray-500">ID Number</Label><p className="font-medium text-gray-900">{selectedRequest.idNumber || "—"}</p></div>
                <div><Label className="text-gray-500">Source of Funds</Label><p className="font-medium text-gray-900">{selectedRequest.sourceOfFunds || "—"}</p></div>
                <div><Label className="text-gray-500">Submitted</Label><p className="font-medium text-gray-900">{new Date(selectedRequest.submittedAt).toLocaleString()}</p></div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                  Close
                </Button>
                {selectedRequest.status === "pending" && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => { handleReject(selectedRequest.id); setShowDetailsModal(false); }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => { handleApprove(selectedRequest.id); setShowDetailsModal(false); }}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
