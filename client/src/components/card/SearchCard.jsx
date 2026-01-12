import { RotateCcw, Search } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import numberFormat from "../utility/number";
const SearchCard = () => {
  //zustand store - Product 🌎
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  const categories = useEcomStore((state) => state.categories);
  const fetchCategories = useEcomStore((state) => state.fetchCategories);

  // --- 2. Search Text ---
  const [text, setText] = useState("");
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        actionSearchFilters({ query: "" }); // ส่งค่าว่างไป Store จะจัดการเอง
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);
  // --- 3. Categories ---
  const [selectCategory, setSelectCategory] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  // function Category
  const handleCategory = (e) => {
    const inCheck = Number(e.target.value);
    const inState = [...selectCategory];
    const findCheck = inState.indexOf(inCheck); // ถ้าไม่เจอ จะ return -1
    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setSelectCategory(inState);
    // ส่งค่าไปรวมกับ Sort/Price ใน Store ทันที
    actionSearchFilters({ category: inState });
  };
  // --- 4. Price ---
  const [price, setPrice] = useState([0, 100000]);
  const handlePriceChange = (value) => {
    setPrice(value);
  };
  const handlePriceAfterChange = (value) => {
    actionSearchFilters({ price: value }); // ส่งค่าไป Store
  };
  // --- 5. Clear Filter ---
  const handleClearFilter = () => {
    // Reset ค่าหน้าจอ
    setText("");
    setSelectCategory([]);
    setPrice([0, 100000]);
    // Reset ค่าใน Store (ส่งค่า Default กลับไป)
    actionSearchFilters({
      query: "",
      category: [],
      price: [0, 100000],
      sort: "newest", // Reset การเรียงลำดับด้วยถ้าต้องการ
    });
  };
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-8">
      {/* --- 1. Search Bar --- */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Search
        </h3>
        <div className="relative group">
          <input
            onChange={(e) => setText(e.target.value)}
            value={text} // Bind value เพื่อให้เคลียร์ค่าได้
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
          />
          <Search
            className="absolute left-3 top-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
            size={18}
          />
        </div>
      </div>

      {/* --- 2. Categories --- */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Categories
        </h3>
        <div className="space-y-2 max-h-240px overflow-y-auto pr-2 custom-scrollbar">
          {categories.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 items-center hover:bg-slate-50 p-1.5 rounded-md transition-colors cursor-pointer"
            >
              <input
                id={`cat-${item.id}`} // ใส่ ID เพื่อให้กด Label แล้วติ๊กได้
                onChange={handleCategory}
                value={item.id}
                type="checkbox"
                checked={selectCategory.includes(item.id)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <label
                htmlFor={`cat-${item.id}`}
                className="text-sm text-slate-600 cursor-pointer flex-1 select-none"
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* --- 3. Price Range --- */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Price Range
        </h3>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={100000}
            step={1000}
            defaultValue={[0, 100000]}
            value={price}
            onChange={handlePriceChange}
            onChangeComplete={handlePriceAfterChange}
            styles={{
              track: { backgroundColor: "#4f46e5", height: 6 },
              rail: { backgroundColor: "#e2e8f0", height: 6 },
              handle: {
                borderColor: "#4f46e5",
                backgroundColor: "#fff",
                borderWidth: 2,
                height: 20,
                width: 20,
                marginTop: -7,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                opacity: 1,
              },
            }}
          />
        </div>

        {/* Price Display Boxes */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="border border-slate-200 bg-slate-50 rounded-md px-3 py-1.5 text-slate-600 font-medium w-24 text-center">
            ฿{numberFormat(price[0])}
          </div>
          <span className="text-slate-400 font-light">-</span>
          <div className="border border-slate-200 bg-slate-50 rounded-md px-3 py-1.5 text-slate-600 font-medium w-24 text-center">
            ฿{numberFormat(price[1])}
          </div>
        </div>
      </div>

      {/* --- 4. Clear Filter Button --- */}
      <button
        onClick={handleClearFilter}
        className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-all shadow-sm active:scale-95"
      >
        <RotateCcw size={16} />
        Clear All Filters
      </button>
    </div>
  );
};
export default SearchCard;
