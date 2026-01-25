import { useState, useEffect } from "react";
import {
  MapPin,
  ChevronLeft,
  User,
  Phone,
  Mail,
  Home,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { addressUserCart, listUserCart } from "../api/user";
import Payment from "./user/Payment";
import numberFormat from "../components/utility/number";

const CheckOut = () => {
  const token = useEcomStore((state) => state.token);
  const actionUpdateUser = useEcomStore((state) => state.actionUpdateUser);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [vat, setVat] = useState(0);

  const [address, setAddress] = useState({
    address: "",
    email: "",
    name: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const fetchData = async (token) => {
    try {
      const res = await listUserCart(token);
      setProducts(res.data.products || []);
      setCartTotal(res.data.cartTotal || 0);
      setShipping(res.data.shipping || 0);
      setVat(res.data.vat || 0);
      setNetTotal(res.data.netTotal || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAddress = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveAddress = async () => {
    if (
      !address.address ||
      !address.email ||
      !address.name ||
      !address.phoneNumber
    ) {
      return false;
    }
    try {
      await addressUserCart(token, address);
      actionUpdateUser({
        name: address.name,
        address: address.address,
        phoneNumber: address.phoneNumber,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate("/shop")}
          className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <div className="p-1 rounded-full bg-white group-hover:bg-indigo-50 border border-slate-200 transition-colors">
            <ChevronLeft size={16} />
          </div>
          Back to Shop
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* --- LEFT COLUMN: Forms --- */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Shipping Address Card */}
            {/* ✨ FIX: เพิ่ม overflow-hidden เพื่อตัดส่วนเกินทิ้ง */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                  <MapPin size={24} />
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  Shipping Address
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2 relative">
                  <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    {/* ✨ FIX: ใส่ box-border และ w-full เพื่อกันล้น */}
                    <input
                      onChange={handleChangeAddress}
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full box-border pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm sm:text-base placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block uppercase tracking-wider">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      onChange={handleChangeAddress}
                      name="phoneNumber"
                      type="text"
                      placeholder="081-xxx-xxxx"
                      className="w-full box-border pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm sm:text-base placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block uppercase tracking-wider">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      onChange={handleChangeAddress}
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full box-border pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm sm:text-base placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 relative">
                  <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block uppercase tracking-wider">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <Home
                      className="absolute left-4 top-4 text-gray-400"
                      size={18}
                    />
                    <textarea
                      onChange={handleChangeAddress}
                      name="address"
                      rows="3"
                      placeholder="House No, Street, District, Province, Zip Code"
                      className="w-full box-border pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm sm:text-base resize-none placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Section */}
            {/* ✨ FIX: ลบ Card Wrapper (bg-white, p-6, shadow) ออกจากตรงนี้ 
               เพื่อไม่ให้ซ้อนกับ Card ของ CheckoutForm ตัวข้างใน
               ถ้าตัวข้างใน (Stripe) มีกรอบอยู่แล้ว มันจะวางลงไปพอดีครับ */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  Payment Method
                </h2>
              </div>

              {/* Wrapper สำหรับ Payment: ใส่แค่ w-full */}
              <div className="w-full">
                <Payment
                  address={address}
                  handleSaveAddress={handleSaveAddress}
                />
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Summary --- */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-indigo-900/5 border border-gray-100 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="text-indigo-600" size={20} />
                <h2 className="text-xl font-bold text-slate-800">
                  Order Summary
                </h2>
                <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                  {products.length} Items
                </span>
              </div>

              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {products.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start group"
                  >
                    <div className="flex gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-700 line-clamp-2">
                          {item.product?.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Qty: {item.count} x ฿{numberFormat(item.price)}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      ฿{numberFormat(item.price * item.count)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-gray-200 my-6"></div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-700">
                    ฿{numberFormat(cartTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="font-medium text-emerald-600">
                    {shipping === 0 ? "Free" : `฿${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>VAT (7%)</span>
                  <span className="font-medium text-slate-700">
                    ฿{numberFormat(vat)}
                  </span>
                </div>
              </div>

              <div className="mt-6 bg-slate-900 rounded-xl p-4 flex justify-between items-center text-white shadow-lg shadow-slate-900/20">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">
                    Grand Total
                  </p>
                  <p className="text-sm text-slate-400">Net Payment</p>
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  ฿{numberFormat(netTotal)}
                </span>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
