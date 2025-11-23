import { useEffect, useState } from "react";
import useEcomStore from "../store/ecom-store";
import { CurrentUser } from "../api/auth"; // API ตรวจสอบ Token
import LoadingPage from "./Loading"; //  Loading

const ProtectRouteUser = ({ element }) => {
  // js
  // Create State - check that "อนุญาต" หรือยัง (default = false)
  const [ok, setOk] = useState(false);
  //  User , Token จาก Store
  const user = useEcomStore((state) => state.user); // user  👨🏻‍💻🌎
  const token = useEcomStore((state) => state.token); // token 🔑🌎

  // condition 🔄
  useEffect(() => {
    // user  👨🏻‍💻🌎, token 🔑🌎
    if (user && token) {
      // send to DB
      CurrentUser(token) // API 🎯
        .then((res) => {
          // ✅ ถ้าผ่าน: เปลี่ยนสถานะเป็น OK (อนุญาตให้เข้าหน้าเว็บ)
          setOk(true);
        })
        .catch((err) => {
          // ❌ ถ้าไม่ผ่าน: ปล่อยให้ ok เป็น false เหมือนเดิม
          // (เดี๋ยว code บรรทัดสุดท้ายจะส่งไปหน้า Loading -> แล้วดีดกลับหน้าแรกเอง)
          setOk(false);
        });
    }
  }, [user, token]);
  return ok ? element : <LoadingPage />;
};
export default ProtectRouteUser;
