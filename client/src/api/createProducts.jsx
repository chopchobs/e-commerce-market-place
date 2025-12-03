import axios from "axios";

// API Calls for Products - CRUD Operations 📦
// Product - Create
export const AddProduct = async (token, data) => {
  return await axios.post("http://localhost:5001/api/product", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Product (Public) - Read Count
export const CountProducts = async (count = 20) => {
  return await axios.get("http://localhost:5001/api/products/" + count);
};
// Product - Read ID
export const ReadProduct = async (token, id) => {
  return await axios.get("http://localhost:5001/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Product - Update
export const UpdateProducts = async (token, id, form) => {
  return await axios.put("http://localhost:5001/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Product - Delete
export const RemoveProducts = async (token, id) => {
  return await axios.delete("http://localhost:5001/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Product - Filter
export const FilterProducts = async (token, data) => {
  return await axios.post("http://localhost:5001/api/product-by", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Product - Search (Public)
export const SearchProducts = async (arg) => {
  return await axios.post("http://localhost:5001/api/search/filter", arg);
};

// IMAGE API - Operations(Upload, Delete)🖼️ ✅,⛔️
// Image - 1.Upload
export const UploadImages = async (token, data) => {
  return await axios.post(
    "http://localhost:5001/api/image",
    { images: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// Image - 2.Delete
export const RemoveImage = async (token, public_id) => {
  return await axios.post(
    "http://localhost:5001/api/removeImage",
    { public_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
