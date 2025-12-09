import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Wallet } from "lucide-react"; // หรือ icon library ที่คุณใช้

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/completion", // แก้เป็น URL ของคุณ
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  // Option สำหรับปรับแต่งหน้าตาภายในของ Stripe Element
  const paymentElementOptions = {
    layout: "tabs", // ใช้ Tabs แทน Accordion จะดูคล้าย Mockup เดิมที่สุด
  };

  return (
    // 1. ใช้ Container นอกสุดจาก Mockup เดิม (bg-white, rounded-xl, border-slate-200)
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      {/* 2. Header พร้อม Icon */}
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Wallet className="text-indigo-600" size={24} /> Payment Method
      </h2>

      {/* 3. Form จะวางเรียบๆ ไม่มีกรอบซ้อนแล้ว */}
      <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Stripe UI: จะแสดง Tab เลือกบัตร/PromptPay ให้เองตรงนี้ */}
        <div className="min-h-[200px]">
          {" "}
          {/* กัน layout กระตุกตอนโหลด */}
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
        </div>

        {/* ปุ่ม Pay now แบบ Minimal */}
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              "Pay Now"
            )}
          </span>
        </button>

        {/* Error Message */}
        {message && (
          <div
            id="payment-message"
            className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center animate-fade-in"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
