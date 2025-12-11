import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Wallet } from "lucide-react";
import "../stripe.css";
import useEcomStore from "../store/ecom-store";
import { saveUserOrder } from "../api/user";

export default function CheckoutForm({ address, handleSaveAddress }) {
  const stripe = useStripe();
  const elements = useElements();
  const token = useEcomStore((state) => state.token);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    // data - address
    const isAddressSaved = await handleSaveAddress();
    // validate
    if (!isAddressSaved) {
      return;
    } else {
      setIsLoading(true);
    }
    // start
    const payload = await stripe.confirmPayment({
      elements,

      redirect: "if_required",
    });
    // validate stripe
    if (payload.error) {
      setMessage(error.message);
    } else {
      // Create order - APi Call
      saveUserOrder(token, payload)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    }
    setIsLoading(false);
  };
  // Design
  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className=" bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 pb-5 flex items-center gap-2">
        <Wallet className="text-indigo-600 " size={24} /> Payment Method
      </h2>

      {/* Form */}
      <form id="payment-form" onSubmit={handleSubmit} className="stripe-form">
        {/* Stripe UI: จะแสดง Tab เลือกบัตร/PromptPay ให้เองตรงนี้ */}
        <div className="min-h-[200px]">
          {" "}
          {/* กัน layout กระตุกตอนโหลด */}
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
        </div>

        {/* Pay now - style Minimal */}
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {/* loading */}
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
