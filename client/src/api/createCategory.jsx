import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
// API Calls for Categories - CRUD Operations 📦
// Category - Create
export const addCategory = async (token, name) => {
  // API Call to create category
  return await axios.post(`${API_URL}/api/category`, name, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Category (Public) - List
export const ListCategory = async () => {
  return await axios.get(`${API_URL}/api/categories`);
};
// Category - Update
export const updateCategory = async (token, id, name) => {
  return await axios.put(`${API_URL}/api/category/` + id, name, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Category - Remove
export const RemoveCategory = async (token, id) => {
  return await axios.delete(`${API_URL}/api/category/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
