import { Search, Filter } from "lucide-react";
import useEcomStore from "../store/ecom-store";
import { useEffect } from "react";
import ProductList from "../components/card/ProductList";
import SearchCard from "../components/card/SearchCard";

const Shop = () => {
  // JS
  // zustand store 🌎
  const listProduct = useEcomStore((state) => state.listProduct);
  const getProducts = useEcomStore((state) => state.products);
  const fetchCategories = useEcomStore((state) => state.fetchCategories);
  const categories = useEcomStore((state) => state.categories);
  // console.log("Products in Shop:", getProducts);
  // console.log("Categories in Shop:", categories);
  // Fetch products on component mount
  useEffect(() => {
    listProduct();
    fetchCategories();
  }, []);
  return (
    <div className="w-full bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 1 Top Bar (Filter Mobile & Sort) */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          {/* 1.1 Showing Products */}
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
              <span className="text-sm text-slate-500 hidden sm:block">
                Sort by:
              </span>
              <select className="text-sm border-none focus:ring-0 font-medium text-slate-700 bg-transparent cursor-pointer hover:text-indigo-600">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
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
          <ProductList getProducts={getProducts} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
