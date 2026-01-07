import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
// API Calls for Authentication - Current User/Admin 🔑
// User - token 🔑
export const CurrentUser = async (token) =>
  await axios.post(
    `${API_URL}/api/current-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
// Admin - token 🔑
export const CurrentAdmin = async (token) => {
  return await axios.post(
    `${API_URL}/api/current-admin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
