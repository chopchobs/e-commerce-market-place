import { Search, Filter } from "lucide-react";
import useEcomStore from "../store/ecom-store";
import { useEffect } from "react";
import ProductList from "../components/card/ProductList";
import SearchCard from "../components/card/SearchCard";
import SortBy from "./SortBy";

const Shop = () => {
  // JS
  // zustand store 🌎
  const getProducts = useEcomStore((state) => state.products);
  const fetchCategories = useEcomStore((state) => state.fetchCategories);
  const loading = useEcomStore((state) => state.loading);

  // Fetch products on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 1 Top Bar (Filter Mobile & Sort) */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          {/* Showing Products */}
          <span className="text-slate-500 text-sm font-medium">
            Showing {getProducts?.length || 0} Products
          </span>
          <div className="flex gap-4">
            {/* Mobile Filter Button (Hidden on Desktop) */}
            <button className="md:hidden flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600">
              <Filter size={18} /> Filters
            </button>
            {/* 1.2 Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SortBy />
            </div>
          </div>
        </div>
        {/* 2. Sidebar Filter (Desktop) */}
        <div className="flex gap-8">
          <aside className="w-64 hidden md:block shrink-0">
            <div className="sticky top-24 space-y-8">
              {/*  SearchCard =query,category,price - clear filter */}
              <SearchCard />
            </div>
          </aside>
          {/* Product List  - Cart */}
          {loading ? (
            <div className="text-center p-10 text-xl font-bold text-gray-400">
              Loading products... ⏳
            </div>
          ) : (
            <ProductList getProducts={getProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
