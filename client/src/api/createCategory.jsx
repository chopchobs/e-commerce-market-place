import axios from "axios";
// API Calls for Categories - CRUD Operations📦
// Category - Create
export const addCategory = async (token, name) => {
  // JS

  return await axios.post("http://localhost:5001/api/category", name, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Category - List
export const ListCategory = async (token) => {
  return await axios.get("http://localhost:5001/api/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Category - Remove
export const RemoveCategory = async (token, id) => {
  return await axios.delete("http://localhost:5001/api/category/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
