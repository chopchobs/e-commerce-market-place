import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import useEcomStore from "../store/ecom-store";
import { useEffect, useState } from "react";
import ProductList from "../components/card/ProductList";
import SearchCard from "../components/card/SearchCard";
import SortBy from "./SortBy";

const Shop = () => {
  // --- Store & State ---
  const getProducts = useEcomStore((state) => state.products);
  const fetchCategories = useEcomStore((state) => state.fetchCategories);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters,
  );
  const loading = useEcomStore((state) => state.loading);
  // State สำหรับเปิด/ปิด Filter - Mobile
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // Key to Reset
  const [resetKey, setResetKey] = useState(0);
  useEffect(() => {
    fetchCategories();
    actionSearchFilters({ query: "", category: [], price: [], sort: "newest" });
  }, []);
  const handleResetFilters = () => {
    actionSearchFilters({
      query: "",
      category: [],
      price: [],
      sort: "newest",
    });
    // เปลี่ยนค่า Key เพื่อสั่งให้ SearchCard เริ่มต้นใหม่ (ล้างค่า input ทั้งหมด)
    setResetKey((prev) => prev + 1);
  };
  // Toggle Function - Mobile
  const toggleMobileFilter = () => setIsMobileFilterOpen(!isMobileFilterOpen);

  return (
    <div className="w-full bg-slate-50 min-h-screen font-sans relative">
      {/* ================= HEADER SECTION (Soft & Minimal) ================= */}
      {/* ปรับ bg เป็น white/90 และ backdrop-blur เพื่อให้ดูโปร่ง ไม่ทึบตัน */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            {/* Title & Count */}
            <div>
              {/* ลด font-bold เป็น semibold ให้ดูไม่ตะโกนเกินไป */}
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight">
                Shop All Products
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Found{" "}
                <span className="font-medium text-indigo-500">
                  {getProducts?.length || 0}
                </span>{" "}
                items
              </p>
            </div>

            {/* Mobile Actions (Filter & Sort) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Filter Button */}
              {/* ✨ ปรับใหม่: ตัด Border ออก ใช้พื้นหลังสีเทาจางๆ (bg-slate-100) แทน ให้ดูนุ่มนวลเหมือนแคปซูล */}
              <button
                onClick={toggleMobileFilter}
                className="md:hidden flex-1 h-10 sm:h-11 flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 px-4 rounded-xl text-sm font-medium transition-all active:scale-95"
              >
                <Filter size={16} className="text-slate-500" />
                Filter
              </button>

              {/* Sort Dropdown */}
              {/* ใช้ min-w ให้พอดี ไม่กว้างเกินไป */}
              <div className="flex-1 sm:flex-none min-w-[130px] sm:w-auto">
                <SortBy />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* --- 1. DESKTOP SIDEBAR (Filter) --- */}
          {/* hidden on mobile (md:block) */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
              <div className="flex items-center gap-2 mb-2 pb-4 border-b border-slate-100">
                <SlidersHorizontal size={20} className="text-indigo-600" />
                <h3 className="font-bold text-slate-900">Filters</h3>
              </div>
              {/* Component Filter หลัก */}
              <SearchCard key={resetKey} />
            </div>
          </aside>

          {/* --- 2. PRODUCT LIST AREA --- */}
          <main className="flex-1 w-full">
            {loading ? (
              <LoadingSkeleton />
            ) : getProducts?.length > 0 ? (
              <div className="animate-in fade-in duration-500">
                <ProductList getProducts={getProducts} />
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Search size={32} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  No products found
                </h3>
                <p className="text-slate-500 mt-2 max-w-xs mx-auto">
                  Try adjusting your filters or search criteria to find what
                  you're looking for.
                </p>
                <button
                  onClick={handleResetFilters} // หรือฟังก์ชันเคลียร์ Filter
                  className="mt-6 px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-full hover:bg-indigo-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ================= MOBILE FILTER DRAWER (Overlay) ================= */}
      {/* Logic: ถ้า isMobileFilterOpen เป็น true ให้แสดง Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop (กดที่มืดๆ เพื่อปิด) */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={toggleMobileFilter}
          ></div>

          {/* Drawer Panel */}
          <div className="relative w-full max-w-xs h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-white">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Filter size={20} className="text-indigo-600" />
                Filters
              </h2>
              <button
                onClick={toggleMobileFilter}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Drawer Content (SearchCard) */}
            <div className="flex-1 overflow-y-auto p-5 pb-24">
              <SearchCard key={resetKey} />
            </div>

            {/* Drawer Footer (Apply Button) */}
            <div className="p-5 border-t border-slate-100 bg-white absolute bottom-0 w-full">
              <button
                onClick={toggleMobileFilter}
                className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all"
              >
                View Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-Component: Loading Skeleton ---
// สร้างกล่องจำลองตอนโหลด เพื่อ UX ที่ดีกว่า Text ธรรมดา
const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse"
        >
          <div className="w-full aspect-square bg-slate-200 rounded-xl mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-6 bg-slate-200 rounded w-1/3"></div>
            <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
