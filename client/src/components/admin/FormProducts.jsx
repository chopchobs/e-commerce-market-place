import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { toast } from "sonner";
import {
  Package,
  Trash2,
  Edit,
  Plus,
  Image as ImageIcon,
  X,
} from "lucide-react"; // เพิ่ม X icon
import Resizer from "react-image-file-resizer";
import Swal from "sweetalert2";

// API Import
import {
  AddProduct,
  RemoveImage,
  RemoveProducts,
  UploadImages,
} from "../../api/createProducts"; // ตรวจสอบ path ให้ถูก
import { formatCurrency } from "../utility/formatCurrency";
import { getStockStatus } from "../utility/getStockStatus";
import { Link } from "react-router-dom";

const FormProducts = () => {
  // Global State (Zustand)🌎
  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const fetchCategories = useEcomStore((state) => state.fetchCategories);
  const listProduct = useEcomStore((state) => state.listProduct);
  const products = useEcomStore((state) => state.products);
  const [isLoading, SetIsLoading] = useState(false);
  // Local State (Form) 📦
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
    listProduct(token, 20); // เรียกจำนวน 20 รายการเพื่อแสดงผล
  }, []);
  // Handle - Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AddProduct(token, form);
      Swal.fire({
        title: res.data?.message || "Product added successfully",
        icon: "success",
      });
      await listProduct(token, 20); // โหลดข้อมูลใหม่-หลังจากเพิ่มเสร็จ
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
  // Handle - Change Form Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // Handle - Delete Product
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await RemoveProducts(token, id);
          Swal.fire({
            title: "Product deleted successfully",
            icon: "success",
          });
          await listProduct(token, 20); // Reload products after deletion
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Failed to delete product",
            icon: "error",
          });
        }
      }
    });
  };
  // Handle - Upload Image
  const handleChangeImages = (e) => {
    const files = e.target.files;
    if (files) {
      SetIsLoading(true);
      let allFiles = form.images; // [] empty array
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Validate Type
        if (!file.type.startsWith("image/")) {
          Swal.fire({
            title: `File ${file.name} is not an image!`,
            icon: "warning",
          });
          continue;
        }
        // Resize & Upload
        Resizer.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          // data after resizing
          async (data) => {
            // Endpoint Upload API
            await UploadImages(token, data)
              .then((res) => {
                allFiles.push(res.data.uploadResult);
                console.log(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                Swal.fire({
                  title: "Upload Success!!",
                  icon: "success",
                });
                SetIsLoading(false);
              })
              .catch((error) => {
                console.log(error);
                Swal.fire({
                  title: "Upload Failed!!",
                  icon: "error",
                });
                SetIsLoading(false);
              });
          },
          "base64" // output type
        );
      }
    }
  };
  // Handle - Remove Image
  const handleRemoveImage = async (public_id) => {
    const images = form.images;
    // Call API to remove from server
    await RemoveImage(token, public_id)
      .then(async (res) => {
        // Filter out the removed image from the form's images array
        const updatedImages = await images.filter((item) => {
          return item.public_id !== public_id;
        });
        Swal.fire({
          title: res.data.message || "Image removed successfully",
          icon: "success",
        });
        setForm({
          ...form,
          images: updatedImages,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Failed to remove image",
          icon: "error",
        });
      });
  };
  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-sans space-y-8">
      {/* --- Header Section --- */}
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Package className="w-8 h-8 text-indigo-400" />
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

            {/* Image */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Product Images
              </label>
              <label className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition cursor-pointer">
                {/* เช็คสถานะ Loading (ถ้ามี state isLoading) */}
                {isLoading ? (
                  <div className="animate-pulse">Uploading...</div>
                ) : (
                  <ImageIcon className="w-8 h-8 mb-2" />
                )}
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleChangeImages}
                  className="hidden"
                ></input>
                <span className="text-sm">Click to upload image</span>
              </label>
              {/*  Preview Area ⭐  */}
              {form.images && form.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {/* Loop through images */}
                  {form.images.map((item, index) => (
                    <div
                      key={index}
                      className="relative group w-full h-32 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden shadow-sm"
                    >
                      {/* Picture */}
                      <img
                        src={item.secure_url}
                        alt="preview"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />

                      {/* X Delete */}
                      <button
                        type="button"
                        // Call function with public_id for remove
                        onClick={() => handleRemoveImage(item.public_id)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
      {/* Card Layout */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Head */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-700">Recent Products</h3>
          <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
            Total: {products?.length || 0} items
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {/* tr - row*/}
              <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                {/* th - head */}
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
                      <div className=" relative group w-25 h-25 bg-slate-200 rounded-md flex items-center justify-center text-slate-400 overflow-hidden">
                        {/* Placeholder for image */}
                        {/* รูปแรก [0] */}
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0].secure_url}
                            alt={item.title}
                            value={form.images}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={32} />
                        )}
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
                    {/* Action Products */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {/* Edit  */}
                        <Link
                          to={"/admin/product/" + item.id}
                          className="p-1.5 hover:bg-yellow-100 text-yellow-600 rounded-md transition-colors"
                        >
                          <Edit size={24} />
                        </Link>
                        {/* Delete  */}
                        <div
                          onClick={() => handleDeleteProduct(item.id)}
                          type="button"
                          className="p-1.5 hover:bg-red-100 text-red-600 rounded-md transition-colors"
                        >
                          <Trash2 size={24} />
                        </div>
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

export default FormProducts;
