import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  FolderPlus,
  Trash2,
  Plus,
  GripVertical,
  Pencil,
  Save,
  X,
  Loader2,
} from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import {
  addCategory,
  RemoveCategory,
  updateCategory,
} from "../../api/createCategory";
import Swal from "sweetalert2";

const FormCategory = () => {
  // zustand store 🌎
  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const fetchCategories = useEcomStore((state) => state.fetchCategories);

  // States - Add Category
  const [name, setName] = useState(""); // Name to add
  const [isLoading, setIsLoading] = useState(false);
  // States - Edit Category(id, name)
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState(""); // Name being edited

  // Fetch Categories on mount
  useEffect(() => {
    fetchCategories(token);
  }, [token, fetchCategories]);

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate name
    if (!name.trim())
      return Swal.fire({
        icon: "warning",
        title: "Please, fill in the category name!",
      });
    const isDuplicate = categories.some((item) => {
      return item.name.toLowerCase() === name.trim().toLowerCase();
    });
    // validate isDuplicate (ซ้ำ)
    if (isDuplicate) {
      return Swal.fire({
        icon: "warning",
        title: `Category "${name}" already exists!`,
      });
    }
    setIsLoading(true);
    try {
      const res = await addCategory(token, { name });
      Swal.fire({
        title: `Category "${res.data.AddNameCategory.name}" Added!`,
        icon: "success",
      });
      fetchCategories(token); // refresh list
      setName(""); // clear input
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "Add failed",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Handle Remove
  const handleRemove = async (id, categoryName) => {
    const result = await Swal.fire({
      title: `Are you sure to delete "${categoryName}"?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await RemoveCategory(token, id);
        Swal.fire({
          icon: "success",
          title: `Deleted "${categoryName}"`,
        });
        fetchCategories(token);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: `Delete "${categoryName}" failed!`,
        });
      }
    }
  };

  // Start edit
  const startEdit = (category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };
  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };
  // Update category
  const handleUpdate = async (id) => {
    if (!editName.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Name cannot be empty!",
      });
    }
    try {
      await updateCategory(token, id, { name: editName });
      Swal.fire({
        icon: "success",
        title: "Category updated!",
      });
      setEditingId(null); // exit edit mode
      fetchCategories(token);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: ` Category  "${editName}" already exists`,
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 shadow-sm">
          <FolderPlus size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Category Management
          </h1>
          <p className="text-sm text-slate-500">
            Create and manage your product categories.
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Add Form */}
        <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Type category name here..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-700"
            disabled={isLoading}
          />
          <button
            disabled={isLoading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Plus size={20} />
            )}
            Add
          </button>
        </form>

        {/* Counter */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Current Categories
            </span>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {categories.length}
            </span>
          </div>
        </div>

        <hr className="border-slate-100 mb-4" />

        {/* List Data */}
        <ul className="space-y-3">
          {categories.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <p className="text-slate-500">No categories found.</p>
            </div>
          ) : (
            categories.map((item) => (
              <li
                key={item.id}
                className={`group flex items-center justify-between p-4 bg-white border rounded-xl transition-all duration-200 ${
                  editingId === item.id
                    ? "border-indigo-500 shadow-md ring-1 ring-indigo-500"
                    : "border-slate-100 hover:border-indigo-200 hover:shadow-sm"
                }`}
              >
                {/* Content: Check if Editing */}
                {editingId === item.id ? (
                  // --- Edit Mode ---
                  <div className="flex-1 flex items-center gap-3">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:border-indigo-500 text-slate-700"
                      autoFocus
                    />
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      title="Save"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 bg-slate-200 text-slate-600 rounded-md hover:bg-slate-300"
                      title="Cancel"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  // --- View Mode ---
                  <>
                    <div className="flex items-center gap-3">
                      <GripVertical
                        size={16}
                        className="text-slate-300 cursor-grab opacity-0 group-hover:opacity-100"
                      />
                      <span className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Edit Button */}
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FormCategory;
