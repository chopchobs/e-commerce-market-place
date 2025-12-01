import { ShoppingCart, Heart } from "lucide-react";
import NewProduct from "./NewProdcut";

const ProductCard = ({ item }) => {
  // --- 🗓️ Logic: เช็คสินค้าใหม่ (ภายใน 7 วัน) ---
  const isNewProduct = () => {
    if (!item.createdAt) return false; // ถ้าไม่มีวันที่ ก็ไม่ใหม่

    // วันปัจจุบัน
    const currentDate = new Date();
    // วันที่ลงสินค้า
    const productDate = new Date(item.createdAt);
    // หาผลต่าง (หน่วยเป็นมิลลิวินาที)
    const diffTime = Math.abs(currentDate - productDate);
    // แปลงเป็นวัน (1000ms * 60s * 60m * 24h)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // ถ้าไม่เกิน 7 วัน ให้ถือว่าเป็นของใหม่
    return diffDays <= 7;
  };
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-transparent hover:border-indigo-100 hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative w-full aspect-3/4 bg-slate-200 overflow-hidden">
        <img
          // ⭐ แก้ไขจุดเสี่ยง: เช็คว่ามีรูปไหม ถ้าไม่มีใช้รูป Placeholder
          src={
            item.images && item.images.length > 0
              ? item.images[0].url
              : "https://placehold.co/400x600?text=No+Image"
          }
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge: New (เช็คว่ามี createdAt ไหม ถ้าพึ่งมาใหม่ให้โชว์ก็ได้) */}
        <NewProduct item={item} />

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button className="bg-white p-3 rounded-full text-slate-800 hover:bg-indigo-600 hover:text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
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
