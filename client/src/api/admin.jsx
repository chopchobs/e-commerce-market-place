import axios from "axios";
// Admin API Calls - Orders Management 📋
const API_URL = import.meta.env.VITE_API_URL;

// --- User Management ---
// GET - Users
export const listUsers = async (token) => {
  return await axios.get(`${API_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Post - Change Status (Enable/Disable)
export const changeStatusUser = async (token, value) => {
  return await axios.post(`${API_URL}/api/admin/change-status`, value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Post - Change Role (Admin/User)
export const changeRoleUser = async (token, value) => {
  return await axios.post(`${API_URL}/api/admin/change-role`, value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Delete - User
export const removeUser = async (token, id) => {
  return await axios.delete(`${API_URL}/api/admin/remove-user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// --- Orders Management ---
// Put(edit) - Change Order Status (Admin)
export const updateOrderStatus = async (token, orderId, orderStatus) => {
  return await axios.put(
    `${API_URL}/api/admin/order-status`,
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// Get - List All Orders (Admin)
export const getOrdersAdmin = async (token) => {
  return await axios.get(`${API_URL}/api/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Delete - Delete Order (Admin)
export const deleteOrder = async (token, id) => {
  return await axios.delete(`${API_URL}/api/admin/order-delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
