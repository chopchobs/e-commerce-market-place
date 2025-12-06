import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ListCategory } from "../api/createCategory";
import {
  CountProducts,
  ReadProduct,
  SearchProducts,
} from "../api/createProducts";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  readProduct: null,
  isOpen: false,
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
  // Cart
  actionAddToCart: async (item) => {
    const carts = get().carts;
    // 1. find product that on cart or not
    const index = _.findIndex(carts, { id: item.id });
    console.log("index", index);
    // 🟢A have product - add plus (update count)
    if (index !== -1) {
      // New Array for safe
      const newCarts = [...carts];
      // direct to adjust by Original value is +1
      newCarts[index] = {
        ...newCarts[index],
        count: newCarts[index].count + 1,
      };
      console.log("newCarts", newCarts);
      set({ carts: newCarts }); // record
    } else {
      // 🔵 B not have product - (add new product )
      set({
        carts: [...carts, { ...item, count: 1 }],
      });
    }
  },

  // Categories ( public )
  fetchCategories: async () => {
    try {
      const res = await ListCategory();
      set({
        categories: res.data.ListCategoryName,
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

  // Fetch Product Data by ID ( for Read , Update , Delete )
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

  // SearchFilter ( public ) - Query, Category, Price
  actionSearchProduct: async (arg) => {
    try {
      const res = await SearchProducts(arg);
      set({
        products: res.data.SearchFilter || [],
      });
    } catch (error) {
      console.error("Error searching products:", error);
    }
  },

  // --- Cart Action ---
  actionOpenCart: () => set({ isOpen: true }),
  actionCloseCart: () => set({ isOpen: false }),

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
