import { ShoppingCart, Heart } from "lucide-react";
import NewProduct from "./NewProdcut";
import useEcomStore from "../../store/ecom-store";

const ProductCard = ({ item }) => {
  const actionAddToCart = useEcomStore((state) => state.actionAddToCart);
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-transparent hover:border-indigo-100 hover:shadow-xl transition-all duration-300">
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
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => actionAddToCart(item)}
            className="bg-white p-3 rounded-full text-slate-800 hover:bg-indigo-600 hover:text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
          >
            <ShoppingCart size={20} />
          </button>
          <button className="bg-white p-3 rounded-full text-slate-800 hover:bg-red-500 hover:text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
            <Heart size={20} />
          </button>
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
          <span className="font-bold text-slate-900">
            ฿{item.price.toLocaleString()}
          </span>
          <div className="flex gap-1 text-yellow-400 text-xs">★★★★☆ (12)</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
