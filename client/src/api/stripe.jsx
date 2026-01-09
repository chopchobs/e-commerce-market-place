import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
// Payment
export const payment = async (token) =>
  await axios.post(
    `${API_URL}/api/user/create-payment-intent`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
