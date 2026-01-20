import React from "react";
import {
  CreditCard,
  CheckCircle,
  Clock,
  Download,
  Zap,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const BillingPage = () => {
  // Mock Data: ประวัติการชำระเงิน
  const invoices = [
    { id: "INV-001", date: "Oct 24, 2025", amount: "$29.00", status: "Paid" },
    { id: "INV-002", date: "Sep 24, 2025", amount: "$29.00", status: "Paid" },
    { id: "INV-003", date: "Aug 24, 2025", amount: "$29.00", status: "Paid" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Billing & Plans</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your plan and payment details
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section 1: Current Plan (กินพื้นที่ 2 ส่วน) */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-xl inline-flex">
                  <Zap className="text-blue-600" size={24} />
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Active
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-800">Pro Plan</h2>
              <p className="text-gray-500 text-sm mt-1">
                Billed monthly. Next payment on{" "}
                <span className="font-medium text-gray-800">Nov 24, 2025</span>.
              </p>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Storage Used</span>
                  <span className="font-medium text-gray-900">75%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gray-900 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">15GB of 20GB used</p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-all shadow-md active:scale-95">
                Upgrade Plan
              </button>
              <button className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>

          {/* Section 2: Payment Method (Visual Card) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-800">Payment Method</h3>
              <button className="text-xs text-blue-600 font-medium hover:underline">
                Edit
              </button>
            </div>

            {/* Card Mockup */}
            <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

              <div className="flex justify-between items-start mb-8">
                <CreditCard className="text-white/80" size={24} />
                <span className="font-mono text-sm tracking-wider opacity-60">
                  VISA
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-white/50 uppercase tracking-wide">
                  Card Number
                </p>
                <div className="flex gap-2 items-center font-mono text-lg tracking-widest">
                  <span>••••</span>
                  <span>••••</span>
                  <span>••••</span>
                  <span>4242</span>
                </div>
              </div>

              <div className="flex justify-between items-end mt-6">
                <div>
                  <p className="text-xs text-white/50 uppercase">Expiry</p>
                  <p className="font-mono text-sm">12/28</p>
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase text-right">
                    CVC
                  </p>
                  <p className="font-mono text-sm text-right">•••</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center flex items-center justify-center gap-1">
              <ShieldIcon size={12} /> Secure 256-bit SSL encrypted
            </p>
          </div>
        </div>

        {/* Section 3: Billing History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-semibold text-gray-800">Billing History</h3>
            <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
              Download All <Download size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-gray-500 uppercase border-b border-gray-50">
                  <th className="px-6 py-4 font-medium">Invoice</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <CheckCircle size={12} />
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer of Table (Pagination mockup) */}
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 text-xs text-gray-500 flex justify-center">
            Showing latest 3 invoices
          </div>
        </div>
      </div>
    </div>
  );
};

// ไอคอนเสริม (Helper Component)
const ShieldIcon = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default BillingPage;
