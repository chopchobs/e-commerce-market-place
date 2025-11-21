import { Link } from "react-router-dom";

const MainNavAdmin = () => {
  return (
    <nav>
      <div className="mx-auto">
        <div className=" flex justify-between">
          <div className="flex items-center gap-4">
            <Link to={"/"}>LOGO</Link>
            <Link to={"/"}>HOME</Link>
            <Link to={"/"}>Shop</Link>
            <Link to={"/"}>Cart</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to={"/"}>Register</Link>
            <Link to={"/"}>Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default MainNavAdmin;
