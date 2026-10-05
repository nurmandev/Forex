import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Edit, Trash2, Plus, DollarSign, TrendingUp, Users } from "lucide-react";
import { investmentPlans } from "../../data/plans";
import { InvestmentPlan } from "../../types";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

export function PlansManagement() {
  const [plans, setPlans] = useState<InvestmentPlan[]>(investmentPlans);
  const [editingPlan, setEditingPlan] = useState<InvestmentPlan | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: 0,
    dailyProfit: "",
    minDuration: 0,
    withdrawalLimit: 0,
    features: [] as string[],
  });

  const handleEdit = (plan: InvestmentPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      amount: plan.amount,
      dailyProfit: plan.dailyProfit,
      minDuration: plan.minDuration,
      withdrawalLimit: plan.withdrawalLimit,
      features: plan.features,
    });
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (editingPlan) {
      setPlans(plans.map(p => 
        p.id === editingPlan.id ? { ...p, ...formData } : p
      ));
      toast.success("Plan updated successfully!");
    }
    setShowEditModal(false);
    setEditingPlan(null);
  };

  const handleToggleActive = (planId: number) => {
    setPlans(plans.map(p => 
      p.id === planId ? { ...p, active: !p.active } : p
    ));
    const plan = plans.find(p => p.id === planId);
    toast.success(`Plan ${plan?.active ? 'deactivated' : 'activated'} successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Plans</p>
                <p className="text-2xl font-bold text-gray-900">{plans.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Plans</p>
                <p className="text-2xl font-bold text-green-600">
                  {plans.filter(p => p.active !== false).length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Subscribers</p>
                <p className="text-2xl font-bold text-blue-600">127</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Investment Plans</CardTitle>
              <CardDescription>Manage subscription plans and pricing</CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border-2 rounded-lg p-6 transition-all ${
                  plan.active === false
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-blue-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <Badge className={plan.active === false ? "bg-gray-500" : "bg-green-600"}>
                    {plan.active === false ? 'Inactive' : 'Active'}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">${plan.amount}</span>
                    <span className="text-gray-500">initial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-semibold text-green-600">{plan.dailyProfit}</span>
                    <span className="text-sm text-gray-500">daily profit</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min. Duration:</span>
                    <span className="font-medium text-gray-900">{plan.minDuration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min. Withdrawal:</span>
                    <span className="font-medium text-gray-900">${plan.withdrawalLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Features:</span>
                    <span className="font-medium text-gray-900">{plan.features.length}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEdit(plan)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant={plan.active === false ? "default" : "secondary"}
                    onClick={() => handleToggleActive(plan.id)}
                  >
                    {plan.active === false ? 'Activate' : 'Deactivate'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Plan: {editingPlan?.name}</DialogTitle>
            <DialogDescription>Update plan details and pricing</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="amount">Investment Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dailyProfit">Daily Profit</Label>
                <Input
                  id="dailyProfit"
                  value={formData.dailyProfit}
                  onChange={(e) => setFormData({ ...formData, dailyProfit: e.target.value })}
                  placeholder="e.g., $8-12"
                />
              </div>
              <div>
                <Label htmlFor="minDuration">Min. Duration (days)</Label>
                <Input
                  id="minDuration"
                  type="number"
                  value={formData.minDuration}
                  onChange={(e) => setFormData({ ...formData, minDuration: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="withdrawalLimit">Min. Withdrawal Amount ($)</Label>
              <Input
                id="withdrawalLimit"
                type="number"
                value={formData.withdrawalLimit}
                onChange={(e) => setFormData({ ...formData, withdrawalLimit: Number(e.target.value) })}
              />
            </div>

            <div>
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                rows={6}
                value={formData.features.join('\n')}
                onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n') })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  );
}
