import React, { useEffect, useState } from "react";
// Components & Icons
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
// Store & Utils
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../utility/number";
import date from "../utility/date";
import { getOrdersAdmin, listUsers } from "../../api/admin";

// component
const FormDashboard = () => {
  // zustand
  const token = useEcomStore((state) => state.token);
  const products = useEcomStore((state) => state.products);
  const listProduct = useEcomStore((state) => state.listProduct);
  // keep data by state
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  // --- Mock Data  ---
  const revenueData = [
    { name: "Mon", total: 4000 },
    { name: "Tue", total: 3000 },
    { name: "Wed", total: 5000 },
    { name: "Thu", total: 2780 },
    { name: "Fri", total: 6890 },
    { name: "Sat", total: 8390 },
    { name: "Sun", total: 10490 },
  ];
  // color status
  const statusData = [
    { name: "Completed", value: 45, color: "#10b981" }, // Emerald
    { name: "Processing", value: 25, color: "#6366f1" }, // Indigo
    { name: "Cancelled", value: 10, color: "#ef4444" }, // Red
    { name: "Pending", value: 20, color: "#f59e0b" }, // Amber
  ];
  // follow (Products,Orders & Calculate Stats, Users, Products Count)
  useEffect(() => {
    //  Products
    listProduct(100);

    //  Orders & Calculate Stats
    getOrdersAdmin(token).then((res) => {
      const orders = res.data.ListOrders;
      const totalRev = orders.reduce((acc, item) => acc + item.cartTotal, 0);
      setStats((prev) => ({
        ...prev,
        totalOrders: orders.length,
        totalRevenue: totalRev,
      }));
      setRecentOrders(orders.slice(0, 10)); // list 10 items
    });

    // Load Users
    listUsers(token).then((res) => {
      setStats((prev) => ({ ...prev, totalUsers: res.data.users.length }));
    });
  }, [token, listProduct]); // เพิ่ม dependency เพื่อความถูกต้อง

  // Sync Products Count 🔢
  useEffect(() => {
    setStats((prev) => ({ ...prev, totalProducts: products.length }));
  }, [products]);

  return (
    <div className="space-y-6 pb-10">
      {/* 1. Header Section */}
      <div className="flex justify-between items-center">
        {/* <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm">
            Welcome back, Admin! Here's what's happening today.
          </p>
        </div> */}
        <div className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* 2. Key Metrics Cards (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Revenue */}
        <StatCard
          title="Total Revenue"
          value={`฿${numberFormat(stats.totalRevenue)}`}
          icon={DollarSign} // ✅ ส่งชื่อ Component ตรงๆ ไม่ใส่ < />
          bgIcon="bg-indigo-500"
          trend="+12.5% from last month"
          isUp={true}
        />

        {/* Card 2: Orders */}
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingBag} // ✅
          bgIcon="bg-emerald-500"
          trend="+8.2% from last month"
          isUp={true}
        />

        {/* Card 3: Products */}
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package} // ✅
          bgIcon="bg-blue-500"
          trend="Inventory Status"
          subtext="Update stock regularly"
        />

        {/* Card 4: Users */}
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users} // ✅
          bgIcon="bg-orange-500"
          trend="+2.4% new users"
          isUp={true}
        />
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Revenue Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Revenue Analytics (Mockup)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart: Order Status */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Order Status
          </h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center">
              <span className="text-3xl font-bold text-slate-800">
                {stats.totalOrders}
              </span>
              <p className="text-xs text-slate-400">Total Orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recent Orders Table (Simplified) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">
            Recent Transactions
          </h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-700">
                      #{String(order.id).slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {order.orderedBy?.email}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {date(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      ฿{numberFormat(order.cartTotal)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                                    ${
                                      order.orderStatus === "Completed"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : order.orderStatus === "Processing"
                                          ? "bg-indigo-100 text-indigo-700"
                                          : order.orderStatus === "Cancelled"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-slate-100 text-slate-600"
                                    }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-slate-400">
                    No recent orders...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: StatCard ---
// ✅ รับ prop icon (ตัวเล็ก) มา rename เป็น Icon (ตัวใหญ่)
const StatCard = ({
  title,
  value,
  icon: Icon,
  bgIcon,
  trend,
  isUp,
  subtext,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
        </div>
        {/* ✅ เพิ่ม text-white และใช้ Icon เป็น tag */}
        <div className={`p-3 rounded-lg shadow-sm ${bgIcon} text-white`}>
          <Icon size={25} />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        {subtext ? (
          <span className="text-slate-400">{subtext}</span>
        ) : (
          <>
            <span
              className={`flex items-center font-medium ${
                isUp ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isUp ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              {trend}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default FormDashboard;
