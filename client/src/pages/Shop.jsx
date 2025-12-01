import { Search, Filter } from "lucide-react";
import useEcomStore from "../store/ecom-store";
import { useEffect } from "react";
import ProductList from "../components/card/ProductList";

const Shop = () => {
  // JS
  // zustand store 🌎
  const listProduct = useEcomStore((state) => state.listProduct);
  const getProducts = useEcomStore((state) => state.products);
  const fetchCategories = useEcomStore((state) => state.fetchCategories);
  const categories = useEcomStore((state) => state.categories);
  console.log("Products in Shop:", getProducts);
  console.log("Categories in Shop:", categories);
  // Fetch products on component mount
  useEffect(() => {
    listProduct();
    fetchCategories();
  }, []);
  return (
    // Main Container
    <div className="w-full bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 1 Top Bar (Filter Mobile & Sort) */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          {/* 1.1 Showing Products */}
          <span className="text-slate-500 text-sm font-medium">
            Showing {getProducts.length} Products
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
              {/* 2.1 Search */}
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">
                  Search
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  <Search
                    className="absolute left-3 top-2.5 text-slate-400"
                    size={16}
                  />
                </div>
              </div>
              {/* 2.2 Categories */}
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">
                  Categories
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {/* loop  */}
                  {categories
                    .map((item) => item.name)
                    .map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors"
                      >
                        {/*  Colored Dot */}
                        <div
                          className={`w-2 h-2 rounded-full ${
                            index === 0 ? "bg-indigo-600" : "bg-slate-300"
                          }`}
                        ></div>
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
              {/* Price Range */}
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">
                  Price
                </h3>
                <input
                  type="range"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>฿0</span>
                  <span>฿100,000+</span>
                </div>
              </div>
              {/* Clear Filter */}
              <button className="w-full py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                Clear All Filters
              </button>
            </div>
          </aside>
          {/* Product List */}
          <ProductList getProducts={getProducts} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
