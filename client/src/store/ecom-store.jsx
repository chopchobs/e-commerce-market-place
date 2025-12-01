import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ListCategory } from "../api/createCategory";
import { CountProducts, ReadProduct } from "../api/createProducts";

const ecomStore = (set) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  readProduct: null,
  // user , token 👨🏻‍💻
  actionLogin: async (Data) => {
    const res = await axios.post("http://localhost:5001/api/login", Data);
    console.log(res);
    // user , token 🌎
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  // Categories ( public )
  fetchCategories: async () => {
    try {
      const res = await ListCategory();
      set({
        categories: res.data.ListName,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // Products ( public )
  listProduct: async (count) => {
    try {
      const res = await CountProducts(count);
      set({
        products: res.data.ListProducts,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // Fetch Product Data
  fetchProduct: async (id) => {
    try {
      const res = await ReadProduct(token, id);
      // setForm with fetched data (old data)
      set({
        readProduct: res.data.ReadProducts,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },

  // Logout - clear store
  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      readProduct: null,
    });
    // Clear persisted store from localStorage
    localStorage.removeItem("ecom-store");
  },
});
// persist store to localStorage
const useEcomStore = create(
  persist(ecomStore, {
    name: "ecom-store",
    storage: createJSONStorage(() => localStorage),
    // (Optional) specify localStorage
  })
);

export default useEcomStore;
