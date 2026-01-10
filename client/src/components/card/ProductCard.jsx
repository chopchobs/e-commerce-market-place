import { ShoppingCart, Heart } from "lucide-react";
import NewProduct from "./NewProduct";
import useEcomStore from "../../store/ecom-store";
import numberFormat from "../utility/number";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ item }) => {
  // Store
  const actionAddToCart = useEcomStore((state) => state.actionAddToCart);
  const navigate = useNavigate();

  // function Product  - detail
  const handleCardClick = () => {
    navigate(`/product/${item.id}`); // เดียวมาทำ
  };
  // function Cart (หยุดไม่ให้ทะลุไปหา Card)
  const handleAddToCart = (e) => {
    e.stopPropagation(); // 👈 ⛔️ หยุด Event
    actionAddToCart(item);
  };
  // function Heart (หยุดไม่ให้ทะลุ)
  const handleWishlist = (e) => {
    e.stopPropagation(); // 👈 ⛔️ หยุด Event
    console.log("Add to wishlist");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      onClick={handleCardClick}
      className="group relative bg-white rounded-xl overflow-hidden border border-transparent hover:border-indigo-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-3/4 bg-slate-200 overflow-hidden">
        <img
          src={
            item.images && item.images.length > 0
              ? item.images[0].url
              : "https://placehold.co/400x600?text=No+Image"
          }
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge: New ( createdAt - 7days for new) */}
        <NewProduct item={item} />

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[1px]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="bg-white p-3 rounded-full text-slate-800 hover:bg-indigo-600 hover:text-white shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className="bg-white p-3 rounded-full text-slate-800 hover:bg-red-500 hover:text-white shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100"
            title="Wishlist"
          >
            <Heart size={20} />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-slate-500 mb-1">
          {/* ⭐ ใส่ ?. กันพังกรณีไม่มีหมวดหมู่ */}
          {item.category?.name || "UnCategorized"}
        </p>
        <h3 className="font-semibold text-slate-800 text-base truncate group-hover:text-indigo-600 transition-colors cursor-pointer">
          {item.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-lg text-slate-900">
            ฿{numberFormat(item.price)} THB
          </span>
          <div className="flex gap-1 text-yellow-400 text-xs">★★★★☆ (12)</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
