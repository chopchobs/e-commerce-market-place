import ProductCard from "./ProductCard";
import { PackageX, ArrowDown } from "lucide-react";

// รับ props: getProducts ตามที่คุณกำหนดมา
const ProductList = ({ getProducts }) => {
  // เช็คว่ามีสินค้าไหม
  const isEmpty = !getProducts || getProducts.length === 0;

  return (
    <div className="flex-1 w-full">
      {isEmpty ? (
        // --- 1. Empty State (กรณีไม่เจอสินค้า) ---
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <PackageX size={40} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            No products found
          </h3>
          <p className="text-slate-500 max-w-xs mx-auto">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        // --- 2. Product Grid ---
        // Mobile: 2 cols (gap-3) | Desktop: 3-4 cols (gap-6)
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {getProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* --- 3. Pagination / Load More --- */}
      {!isEmpty && (
        <div className="mt-12 flex justify-center">
          <button className="group flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-full hover:border-indigo-600 hover:text-indigo-600 hover:shadow-lg hover:shadow-indigo-100 transition-all active:scale-95">
            Load More Products
            <ArrowDown size={16} className="group-hover:animate-bounce" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
