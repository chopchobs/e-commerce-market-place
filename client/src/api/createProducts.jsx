import axios from "axios";

export const AddProduct = async (token, data) => {
  return await axios.post("http://localhost:5001/api/product", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const CountProducts = async (token, count = 20) => {
  return await axios.get("http://localhost:5001/api/products/" + count, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const ListProducts = async (token, id) => {
  return await axios.get("http://localhost:5001/api/products/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const UpdateProducts = async (token, id) => {
  return await axios.put("http://localhost:5001/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const RemoveProducts = async (token, id) => {
  return await axios.delete("http://localhost:5001/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const FilterProducts = async (token, data) => {
  return await axios.post("http://localhost:5001/api/product-by", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const SearchProducts = async (token, data) => {
  return await axios.post("http://localhost:5001/api/search/filter", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Image - Upload
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
// Image - Delete
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
