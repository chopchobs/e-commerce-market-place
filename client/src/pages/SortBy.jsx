import { useEffect, useState } from "react";
import useEcomStore from "../store/ecom-store";

const SortBy = () => {
  // zustand
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  // State keep data
  const [sort, setSort] = useState("newest"); // default

  // call function and follow
  useEffect(() => {
    // ส่งไปแค่ sort เดี๋ยว Store เอาไปรวมกับ Category/Price เอง
    actionSearchFilters({ sort: sort });
  }, [sort]);

  // function onchange for Dropdown
  const hldOnChange = async (e) => {
    console.log("SetSort:", e.target.value);
    setSort(e.target.value);
  };
  return (
    <div>
      <span className="text-sm text-slate-500 hidden sm:block">Sort by:</span>
      <select
        value={sort} // ผูกค่ากับ State
        onChange={hldOnChange}
        className="text-sm border-none focus:ring-0 font-medium text-slate-700 bg-transparent cursor-pointer hover:text-indigo-600"
      >
        {/* set value equal to BD */}
        <option value="popular">Most Popular</option>
        <option value="newest">Newest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
};
export default SortBy;
