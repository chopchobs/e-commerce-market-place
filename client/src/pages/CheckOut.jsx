import React, { useState, useEffect } from "react";
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
import { listUserCart } from "../api/user";

const CheckOut = () => {
  const token = useEcomStore((state) => state.token);
  const navigate = useNavigate();
  const actionTotalPrice = useEcomStore((state) => state.actionTotalPrice);
  const cart = useEcomStore((state) => state.carts);
  // State สำหรับเลือกวิธีชำระเงิน \ 'card' or 'qr'
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (token) {
      hldGetUserCart(token);
    }
  }, [token]);
  const hldGetUserCart = async (token) => {
    try {
      const res = await listUserCart(token);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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

              {/* 1. Product List (Mini Scroller) */}
              <div className="space-y-4 mb-6 max-h-320px overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start group">
                    {/* Image with nice border */}
                    <div className="w-16 h-16 bg-white rounded-lg border border-slate-200 overflow-hidden shrink-0 p-1">
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0].url
                            : "https://placehold.co/100x100?text=No+Image"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    {/* Text Info */}
                    <div className="flex-1 min-w-0">
                      {" "}
                      {/* min-w-0 ช่วยให้ truncate ทำงาน */}
                      <h4 className="text-sm font-semibold text-slate-800 truncate pr-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 mb-1">
                        Category: {item.category?.name || "-"}
                      </p>
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          Qty: {item.count}
                        </span>
                        <span className="text-sm font-bold text-indigo-600">
                          ฿{(item.price * item.count).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 my-4"></div>

              {/* 2. Totals Calculation */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-700">
                    ฿{actionTotalPrice().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>VAT (7%)</span>
                  {/* สมมติคำนวณ VAT ให้ดู (หรือจะใส่เป็น logic จริงก็ได้) */}
                  <span className="font-medium text-slate-700">
                    ฿{(actionTotalPrice() * 0.07).toLocaleString()}
                  </span>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100">
                  <span className="text-base font-bold text-slate-800">
                    Total
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-indigo-600">
                      ฿{(actionTotalPrice() * 1.07).toLocaleString()}
                    </span>
                    <p className="text-[10px] text-slate-400 font-normal">
                      Included all taxes
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Place Order Button */}
              <button
                onClick={hldGetUserCart}
                className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-slate-200 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                Place Order
              </button>

              {/* Trust Signal */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Secure SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
