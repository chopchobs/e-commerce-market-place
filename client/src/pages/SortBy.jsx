import { useEffect, useState, useRef } from "react";
import useEcomStore from "../store/ecom-store";
import { ChevronDown, ArrowUpDown, Check } from "lucide-react";

const SortBy = () => {
  // zustand
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters,
  );

  // State
  const [sort, setSort] = useState("newest");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    actionSearchFilters({ sort: sort });
  }, [sort]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { value: "newest", label: "Newest Arrivals" },
    { value: "popular", label: "Most Popular" },
    { value: "price_asc", label: "Price: Low - High" },
    { value: "price_desc", label: "Price: High - Low" },
  ];

  const handleSelect = (value) => {
    setSort(value);
    setIsOpen(false);
  };

  // หา Label ที่เลือกอยู่
  const selectedLabel = options.find((opt) => opt.value === sort)?.label;

  return (
    <div className="relative w-full md:w-auto font-sans z-20" ref={dropdownRef}>
      {/* --- BUTTON TRIGGER --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full h-10 sm:h-11 bg-white border rounded-xl px-3 sm:px-4 transition-all shadow-sm outline-none
          ${
            isOpen
              ? "border-indigo-500 ring-2 ring-indigo-100"
              : "border-slate-200 hover:border-indigo-300"
          }
        `}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <ArrowUpDown size={16} className="text-indigo-600 shrink-0" />

          <div className="flex items-center gap-1 truncate">
            {/* ซ่อนคำว่า Sort by บนมือถือ เพื่อประหยัดที่ */}
            <span className="text-slate-500 text-sm hidden sm:inline whitespace-nowrap">
              Sort by:
            </span>

            {/* ✨ ปรับตัวหนังสือ: 
                - text-xs (มือถือ), text-sm (จอใหญ่) 
                - whitespace-nowrap (ห้ามขึ้นบรรทัดใหม่) 
            */}
            <span className="font-bold text-slate-800 text-xs sm:text-sm whitespace-nowrap">
              {selectedLabel}
            </span>
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`text-slate-400 ml-2 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* --- DROPDOWN MENU --- */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 min-w-full w-max max-w-[250px] bg-white rounded-xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* ✨ w-max: ขยายความกว้างตามตัวหนังสือด้านใน (แก้ปัญหาตัวหนังสือไม่เต็ม)
             ✨ min-w-full: อย่างน้อยต้องกว้างเท่าปุ่ม
             ✨ max-w-[250px]: ไม่ให้กว้างเกินไปจนล้นจอ
          */}
          <ul className="py-1">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between gap-3 transition-colors
                    ${
                      sort === option.value
                        ? "bg-indigo-50 text-indigo-700 font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <span className="whitespace-nowrap">{option.label}</span>

                  {/* Icon Check */}
                  {sort === option.value && (
                    <Check size={16} className="text-indigo-600 shrink-0" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortBy;
