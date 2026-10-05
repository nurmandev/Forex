export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "published" | "draft";
  showInHeader: boolean;
  showInFooter: boolean;
  footerColumn?: 1 | 2 | 3 | 4;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export const mockPages: CustomPage[] = [
  {
    id: "page-001",
    title: "Terms of Service",
    slug: "terms-of-service",
    content: `<h1>Terms of Service</h1>
<p>Last updated: ${new Date().toLocaleDateString()}</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing and using ForexAutomationService, you accept and agree to be bound by the terms and provision of this agreement.</p>

<h2>2. Trading Risks</h2>
<p>Forex trading involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results.</p>

<h2>3. Account Security</h2>
<p>You are responsible for maintaining the confidentiality of your account credentials. We use bank-level encryption to protect your data.</p>

<h2>4. Service Availability</h2>
<p>We strive to provide 99.9% uptime but do not guarantee uninterrupted service. Maintenance windows will be communicated in advance.</p>

<h2>5. Fees and Payments</h2>
<p>All subscription fees are clearly stated before purchase. Withdrawal requests are processed within 24-48 hours.</p>`,
    status: "published",
    showInHeader: false,
    showInFooter: true,
    footerColumn: 4,
    createdAt: "2024-10-01T10:00:00Z",
    updatedAt: "2024-11-01T14:30:00Z",
    author: "admin",
  },
  {
    id: "page-002",
    title: "Privacy Policy",
    slug: "privacy-policy",
    content: `<h1>Privacy Policy</h1>
<p>Effective date: ${new Date().toLocaleDateString()}</p>

<h2>Information We Collect</h2>
<p>We collect information you provide directly to us, including:</p>
<ul>
<li>Name and email address</li>
<li>MT4/MT5 account credentials (encrypted)</li>
<li>Payment information</li>
<li>Transaction history</li>
</ul>

<h2>How We Use Your Information</h2>
<p>We use the information we collect to:</p>
<ul>
<li>Provide and maintain our services</li>
<li>Process transactions</li>
<li>Send administrative information</li>
<li>Respond to customer service requests</li>
</ul>

<h2>Data Security</h2>
<p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

<h2>Third-Party Disclosure</h2>
<p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law.</p>`,
    status: "published",
    showInHeader: false,
    showInFooter: true,
    footerColumn: 4,
    createdAt: "2024-10-01T10:00:00Z",
    updatedAt: "2024-11-01T14:30:00Z",
    author: "admin",
  },
  {
    id: "page-003",
    title: "Help Center",
    slug: "help-center",
    content: `<h1>Help Center</h1>
<p>Welcome to our Help Center. Find answers to common questions below.</p>

<h2>Getting Started</h2>
<p><strong>Q: How do I create an account?</strong><br>
A: Click the "Login / Sign Up" button and select "Create Account". Fill in your details and verify your email.</p>

<p><strong>Q: What are the minimum requirements?</strong><br>
A: You need a valid MT4 or MT5 trading account and a minimum investment based on your chosen plan.</p>

<h2>Subscriptions</h2>
<p><strong>Q: How long does approval take?</strong><br>
A: Subscription approvals typically take 1-2 business hours after submission.</p>

<p><strong>Q: Can I upgrade my plan?</strong><br>
A: Yes, you can upgrade your plan at any time from your dashboard.</p>

<h2>Withdrawals</h2>
<p><strong>Q: When can I withdraw?</strong><br>
A: Withdrawals are available once you meet the minimum threshold for your plan.</p>

<p><strong>Q: How long do withdrawals take?</strong><br>
A: Withdrawal requests are processed within 24-48 hours.</p>

<h2>Contact Support</h2>
<p>Still have questions? <a href="/contact">Contact our support team</a> for personalized assistance.</p>`,
    status: "published",
    showInHeader: true,
    showInFooter: true,
    footerColumn: 3,
    createdAt: "2024-10-15T09:00:00Z",
    updatedAt: "2024-11-15T11:20:00Z",
    author: "admin",
  },
  {
    id: "page-004",
    title: "FAQ",
    slug: "faq",
    content: `<h1>Frequently Asked Questions</h1>

<h2>Account & Registration</h2>
<p><strong>How do I sign up?</strong><br>
Click the "Login / Sign Up" button and create your account with your email and password.</p>

<p><strong>Is my data secure?</strong><br>
Yes, we use military-grade encryption and never share your data with third parties.</p>

<h2>Plans & Pricing</h2>
<p><strong>What plans are available?</strong><br>
We offer Starter ($100), Professional ($200), and Premium ($500) plans with different profit rates.</p>

<p><strong>Can I cancel anytime?</strong><br>
Yes, but minimum duration requirements apply based on your plan.</p>

<h2>Trading</h2>
<p><strong>Do you trade manually?</strong><br>
No, we use advanced AI algorithms for automated trading.</p>

<p><strong>What are the risks?</strong><br>
Forex trading carries risk. While our system is optimized for profit, losses can occur.</p>`,
    status: "draft",
    showInHeader: true,
    showInFooter: false,
    createdAt: "2024-11-10T15:00:00Z",
    updatedAt: "2024-11-10T15:00:00Z",
    author: "admin",
  },
];
