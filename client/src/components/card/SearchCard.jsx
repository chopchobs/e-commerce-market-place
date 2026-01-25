import { RotateCcw, Search, Check } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import numberFormat from "../utility/number";

const SearchCard = () => {
  // --- Store ---
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters,
  );
  const categories = useEcomStore((state) => state.categories);
  const fetchCategories = useEcomStore((state) => state.fetchCategories);

  // --- State ---
  const [text, setText] = useState("");
  const [selectCategory, setSelectCategory] = useState([]);
  const [price, setPrice] = useState([0, 100000]);

  // --- Effects ---
  useEffect(() => {
    fetchCategories();
  }, []);

  // Debounce Search Text
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        actionSearchFilters({ query: "" });
      }
    }, 400); // เพิ่ม delay นิดหน่อยเพื่อลดการยิง request ถี่เกินไป
    return () => clearTimeout(delay);
  }, [text]);

  // --- Handlers ---
  const handleCategory = (id) => {
    // รับ ID โดยตรง ไม่ต้องผ่าน e.target เพื่อให้กดทั้ง div ได้
    const inCheck = Number(id);
    const inState = [...selectCategory];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setSelectCategory(inState);
    actionSearchFilters({ category: inState });
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const handlePriceAfterChange = (value) => {
    actionSearchFilters({ price: value });
  };

  const handleClearFilter = () => {
    setText("");
    setSelectCategory([]);
    setPrice([0, 100000]);
    actionSearchFilters({
      query: "",
      category: [],
      price: [],
      sort: "newest",
    });
  };

  return (
    <div className="w-full space-y-7 font-sans text-slate-800">
      {/* --- 1. SEARCH INPUT --- */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          Search
        </h3>
        <div className="relative group">
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            placeholder="Find product..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
          />
          <Search
            className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
            size={18}
          />
        </div>
      </div>

      {/* --- 2. CATEGORIES --- */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          Categories
        </h3>
        <div className="space-y-1 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {categories.map((item) => {
            const isSelected = selectCategory.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => handleCategory(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group
                  ${
                    isSelected
                      ? "bg-indigo-50 border border-indigo-100"
                      : "hover:bg-slate-50 border border-transparent"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Custom Checkbox UI */}
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                      ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-600"
                          : "bg-white border-slate-300 group-hover:border-indigo-300"
                      }
                  `}
                  >
                    {isSelected && (
                      <Check size={12} className="text-white" strokeWidth={3} />
                    )}
                  </div>

                  <span
                    className={`text-sm font-medium transition-colors ${isSelected ? "text-indigo-700" : "text-slate-600"}`}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- 3. PRICE RANGE --- */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
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
            trackStyle={[{ backgroundColor: "#4f46e5", height: 6 }]} // สี Indigo
            railStyle={{ backgroundColor: "#e2e8f0", height: 6 }} // สี Slate-200
            handleStyle={[
              {
                borderColor: "#4f46e5",
                backgroundColor: "#fff",
                borderWidth: 2,
                height: 20,
                width: 20,
                marginTop: -7,
                boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.3)",
                opacity: 1,
              },
              {
                borderColor: "#4f46e5",
                backgroundColor: "#fff",
                borderWidth: 2,
                height: 20,
                width: 20,
                marginTop: -7,
                boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.3)",
                opacity: 1,
              },
            ]}
          />
        </div>

        {/* ✅  Card */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">
              Min
            </span>
            <div className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 font-medium text-center">
              ฿{numberFormat(price[0])}
            </div>
          </div>
          <div className="pt-5 text-slate-300">-</div>
          <div className="flex-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">
              Max
            </span>
            <div className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 font-medium text-center">
              ฿{numberFormat(price[1])}
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. DIVIDER --- */}
      <hr className="border-slate-100" />

      {/* --- 5. CLEAR BUTTON --- */}
      <button
        onClick={handleClearFilter}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-300 active:scale-95"
      >
        <RotateCcw size={16} />
        Reset Filters
      </button>
    </div>
  );
};

export default SearchCard;
