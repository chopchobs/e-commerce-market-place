import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FolderPlus, Trash2, Plus, GripVertical } from "lucide-react";
import {
  addCategory,
  ListCategory,
  RemoveCategory,
} from "../../api/createCategory";
import useEcomStore from "../../store/ecom-store";

const FormCategory = () => {
  // --- Store & State ---
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- Initial Fetch ---
  useEffect(() => {
    fetchCategories(token);
  }, [token]);

  //  Main Logic Functions
  const fetchCategories = async (token) => {
    try {
      const res = await ListCategory(token);
      setCategories(res.data.ListName);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };
  // handleSubmit - form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.warning("Please fill in the category name!");
    }
    setIsLoading(true);
    try {
      const res = await addCategory(token, { name });
      toast.success(`Category "${res.data.AddNameCategory.name}" Added!`);
      fetchCategories(token);
      setName(""); // Keep name
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Add failed");
    } finally {
      setIsLoading(false);
    }
  };
  // handleRemove - button
  const handleRemove = async (id) => {
    if (!confirm("Are you sure you want to delete?")) {
      toast.warning("Delete cancelled");
      return;
    }
    try {
      const res = await RemoveCategory(token, id);
      toast.success(`Deleted "${res.data.Remove.name}"`);
      fetchCategories(token);
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden font-sans">
      {/* 1. Header Section */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 shadow-sm">
          <FolderPlus size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Category Management
          </h1>
          <p className="text-sm text-slate-500">
            Create, edit, and organize product categories.
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* 2. Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Type category name here..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-700 placeholder:text-slate-400"
            disabled={isLoading}
          />
          <button
            disabled={isLoading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <Plus size={20} />
            {isLoading ? "Adding..." : "Add Category"}
          </button>
        </form>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Current Categories
          </span>
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
            {categories.length}
          </span>
        </div>

        <hr className="border-slate-100 mb-4" />

        {/* 3. List Data */}
        <ul className="space-y-3">
          {categories.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <p className="text-slate-500">
                No categories found. Add one above!
              </p>
            </div>
          ) : (
            categories.map((item) => (
              <li
                key={item.id}
                className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <GripVertical
                    size={16}
                    className="text-slate-300 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FormCategory;
