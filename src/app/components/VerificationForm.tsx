import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Globe,
  ChevronLeft,
  CheckCircle2,
  Upload,
  TrendingUp,
} from "lucide-react";
import { AuthUser } from "../data/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface VerificationFormProps {
  user: AuthUser | null;
  onComplete: () => void;
  onBack: () => void;
  onSubmit?: (formData: any) => void;
}

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Netherlands", "Singapore", "UAE", "South Africa",
  "Nigeria", "Kenya", "India", "Pakistan", "Bangladesh", "Other",
];

const idTypes = [
  "National ID Card",
  "Passport",
  "Driver's License",
  "Voter's Card",
  "Residence Permit",
];

const steps = ["Personal Info", "Address", "Identity", "Review"];

export function VerificationForm({ user, onComplete, onBack, onSubmit }: VerificationFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
    dob: "",
    nationality: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    idType: "",
    idNumber: "",
    occupation: "",
    sourceOfFunds: "",
  });

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    if (onSubmit) onSubmit(form);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1200);
  };

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900">forexautomationservice</span>
        </div>
      </header>

      <div className="flex-1 flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-lg">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Account Verification</h1>
            <p className="text-sm text-gray-500">Complete KYC to unlock full platform access</p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-0 mb-8">
            {steps.map((label, i) => {
              const num = i + 1;
              const done = step > num;
              const active = step === num;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      done ? "bg-green-500 text-white" :
                      active ? "bg-blue-600 text-white" :
                      "bg-gray-200 text-gray-500"
                    }`}>
                      {done ? <CheckCircle2 className="w-4 h-4" /> : num}
                    </div>
                    <span className={`text-xs font-medium whitespace-nowrap ${active ? "text-blue-600" : "text-gray-400"}`}>
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mb-5 mx-1 ${step > num ? "bg-green-400" : "bg-gray-200"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            {/* Step 1 — Personal Info */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-600">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        value={form.firstName}
                        onChange={e => set("firstName", e.target.value)}
                        placeholder="John"
                        className="pl-9 h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-600">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        value={form.lastName}
                        onChange={e => set("lastName", e.target.value)}
                        placeholder="Doe"
                        className="pl-9 h-11"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      value={form.email}
                      onChange={e => set("email", e.target.value)}
                      placeholder="your@email.com"
                      className="pl-9 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={e => set("phone", e.target.value)}
                      placeholder="+1 234 567 8900"
                      className="pl-9 h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-600">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="date"
                        value={form.dob}
                        onChange={e => set("dob", e.target.value)}
                        className="pl-9 h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-600">Nationality</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                      <select
                        value={form.nationality}
                        onChange={e => set("nationality", e.target.value)}
                        className="w-full pl-9 pr-3 h-11 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      >
                        <option value="">Select</option>
                        {countries.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">Occupation</Label>
                  <Input
                    value={form.occupation}
                    onChange={e => set("occupation", e.target.value)}
                    placeholder="e.g. Software Engineer, Trader, Business Owner"
                    className="h-11"
                  />
                </div>
              </div>
            )}

            {/* Step 2 — Address */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Residential Address</h2>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">Street Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={form.address}
                      onChange={e => set("address", e.target.value)}
                      placeholder="123 Main Street"
                      className="pl-9 h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-600">City</Label>
                    <Input
                      value={form.city}
                      onChange={e => set("city", e.target.value)}
                      placeholder="New York"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-600">State / Region</Label>
                    <Input
                      value={form.state}
                      onChange={e => set("state", e.target.value)}
                      placeholder="New York"
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-600">Postcode / ZIP</Label>
                    <Input
                      value={form.postcode}
                      onChange={e => set("postcode", e.target.value)}
                      placeholder="10001"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-600">Country</Label>
                    <select
                      value={form.country}
                      onChange={e => set("country", e.target.value)}
                      className="w-full px-3 h-11 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="">Select country</option>
                      {countries.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 — Identity */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Identity Verification</h2>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">ID Type</Label>
                  <select
                    value={form.idType}
                    onChange={e => set("idType", e.target.value)}
                    className="w-full px-3 h-11 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">Select document type</option>
                    {idTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">ID Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={form.idNumber}
                      onChange={e => set("idNumber", e.target.value)}
                      placeholder="Enter your ID number"
                      className="pl-9 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">Source of Funds</Label>
                  <select
                    value={form.sourceOfFunds}
                    onChange={e => set("sourceOfFunds", e.target.value)}
                    className="w-full px-3 h-11 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">Select source</option>
                    {["Salary / Employment", "Business Income", "Savings", "Investments", "Inheritance", "Other"].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Upload placeholder */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">Upload ID Document</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF — max 10MB</p>
                  </div>
                  <p className="text-xs text-gray-400">Note: You can upload your document later from your profile settings.</p>
                </div>
              </div>
            )}

            {/* Step 4 — Review */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Review & Submit</h2>

                <div className="space-y-3">
                  {[
                    { label: "Full Name", value: `${form.firstName} ${form.lastName}`.trim() || "—" },
                    { label: "Email", value: form.email || "—" },
                    { label: "Phone", value: form.phone || "—" },
                    { label: "Date of Birth", value: form.dob || "—" },
                    { label: "Nationality", value: form.nationality || "—" },
                    { label: "Occupation", value: form.occupation || "—" },
                    { label: "Address", value: [form.address, form.city, form.country].filter(Boolean).join(", ") || "—" },
                    { label: "ID Type", value: form.idType || "—" },
                    { label: "ID Number", value: form.idNumber || "—" },
                    { label: "Source of Funds", value: form.sourceOfFunds || "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
                      <span className="text-xs text-gray-500 w-36 flex-shrink-0">{label}</span>
                      <span className="text-sm text-gray-900 text-right">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-2">
                  <p className="text-xs text-blue-800">
                    By submitting this form, you confirm that all information provided is accurate and complete.
                    Providing false information may result in account suspension.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(s => s - 1)} className="flex-1">
                  Back
                </Button>
              )}
              {step < 4 ? (
                <Button
                  onClick={() => setStep(s => s + 1)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Submitting…" : "Submit Verification"}
                </Button>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Your data is encrypted and stored securely. We comply with GDPR and international data protection standards.
          </p>
        </div>
      </div>
    </div>
  );
}
