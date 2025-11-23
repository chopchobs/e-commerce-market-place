import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const ecomStore = (set) => ({
  user: null,
  token: null,
  // user , token 🌎
  actionLogin: async (Data) => {
    const res = await axios.post("http://localhost:5001/api/login", Data);
    console.log(res);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
});
const userPersist = {
  //  ชื่อ Key ที่จะไปโผล่ใน LocalStorage
  name: "E-commerce Store",
};
const useEcomStore = create(persist(ecomStore, userPersist));

export default useEcomStore;
