import React, { useState } from "react";
import {
  CreditCard,
  QrCode,
  MapPin,
  Truck,
  ChevronLeft,
  Wallet,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store"; // (ถ้าจะดึงของจริงมาโชว์)

const CheckOut = () => {
  const navigate = useNavigate();
  // Mock Data (ถ้ายังไม่ได้ต่อ Store จริง)
  const cartTotal = 3680;
  const products = [
    {
      id: 1,
      title: "Basic Tee",
      price: 590,
      count: 2,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100",
    },
    {
      id: 2,
      title: "Urban Jacket",
      price: 2500,
      count: 1,
      image: "https://images.unsplash.com/photo-1551028919-ac6635f0e5c9?w=100",
    },
  ];

  // State สำหรับเลือกวิธีชำระเงิน
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' or 'qr'

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Button */}
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* --- LEFT COLUMN: Forms --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Shipping Address */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <MapPin className="text-indigo-600" /> Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="081-234-5678"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Address
                  </label>
                  <textarea
                    rows="3"
                    placeholder="123 Street, District, Province, Zip Code"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Wallet className="text-indigo-600" /> Payment Method
              </h2>

              {/* Selector Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center gap-2 py-4 rounded-lg border-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-100 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <CreditCard size={20} /> Credit/Debit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("qr")}
                  className={`flex items-center justify-center gap-2 py-4 rounded-lg border-2 transition-all ${
                    paymentMethod === "qr"
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-100 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <QrCode size={20} /> QR PromptPay
                </button>
              </div>

              {/* Conditional Content */}
              {paymentMethod === "card" ? (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300 animate-fade-in">
                  <QrCode size={48} className="mx-auto text-slate-400 mb-3" />
                  <p className="text-slate-500 text-sm">
                    QR Code will be generated after you place order.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN: Order Summary (Sticky) --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                Order Summary
              </h2>

              {/* Product List (Mini) */}
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {products.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-md overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-800 truncate">
                        {item.title}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-slate-500">
                          Qty: {item.count}
                        </span>
                        <span className="text-sm font-bold text-slate-700">
                          ฿{(item.price * item.count).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>฿{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-slate-800 font-bold text-lg pt-2">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    ฿{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 bg-slate-900 text-white py-3.5 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                Place Order
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Truck size={14} />
                <span>Free shipping on all orders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
