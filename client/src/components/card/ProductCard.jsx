import { ShoppingCart, Heart, Star } from "lucide-react"; // Import Star เพิ่ม
import NewProduct from "./NewProduct";
import useEcomStore from "../../store/ecom-store";
import numberFormat from "../utility/number";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  // Store
  const actionAddToCart = useEcomStore((state) => state.actionAddToCart);
  const navigate = useNavigate();

  // Navigation
  const handleCardClick = () => {
    navigate(`/product/${item.id}`);
  };

  // Add to Cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    actionAddToCart(item);
  };

  // Wishlist
  const handleWishlist = (e) => {
    e.stopPropagation();
    console.log("Add to wishlist");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }} // ✨ ขยับขึ้นนิดนึงตอน Hover ให้ดูมีมิติ
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 cursor-pointer h-full flex flex-col"
    >
      {/* ================= IMAGE SECTION ================= */}
      <div className="relative w-full aspect-3/4 bg-slate-100 overflow-hidden">
        {/* Product Image */}
        <img
          src={
            item.images && item.images.length > 0
              ? item.images[0].url
              : "https://placehold.co/400x600?text=No+Image"
          }
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badge: New */}
        <div className="absolute top-2 left-2 z-10">
          <NewProduct item={item} />
        </div>

        {/* ❤️ Wishlist Button (Mobile: Show Top-Right, Desktop: Show on Hover) */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-400 hover:text-red-500 hover:bg-white transition-all shadow-sm md:opacity-0 md:group-hover:opacity-100 md:translate-x-4 md:group-hover:translate-x-0 duration-300"
        >
          <Heart size={18} />
        </button>

        {/* 🛒 Desktop Hover Action (ซ่อนในมือถือ) */}
        <div className="hidden md:flex absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl hover:bg-indigo-600 hover:text-white transition-colors translate-y-4 group-hover:translate-y-0 duration-300"
          >
            <ShoppingCart size={18} />
            Quick Add
          </motion.button>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="p-4 flex flex-col grow justify-between">
        <div>
          {/* Category */}
          <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
            {item.category?.name || "General"}
          </p>

          {/* Title */}
          <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
            {item.title}
          </h3>
        </div>

        {/* Price & Mobile Cart Row */}
        <div className="flex items-end justify-between mt-2">
          <div className="flex flex-col">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-slate-400">(4.5)</span>
            </div>
            {/* Price */}
            <span className="font-bold text-base sm:text-lg text-indigo-900">
              ฿{numberFormat(item.price)}
            </span>
          </div>

          {/* 🛒 Mobile Cart Button (แสดงเฉพาะมือถือ md:hidden) */}
          <button
            onClick={handleAddToCart}
            className="md:hidden p-2.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors active:scale-95"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
