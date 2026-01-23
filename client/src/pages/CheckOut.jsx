import { useState, useEffect, use } from "react";
import { MapPin, ChevronLeft, Wallet, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store"; // (ถ้าจะดึงของจริงมาโชว์)
import { addressUserCart, listUserCart } from "../api/user";
import Swal from "sweetalert2";
import Payment from "./user/Payment";
import numberFormat from "../components/utility/number";

const CheckOut = () => {
  // Zustand
  const token = useEcomStore((state) => state.token);
  const actionUpdateUser = useEcomStore((state) => state.actionUpdateUser);
  // fly to
  const navigate = useNavigate();
  // State
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [vat, setVat] = useState(0);
  // state address
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
  // FetchData
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
  // Set - address
  const handleChangeAddress = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };
  // Handle Confirm Order
  const handleSaveAddress = async () => {
    // validate
    if (
      !address.address ||
      !address.email ||
      !address.name ||
      !address.phoneNumber
    ) {
      return false;
    }

    try {
      // Update to DB
      await addressUserCart(token, address);
      actionUpdateUser({
        name: address.name,
        address: address.address,
        phoneNumber: address.phoneNumber,
      });
      return true; // true - record
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Button */}
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* --- LEFT COLUMN: Forms --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Shipping Address */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <MapPin className="text-indigo-600" /> Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    onChange={handleChangeAddress}
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all placeholder-slate-300 placeholder-opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    onChange={handleChangeAddress}
                    name="phoneNumber"
                    type="text"
                    placeholder="081-234-5678"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all placeholder-slate-300 placeholder-opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    onChange={handleChangeAddress}
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all placeholder-slate-300 placeholder-opacity-60"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Address
                  </label>
                  <textarea
                    onChange={handleChangeAddress}
                    name="address"
                    rows="3"
                    placeholder="123 Street, District, Province, Zip Code"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all resize-none placeholder-slate-300 placeholder-opacity-60"
                  />
                </div>
              </div>
              {/* Payment Stripe */}
              <div className="mt-5">
                <Payment
                  address={address}
                  handleSaveAddress={handleSaveAddress}
                />
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Order Summary (Ultra Minimal - Text Only) --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                Order Summary
              </h2>

              {/* 1. Product List (Text Only) */}
              <div className="space-y-6 mb-8 max-h-320px overflow-y-auto pr-4 custom-scrollbar font-medium">
                {products.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start group py-1"
                  >
                    {/* Info (No Image) */}
                    <div className="flex-1 pr-4">
                      <h4 className="text-sm font-bold text-slate-700 leading-tight">
                        {item.product?.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1.5 font-normal">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                          x{item.count}
                        </span>
                        <span> ฿{numberFormat(item.price)}</span>
                      </div>
                    </div>

                    {/* Item Total */}
                    <span className="text-sm font-bold text-slate-800 font-mono">
                      ฿{(item.price * item.count).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider (Solid thin) */}
              <div className="border-t border-slate-100 my-6"></div>
              {/* 2. Calculation Details */}
              <div className="space-y-3 text-sm font-medium">
                {/* Subtotal */}
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-700">
                    ฿{numberFormat(cartTotal)}
                  </span>
                </div>
                {/* Shipping */}
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="text-emerald-600">{shipping}</span>
                </div>
                {/* VAT */}
                <div className="flex justify-between text-slate-500">
                  <span>VAT (7%)</span>
                  <span className="text-slate-700">฿{numberFormat(vat)}</span>
                </div>
              </div>

              {/* Divider (Solid thick) */}
              <div className="border-t-2 border-slate-800/5 my-6"></div>

              {/* 3. Grand Total */}
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-base font-black text-slate-800 block uppercase tracking-wider">
                    Total
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    THB (Inc. VAT)
                  </span>
                </div>
                {/* Total */}
                <span className="text-3xl font-black text-indigo-700 tracking-tight font-mono leading-none">
                  ฿{numberFormat(netTotal)}
                </span>
              </div>
              <p className="text-center text-xs text-slate-400 mt-4">
                By confirming, you agree to our Terms & Conditions.
              </p>
              {/* Action Button */}
              {/* <button
                onClick={hldConfirmOrder}
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Confirm Payment"
                )}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
