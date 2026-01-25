import { X, Minus, Plus, Trash2 } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createUserCart } from "../../api/user";
import { numberFormat } from "../utility/number";

const CartDrawer = () => {
  // navigate
  const navigate = useNavigate();
  // zustand
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  const actionCloseCart = useEcomStore((state) => state.actionCloseCart);
  const isOpen = useEcomStore((state) => state.isOpen);
  const cart = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity,
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct,
  );
  const actionTotalPrice = useEcomStore((state) => state.actionTotalPrice);

  // Handle List Cart
  const hldSaveCartCheckOut = async () => {
    actionCloseCart(); // close cart
    // Validate User
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }
    // Success Login
    try {
      const res = await createUserCart(token, { cart });
      console.log(res);
      navigate("/checkout");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error Saving Cart",
        text: "Please try again",
        icon: "error",
      });
    }
  };

  return (
    // 1. Overlay (Dark)
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* 2. Backdrop (Click on Back space for close cart) */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={actionCloseCart}
      />

      {/* 3. Drawer (Body Cart) */}
      <div
        className={`relative w-full max-w-md bg-white h-dvh shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* --- Header --- */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white z-10">
          <h2 className="text-lg font-bold text-slate-800">
            Shopping Cart ({cart.length})
          </h2>
          <button
            onClick={actionCloseCart}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
          >
            <X size={24} />
          </button>
        </div>

        {/* --- Body (รายการสินค้า) --- */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                {/* Image */}
                <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={
                      item.images?.[0]?.url ||
                      "https://placehold.co/200?text=No+Image"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-2 pr-4">
                        {item.title}
                      </h3>
                      {/* actionRemoveProduct - Remove 🗑️ 🛑 */}
                      <button
                        onClick={() => actionRemoveProduct(item.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Category: {item.category?.name || "-"}
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-slate-200 rounded-lg h-8">
                      <button
                        onClick={() =>
                          actionUpdateQuantity(item.id, item.count - 1)
                        }
                        className="px-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 h-full rounded-l-lg transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-slate-700">
                        {item.count}
                      </span>
                      <button
                        onClick={() =>
                          actionUpdateQuantity(item.id, item.count + 1)
                        }
                        className="px-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 h-full rounded-r-lg transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-bold text-indigo-600 text-sm">
                      ฿{numberFormat(item.price * item.count)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Empty State (ถ้าไม่มีของ)
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                <X size={40} className="text-slate-300" />
              </div>
              <p className="font-medium text-slate-500">Your cart is empty.</p>
              <button
                onClick={() => {
                  actionCloseCart();
                  navigate("/shop");
                }}
                className="text-sm text-indigo-600 font-semibold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* --- Footer (ปุ่มจ่ายเงิน) --- */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600 font-medium">Subtotal</span>
              <span className="text-xl font-extrabold text-slate-900">
                ฿{numberFormat(actionTotalPrice())}
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 text-center">
              Shipping and taxes calculated at checkout.
            </p>

            <button
              onClick={hldSaveCartCheckOut}
              className="w-full flex items-center justify-center bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
