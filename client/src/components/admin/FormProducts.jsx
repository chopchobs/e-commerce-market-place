import React, { useEffect, useState } from "react";
import { AddProduct } from "../../api/createProducts";
import useEcomStore from "../../store/ecom-store";
import { toast } from "sonner";
import { Package, Trash2, Edit, Plus, Image as ImageIcon } from "lucide-react"; // แนะนำให้ลง lucide-react สำหรับไอคอน

const ProductManagement = () => {
  // Global State (Zustand)
  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const fetchCategories = useEcomStore((state) => state.fetchCategories);
  const listProduct = useEcomStore((state) => state.listProduct);
  const products = useEcomStore((state) => state.products);

  // Local State
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    // เรียกข้อมูลเมื่อ Component ถูกโหลด
    fetchCategories(token);
    listProduct(token, 20); // เรียกมาสัก 20 รายการเพื่อแสดงผล
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AddProduct(token, form);
      // แสดงข้อความแจ้งเตือนเป็นภาษาอังกฤษ
      toast.success(res.data?.message || "Product added successfully");
      listProduct(token, 20); // โหลดข้อมูลใหม่หลังจากเพิ่มเสร็จ

      // Reset Form (Optional)
      setForm({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: "",
        images: [],
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };

  // Utility: จัดรูปแบบเงิน (ยังคงเป็น THB ตามบริบทของร้านค้า)
  const formatCurrency = (num) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(num);
  };

  // Utility: สีของ Badge ตามจำนวนสินค้า
  const getStockStatus = (qty) => {
    if (qty > 10) return "bg-green-100 text-green-800";
    if (qty > 0) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-sans space-y-8">
      {/* --- Header Section --- */}
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Package className="w-8 h-8 text-indigo-600" />
            Product Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your products and inventory stock
          </p>
        </div>
      </header>

      {/* --- Form Section (Card Layout) --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-700">Add New Product</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Product Name
              </label>
              <input
                onChange={handleChange}
                value={form.title}
                name="title"
                required
                type="text"
                placeholder="Ex. iPhone 15 Pro Max"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Category
              </label>
              <select
                onChange={handleChange}
                name="categoryId"
                value={form.categoryId}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all bg-white"
              >
                <option value="" disabled>
                  -- Select Category --
                </option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description (Full Width) */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                onChange={handleChange}
                value={form.description}
                name="description"
                rows="3"
                placeholder="Product details..."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Price
              </label>
              <input
                onChange={handleChange}
                value={form.price}
                name="price"
                type="number"
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Quantity
              </label>
              <input
                onChange={handleChange}
                value={form.quantity}
                name="quantity"
                type="number"
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Image Upload Placeholder (Future feature) */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Product Images
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition cursor-pointer">
                <ImageIcon className="w-8 h-8 mb-2" />
                <span className="text-sm">
                  Click to upload image (Not active)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
            >
              <Plus size={20} />
              Save Product
            </button>
          </div>
        </form>
      </div>

      {/* --- Table Section (Data Table) --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-700">Recent Products</h3>
          <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
            Total: {products?.length || 0} items
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium border-b border-slate-100">
                  Image
                </th>
                <th className="px-6 py-4 font-medium border-b border-slate-100">
                  Product Name
                </th>
                <th className="px-6 py-4 font-medium border-b border-slate-100">
                  Category
                </th>
                <th className="px-6 py-4 font-medium border-b border-slate-100 text-right">
                  Price
                </th>
                <th className="px-6 py-4 font-medium border-b border-slate-100 text-center">
                  Status
                </th>
                <th className="px-6 py-4 font-medium border-b border-slate-100 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-700 text-sm">
              {products?.length > 0 ? (
                products.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 bg-slate-200 rounded-md flex items-center justify-center text-slate-400">
                        {/* Placeholder for image */}
                        <ImageIcon size={20} />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {item.category?.name || "-"}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-indigo-600 font-medium">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatus(
                          item.quantity
                        )}`}
                      >
                        {item.quantity > 0
                          ? `${item.quantity} in stock`
                          : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-1.5 hover:bg-yellow-50 text-yellow-600 rounded-md transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 text-red-600 rounded-md transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
