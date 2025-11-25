import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ListCategory } from "../api/createCategory";
import { CountProducts } from "../api/createProducts";

const ecomStore = (set) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
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
  fetchCategories: async (token) => {
    try {
      const res = await ListCategory(token);
      set({
        categories: res.data.ListName,
      });
    } catch (error) {
      console.log(error);
    }
  },
  listProduct: async (token, count) => {
    try {
      const res = await CountProducts(token, count);
      set({
        products: res.data.ListProducts,
      });
    } catch (error) {
      console.log(error);
    }
  },
});
const userPersist = {
  //  ชื่อ Key ที่จะไปโผล่ใน LocalStorage
  name: "E-commerce Store",
};
const useEcomStore = create(persist(ecomStore, userPersist));

export default useEcomStore;
