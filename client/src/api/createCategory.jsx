import axios from "axios";

export const addCategory = async (token, name) => {
  // JS

  return await axios.post("http://localhost:5001/api/category", name, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ListCategory = async (token) => {
  return await axios.get("http://localhost:5001/api/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const RemoveCategory = async (token, id) => {
  return await axios.delete("http://localhost:5001/api/category/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
