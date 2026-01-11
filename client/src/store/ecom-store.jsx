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
const API_URL = import.meta.env.VITE_API_URL; // API URL from .env file

// Initial State
const initialState = {
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  readProduct: null,
  isOpen: false,
};
// Ecom Store
const ecomStore = (set, get) => ({
  ...initialState,
  // Logout
  Logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
      readProduct: null,
      isOpen: false,
    });
  },
  // --- Cart Action ---
  // Open - Close
  actionOpenCart: () => set({ isOpen: true }),
  actionCloseCart: () => set({ isOpen: false }),
  // Calculated
  actionTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
  // Update Quantity , Remove // Cart 🛒
  actionUpdateQuantity: async (productId, newQuantity) => {
    console.log("actionUpdateQuantity", productId, newQuantity);
    set((state) => ({
      carts: state.carts.map((item) => {
        return item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item;
      }),
    }));
  },
  actionRemoveProduct: async (productId) => {
    console.log("actionRemoveProduct");
    set((state) => ({
      carts: state.carts.filter((item) => {
        return item.id !== productId;
      }),
    }));
  },
  // Cart Add
  actionAddToCart: async (item) => {
    const carts = get().carts;
    // 1. find product that on cart or not
    const index = _.findIndex(carts, { id: item.id });
    console.log("index", index);
    // 🟢 A have product - add plus (update count)
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
  // clearCart
  clearCart: () => {
    set({ carts: [] });
  },
  // --------------------  System --------------------
  // user , token 👨🏻‍💻
  actionLogin: async (Data) => {
    const res = await axios.post(`${API_URL}/api/login`, Data);
    // console.log(res);
    // user , token 🌎
    // console.log("SERVER RESPONSE:", res.data.payload);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
    // 🟢 Update User Data
  },
  // 🟢 Update User Data
  actionUpdateUser: (newData) =>
    set((state) => ({
      user: { ...state.user, ...newData },
    })),
  // Logout (Reset to Initial State)
  logout: () => {
    set(initialState);
    localStorage.removeItem("ecom-store");
  },
});

// Persist Store
const useEcomStore = create(
  persist(ecomStore, {
    name: "ecom-store",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useEcomStore;
