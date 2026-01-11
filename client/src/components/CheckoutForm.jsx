import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Wallet } from "lucide-react";
import "../stripe.css";
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
  // function submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    // data - address
    const isAddressSaved = await handleSaveAddress();
    // validate - address
    if (!isAddressSaved) {
      setIsLoading(false);
      return;
    }
    // 2. Paid Credit Card with Stripe (start)
    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    // validate stripe - error
    if (payload.error) {
      setMessage(payload.error.message);
      console.log("error", payload.error.message);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: payload.error.message,
      });
    } else if (payload.paymentIntent.status === "succeeded") {
      // ✅ succeeded -> Record Order to Backend
      console.log("Ready or SaveOrder");
      // // Create order - APi Call
      saveUserOrder(token, payload)
        .then((res) => {
          console.log(res);
          clearCart(); // clear
          Swal.fire({
            icon: "success",
            title: "Payment Success",
            text: "Order placed successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/user/history");
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Order Failed",
            text: "Payment success but failed to save order.",
          });
        });
    } else {
      console.log("Something Wrong!!!");
      Swal.fire({
        icon: "warning",
        title: "Payment Failed",
        text: "Payment failed .",
      });
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
