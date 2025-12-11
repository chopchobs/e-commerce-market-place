import axios from "axios";

// GET - Users
export const listUsers = async (token) => {
  return await axios.get("http://localhost:5001/api/users", token, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Post - Change Status
export const changeStatusUser = async (token, data) => {
  return await axios.post(
    "http://localhost:5001/api/change-status",
    token,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// Post - Change Role
export const changeRoleUser = async (token, data) => {
  return await axios.post(
    "http://localhost:5001/api/change-role",
    token,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// Post - Create User's Cart
export const createUserCart = async (token, cart) => {
  return await axios.post("http://localhost:5001/api/user/cart", cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Get - List User's Cart
export const listUserCart = async (token) => {
  return await axios.get("http://localhost:5001/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Delete - Remove Cart's User
export const removeUserCart = async (token) => {
  return await axios.delete("http://localhost:5001/api/user/cart", token, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Post - Address User's Cart
export const addressUserCart = async (token, data) => {
  return await axios.post("http://localhost:5001/api/user/address", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// ------ Order ------
// Post - Save User's Orders
export const saveUserOrder = async (token, payload) => {
  return await axios.post("http://localhost:5001/api/user/order", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Get - List User's Orders
export const listUserOrder = async (token, cart) => {
  return await axios.get("http://localhost:5001/api/user/order", cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
