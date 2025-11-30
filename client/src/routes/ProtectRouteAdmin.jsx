import { useEffect, useState } from "react";
import { CurrentAdmin } from "../api/auth";
import useEcomStore from "../store/ecom-store";
import LoadingPage from "./Loading";

export const ProtectRouteAdmin = ({ element }) => {
  //js
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); //  State เช็คว่าโหลดเสร็จหรือยัง?
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  useEffect(() => {
    if (user && token) {
      // admin - api
      CurrentAdmin(token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          setOk(false);
        })
        .finally(() => {
          setLoading(false); // หยุดโหลดเมื่อรู้ผล
        });
    } else {
      // หยุดโหลดทันทีถ้าไม่มี token
      setLoading(false);
      setOk(false);
    }
  }, [user, token]);

  //
  if (loading) {
    // false เพื่อไม่ให้มันนับถอยหลัง - LoadingPage
    return <LoadingPage enableRedirect={false} />;
  }
  // ถ้า "ผ่าน" -> ให้ไปต่อ
  if (ok) {
    return element;
  }
  // ถ้า "ไม่ผ่าน" -> ดีดไป Login (ไม่ต้องรอ LoadingPage นับเวลา)
  return (
    <LoadingPage enableRedirect={true} countStart={3} redirectPath="/login" />
  );

  // return ok ? element : <LoadingPage />;
};
export default ProtectRouteAdmin;
