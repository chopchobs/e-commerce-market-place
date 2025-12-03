import { Search } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { useEffect, useState } from "react";

const SearchCard = () => {
  //zustand store - Product 🌎
  // Products ( public )
  const listProduct = useEcomStore((state) => state.listProduct);
  const products = useEcomStore((state) => state.products);
  // Category ( public )
  const categories = useEcomStore((state) => state.categories);
  const fetchCategories = useEcomStore((state) => state.fetchCategories);
  //  Query, Category, Price
  const actionSearchProduct = useEcomStore(
    (state) => state.actionSearchProduct
  );
  // 1. Search by text ( Query )
  const [text, setText] = useState("");
  useEffect(() => {
    const delay = setTimeout(() => {
      // valid
      if (text) {
        actionSearchProduct({ query: text });
      } else {
        listProduct(20);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  // 2. Select - Categories
  const [selectCategory, setSelectCategory] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  // Handle Select
  const handleCategory = (e) => {
    const inCheck = Number(e.target.value);
    const inState = [...selectCategory];
    const findCheck = inState.indexOf(inCheck); // ถ้าไม่เจอ จะ return -1
    // Valid Logic
    if (findCheck === -1) {
      inState.push(inCheck); // ไม่เจอ -> เพิ่ม
    } else {
      inState.splice(findCheck, 1); // เจอ -> ลบออก 1 ตัว
    }
    setSelectCategory(inState); // Update STATE
    // Trigger Search
    if (inState.length > 0) {
      actionSearchProduct({ category: inState });
    } else {
      listProduct(20);
    }
  };

  //3. search by price range (price)

  return (
    <div>
      {/* Search */}
      <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">
        Search
      </h3>
      <div className="relative">
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
        <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
      </div>
      {/*  Categories */}
      <div>
        <h3>Categories</h3>
        <div>
          {categories.map((items, index) => {
            return (
              <div key={index} className="flex gap-2 items-center">
                <input
                  key={index}
                  onChange={handleCategory}
                  value={items.id}
                  type="checkbox"
                  // ✅ เพิ่ม checked เพื่อให้ UI ตรงกับ State (Controlled Component)
                  checked={selectCategory.includes(items.id)}
                />
                <label>{items.name}</label>
              </div>
            );
          })}
        </div>
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
  );
};
export default SearchCard;
