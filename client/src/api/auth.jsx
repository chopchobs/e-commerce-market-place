import axios from "axios";
// API Calls for Authentication - Current User/Admin 🔑
// User - token 🔑
export const CurrentUser = async (token) =>
  await axios.post(
    "http://localhost:5001/api/current-user",
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
    "http://localhost:5001/api/current-admin",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
