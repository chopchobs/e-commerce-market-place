import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useEcomStore from "../../store/ecom-store";
import { payment } from "../../api/stripe";
import CheckoutForm from "../../components/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51ScTDSDvTcqo5clOrRxi5VhziZtYWjiFTQKBpI4Hzc6CuRixDTFUoMra8SgrRvH6woC4LowwvRhrggWCuHRSYAdh006PdYZbd1"
);

const Payment = () => {
  const token = useEcomStore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    payment(token) // APi Call
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.log(err));
  }, []);
  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <div>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default Payment;
