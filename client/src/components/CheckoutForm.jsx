import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../stripe.css"; // ตรวจสอบว่าไฟล์นี้มีอยู่จริง หรือถ้าไม่มีให้ลบออกได้ครับ
import useEcomStore from "../store/ecom-store";
import { saveUserOrder } from "../api/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ handleSaveAddress }) {
  const token = useEcomStore((state) => state.token);
  const clearCart = useEcomStore((state) => state.clearCart);

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // 1. Validate Address (Trigger Save from Parent)
    const isAddressSaved = await handleSaveAddress();
    if (!isAddressSaved) {
      // ถ้า Save ไม่ผ่าน (กรอกไม่ครบ) ให้หยุดและเตือน
      Swal.fire({
        icon: "warning",
        title: "Missing Address",
        text: "Please fill in your shipping address completely.",
        confirmButtonColor: "#4f46e5",
      });
      setIsLoading(false);
      return;
    }

    // 2. Stripe Confirm Payment
    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (payload.error) {
      setMessage(payload.error.message);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: payload.error.message,
      });
    } else if (payload.paymentIntent.status === "succeeded") {
      // 3. Save Order to Backend
      try {
        const res = await saveUserOrder(token, payload);
        console.log(res);
        clearCart();

        Swal.fire({
          icon: "success",
          title: "Payment Success",
          text: "Order placed successfully!",
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/user/history");
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: "Payment success but failed to save order.",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Payment Issue",
        text: "Payment processing failed.",
      });
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    // ✨ FIX 1: ลบ div wrapper สีขาวออก (bg-white, shadow, border)
    // เพราะ Parent component มีให้แล้ว จะได้ไม่เกิด Padding ซ้อนกัน
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      {/* ✨ FIX 2: ลบ Header <h2>Payment Method</h2> ออก เพราะหน้าหลักมีแล้ว */}

      {/* Stripe UI */}
      <div className="min-h-10">
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions}
          // เพิ่ม className เพื่อบังคับให้มันเต็มความกว้าง (ถ้าจำเป็น)
          className="w-full"
        />
      </div>

      {/* Button */}
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Processing...</span>
          </div>
        ) : (
          "Pay Now"
        )}
      </button>

      {/* Error Message */}
      {message && (
        <div
          id="payment-message"
          className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3"
        >
          <div className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <span className="text-sm font-medium text-red-800">{message}</span>
        </div>
      )}
    </form>
  );
}
