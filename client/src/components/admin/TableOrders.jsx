import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import {
  deleteOrder,
  getOrdersAdmin,
  updateOrderStatus,
} from "../../api/admin";
import {
  CheckCircle,
  Clock,
  Eye,
  Package,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { numberFormat } from "../utility/number";
import date from "../utility/date";
import PaymentBadge from "./PaymentBadge";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  //   console.log("Token in TableOrders:", token);
  useEffect(() => {
    hdlGetOrders(token); // fetch orders on mount
  }, []);
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // function to open modal and set selected order
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  // function to fetch orders
  const hdlGetOrders = async (token) => {
    getOrdersAdmin(token) // api call
      .then((res) => {
        console.log("Orders fetched:", res.data.ListOrders);
        setOrders(res.data.ListOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };
  // function to update order status
  const hldUpdateStatus = async (token, orderId, orderStatus) => {
    updateOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log("Order status updated:", res.data.OrderUpdate);
        hdlGetOrders(token); // refresh orders
        Swal.fire({
          icon: "success",
          title: "Order Status Updated",
          text: `Order #${orderId} status changed to ${orderStatus}`,
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };
  // function to delete order
  const hldDeleteOrder = async (token, orderId) => {
    deleteOrder(token, orderId)
      .then((res) => {
        console.log("Order deleted:", res.data.message);
        hdlGetOrders(token); // refresh orders
        Swal.fire({
          icon: "success",
          title: "Order Deleted",
          text: `Order #${orderId} has been deleted.`,
          timer: 4000,
          showCancelButton: false,
        });
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };
  // Status
  const StatusBadge = ({ status }) => {
    let styles = "bg-slate-100 text-slate-600";
    let icon = <Clock size={14} />;
    switch (status) {
      case "Completed":
      case "Delivered":
        styles = "bg-emerald-100 text-emerald-700 border border-emerald-200";
        icon = <CheckCircle size={14} />;
        break;
      case "Processing":
        styles = "bg-indigo-100 text-indigo-700 border border-indigo-200";
        icon = <Package size={14} />;
        break;
      case "Cancelled":
        styles = "bg-red-50 text-red-600 border border-red-200";
        icon = <XCircle size={14} />;
        break;
      case "Not Process": // Case Default
        styles = "bg-slate-200 text-slate-800";
        icon = <Clock size={14} />;
        break;
    }
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles}`}
      >
        {icon} {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden font-sans">
      {/* --Toolbar: Search & Filter */}
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800">Recent Orders</h2>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search order ID or customer ..."
            className="w-full pl-10 pr-4 border border-slate-200 rounded-xl focus:outline-none
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
          <Search className="absolute left-3 top-1 text-slate-400" size={18} />
        </div>
      </div>
      {/* -- Table -- */}
      <div className="overflow-x-auto ">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4 text-center">Customer</th>
              <th className="px-6 py-4 text-center">Total & Payment</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {orders?.map((order) => {
              return (
                <tr
                  key={order.id}
                  className="hover:bg-indigo-50/30 transition-colors duration-150 group"
                >
                  {/* 1.Order Info */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-700">#{order.id}</div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Clock size={10} />
                      {date(order.createdAt)}
                    </div>
                  </td>
                  {/* 2.Customer */}
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500 text-center">
                      {order.orderedBy.name}
                    </div>
                    <div className="text-xs text-slate-500 text-center">
                      {order.orderedBy.email}
                    </div>
                    <div className="text-xs text-slate-500 text-center">
                      {order.orderedBy.address}
                    </div>
                  </td>
                  {/* 3.Amount & method */}
                  <td className="px-6 py-4 text-center">
                    <div className="text-xs font-bold text-slate-800 ">
                      {/* Amount */}฿{numberFormat(order.cartTotal)} THB
                    </div>
                    {/* Payment Method */}
                    <div className="text-xs text-slate-600 mt-1">
                      via: {order.stripePaymentId}
                      <PaymentBadge paymentStatus={order.status} />
                    </div>
                  </td>
                  {/* 4. Status Column */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-2 items-center">
                      {/* Badge แสดงสถานะปัจจุบัน */}
                      <StatusBadge status={order.orderStatus} />

                      {/* ✅ แก้ 2: แยก Select ออกมาข้างนอก และใส่ value={order.orderStatus} */}
                      <select
                        value={order.orderStatus} // ควบคุมค่าให้ตรงกับ State ปัจจุบัน
                        onChange={(e) =>
                          hldUpdateStatus(token, order.id, e.target.value)
                        }
                        className="text-xs border border-slate-200 rounded bg-white text-slate-500 hover:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer p-1 mt-1 transition-colors"
                      >
                        <option value="Not Process">Not Process</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </td>
                  {/* 5.Actions */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="p-2 rounded-lg text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => hldDeleteOrder(token, order.id)}
                        className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Empty State */}
        {orders.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No orders found.
          </div>
        )}
      </div>
      {/* ---  Modal --- */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 fade-in">
          {/* Modal Box */}
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                Order Detail #{selectedOrder.id}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-red-500"
              >
                <XCircle size={24} />
              </button>
            </div>

            {/* Body  */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Customer</p>
                  <p className="font-medium">{selectedOrder.orderedBy.name}</p>
                  <p className="font-medium">{selectedOrder.orderedBy.email}</p>
                  <p className="text-sm text-slate-600">
                    {selectedOrder.orderedBy.address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-indigo-600">
                    ฿{numberFormat(selectedOrder.cartTotal)}
                  </p>
                </div>
              </div>

              {/* รายการสินค้า */}
              <div className="space-y-3">
                {selectedOrder.products?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-slate-50 p-3 rounded-lg"
                  >
                    <span className="font-medium text-slate-700">
                      {item.product.title}
                    </span>
                    <span className="text-slate-500 text-sm">
                      x {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* --- Footer / Pagination --- */}
      <div className="p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
        <span>Showing 1-10 of 50 orders</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">
            Prev
          </button>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default TableOrders;
