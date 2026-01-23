import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useEcomStore from "../../store/ecom-store";
// Import Component
import CheckoutForm from "../../components/CheckoutForm";
import { payment } from "../../api/stripe"; // APi call
// Stripe Key
const stripePromise = loadStripe(
  "pk_test_51ScTDSDvTcqo5clOrRxi5VhziZtYWjiFTQKBpI4Hzc6CuRixDTFUoMra8SgrRvH6woC4LowwvRhrggWCuHRSYAdh006PdYZbd1",
);

const Payment = ({ address, handleSaveAddress }) => {
  const [clientSecret, setClientSecret] = useState("");
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    payment(token) // APi Call
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.log(err));
  }, []);

  const appearance = {
    theme: "stripe",
    labels: "floating",
  };
  const option = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {/* Check for clientSecret that have or not */}
      {clientSecret && (
        <Elements options={option} stripe={stripePromise}>
          <CheckoutForm
            address={address}
            handleSaveAddress={handleSaveAddress}
          />
        </Elements>
      )}
    </div>
  );
};
export default Payment;
