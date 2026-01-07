import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import {
  Save,
  Image as ImageIcon,
  X,
  ArrowLeft,
  Loader2,
  LayoutDashboard,
  Layers,
  DollarSign,
  Box,
} from "lucide-react";
import Resizer from "react-image-file-resizer";
import { useParams, useNavigate } from "react-router-dom";
// API Import
import {
  ReadProduct,
  RemoveImage,
  UpdateProducts,
  UploadImages,
} from "../../api/createProducts";
import Swal from "sweetalert2";

const FormEditProduct = () => {
  // --- Global State & Router ---
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const fetchCategories = useEcomStore((state) => state.fetchCategories);
  // --- Local State ---
  const [isLoading, setIsLoading] = useState(false); // Loading รูปภาพ
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading สำหรับ Save
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });
  // --- Load Data ---
  useEffect(() => {
    fetchCategories(token); // ดึงหมวดหมู่สินค้า
    FetchProduct(token, id); // ดึงรายละเอียดสินค้า
  }, [token, id]);
  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // Fetch Product Details - Read API
  const FetchProduct = async (token, id) => {
    try {
      const res = await ReadProduct(token, id);
      console.log("Product Data:", res.data);
      // fetched data (old data)
      setForm({
        title: res.data.ReadProducts.title,
        description: res.data.ReadProducts.description,
        price: res.data.ReadProducts.price,
        quantity: res.data.ReadProducts.quantity,
        categoryId: res.data.ReadProducts.categoryId,
        images: res.data.ReadProducts.images,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      Swal.fire({
        title: "Error fetching product data",
        icon: "error",
      });
    }
  };
  // Handle Form Submit - Update API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await UpdateProducts(token, id, form);
      Swal.fire({
        title: res.data?.message || "Update Product Success!",
        icon: "success",
      });
      navigate("/admin/product"); // fly back to product list
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Update Failed",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // Image Upload Handler🖼️ ✅
  const handleChangeImages = (e) => {
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          Swal.fire({
            title: `File ${file.name} is not an image!`,
            icon: "warning",
          });
          continue;
        }
        Resizer.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            UploadImages(token, data)
              .then((res) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  images: [...prevForm.images, res.data.uploadResult],
                }));
                Swal.fire({
                  title: "Image Uploaded",
                  icon: "success",
                });
              })
              .catch((error) => {
                console.log(error);
                Swal.fire({
                  title: "Upload Failed",
                  icon: "error",
                });
              })
              .finally(() => setIsLoading(false));
          },
          "base64"
        );
      }
    }
  };
  // Remove Image Handler🖼️ ⛔️
  const handleRemoveImage = (public_id) => {
    // Optimistic Update: ลบออกจากหน้าจอก่อน
    const images = form.images;
    const updatedImages = images.filter((item) => item.public_id !== public_id);
    setForm({
      ...form,
      images: updatedImages,
    });

    // ยิง API ลบทีหลัง
    RemoveImage(token, public_id)
      .then((res) => {
        Swal.fire({
          title: res.data.message || "Image removed successfully",
          icon: "success",
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
  // --- Render Layout ---
  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-slate-50 pb-20 font-sans"
    >
      {/* ---  Header --- */}
      <div className=" top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/product")}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Edit Product</h1>
            <p className="text-xs text-slate-500">ID: {id}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/product")}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm transition-all hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Info (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <LayoutDashboard className="w-5 h-5 text-indigo-500" />
              <h3 className="font-semibold text-slate-700">
                Basic Information
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Product Title
                </label>
                <input
                  onChange={handleChange}
                  value={form.title}
                  name="title"
                  required
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                  placeholder="Ex. iPhone 15 Pro Max"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  value={form.description}
                  name="description"
                  rows="6"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm resize-none"
                  placeholder="Product details..."
                />
              </div>
            </div>
          </div>

          {/* Card 2: Pricing & Inventory */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <DollarSign className="w-5 h-5 text-indigo-500" />
              <h3 className="font-semibold text-slate-700">
                Pricing & Inventory
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500">฿</span>
                  </div>
                  <input
                    onChange={handleChange}
                    value={form.price}
                    name="price"
                    type="number"
                    min="0"
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Quantity
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Box size={16} className="text-slate-400" />
                  </div>
                  <input
                    onChange={handleChange}
                    value={form.quantity}
                    name="quantity"
                    type="number"
                    min="0"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Organization & Media (1/3 width) */}
        <div className="space-y-6">
          {/* Card 3: Organization (Category) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
              <Layers className="w-5 h-5 text-indigo-500" />
              <h3 className="font-semibold text-slate-700">Organization</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select
                  onChange={handleChange}
                  name="categoryId"
                  value={form.categoryId}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white text-sm"
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
            </div>
          </div>

          {/* Card 4: Media Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-500" />
                <h3 className="font-semibold text-slate-700">Media</h3>
              </div>
              <span className="text-xs text-slate-400">
                {form.images?.length} images
              </span>
            </div>

            {/* Upload Area */}
            <label className="block w-full border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:bg-slate-50 hover:border-indigo-400 transition-all bg-white">
              {isLoading ? (
                <div className="flex flex-col items-center animate-pulse">
                  <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mb-2" />
                  <span className="text-xs text-slate-500">Uploading...</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <ImageIcon className="text-slate-400" size={20} />
                  </div>
                  <span className="text-sm font-medium text-indigo-600">
                    Click to upload
                  </span>
                  <p className="text-xs text-slate-400 mt-1">JPEG, PNG</p>
                </>
              )}
              <input
                type="file"
                name="images"
                multiple
                onChange={handleChangeImages}
                className="hidden"
                disabled={isLoading}
              />
            </label>

            {/* Image List (Grid) */}
            {form.images && form.images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {form.images.map((item, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200"
                  >
                    {/* Image */}
                    <img
                      src={item.secure_url}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(item.public_id)}
                      className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                      title="Remove Image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormEditProduct;
