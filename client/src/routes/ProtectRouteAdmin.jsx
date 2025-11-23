import { useEffect, useState } from "react";
import { CurrentAdmin } from "../api/auth";
import useEcomStore from "../store/ecom-store";
import LoadingPage from "./Loading";

export const ProtectRouteAdmin = ({ element }) => {
  //js
  const [ok, setOk] = useState(false);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  useEffect(() => {
    if (user && token) {
      CurrentAdmin(token)
        .then((res) => setOk(true))
        .catch((err) => setOk(false));
    }
  }, [user, token]);

  return ok ? element : <LoadingPage />;
};
export default ProtectRouteAdmin;
