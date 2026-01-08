import { AlertCircle, CheckCircle } from "lucide-react";

const PaymentBadge = ({ paymentStatus }) => {
  const isPaid = paymentStatus === "succeeded";
  if (isPaid) {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full mt-1 w-fit mx-auto">
        <CheckCircle size={10} />
        Paid
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full mt-1 w-fit mx-auto">
      <AlertCircle size={10} />
      Unpaid
    </span>
  );
};

export default PaymentBadge;
