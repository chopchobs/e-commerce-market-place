import { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { getOrders } from "../../api/user";
import {
  Package,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import numberFormat from "../utility/number";
// loop orders
// loop products in orders

const HistoryCard = () => {
  // token
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]); // state keep orders

  useEffect(() => {
    hldGetOrders(token);
  }, []);

  // function for fetch orders
  const hldGetOrders = async (token) => {
    getOrders(token) // api call
      .then((res) => {
        setOrders(res.data.ListUserOrders);
        console.log("Orders fetched:", res.data.ListUserOrders);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  };
  // color and icon based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return {
          badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
          icon: <CheckCircle size={16} />,
        };
      case "Delivered":
        return {
          badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
          icon: <CheckCircle size={16} />,
        };
      case "Processing":
        return {
          badge: "bg-indigo-100 text-indigo-700 border border-indigo-200",
          icon: <CheckCircle size={16} />,
        };
      case "Cancelled":
        return { badge: "bg-red-50 text-red-900", icon: <XCircle size={16} /> };
      default:
        return {
          badge: "bg-slate-200 text-slate-800",
          icon: <Clock size={16} />,
        }; // Default icon
    }
  };

  return (
    // Order List
    <div className="space-y-6">
      {orders?.map((order) => {
        const statusStyle = getStatusStyle(order.orderStatus);
        return (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 group"
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Package className="text-indigo-600" size={20} />
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Placed on {/* Date on product */}
                    {order.updatedAt
                      ? new Date(order.updatedAt).toLocaleDateString("th-TH")
                      : "Date N/A"}
                  </p>
                </div>
                {/* Status Badge */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${statusStyle.badge}`}
                >
                  {statusStyle.icon}
                  <span>{order.orderStatus || "Pending"}</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-slate-100 pt-6">
                {/* Product in Cart */}
                <div>
                  <div className="flex -space-x-3">
                    {order.products?.map((item, idx) => (
                      // console.log("Product in order:", item),
                      <div
                        key={idx}
                        className="w-12 h-12 rounded-lg border-2 border-white shadow-sm bg-slate-200 overflow-hidden flex items-center justify-center"
                      >
                        {/* Name Product */}
                        <span className="text-[10px] text-slate-500 font-bold">
                          {item.product?.title?.slice(0, 3) || "?"}
                        </span>
                      </div>
                    ))}
                    {/* Empty Products  */}
                    {(!order.products || order.products.length === 0) && (
                      <div className="text-xs text-slate-400">No items</div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {/* Total Amount */}
                  <p className="text-sm text-slate-500 mb-1">Total Amount</p>
                  <p className="text-2xl font-black text-slate-900">
                    ฿{numberFormat(Number(order.cartTotal))}
                  </p>
                </div>
              </div>
            </div>
            {/* Food Bar   */}
            <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-200 group-hover:bg-indigo-50/50 transition-colors">
              <span className="text-sm text-slate-500">
                Need help with this order?
              </span>
              <Link
                to={`/user/order/${order.id}`}
                className="text-indigo-600 hover:text-indigo-700 font-bold text-sm flex items-center gap-1 transition-colors"
              >
                View Order Details
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryCard;
