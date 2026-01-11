import { Link } from "react-router-dom";

const LoginRegisterMenu = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to={"/login"}
        className="relative group text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300"
      >
        LOGIN
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      <Link
        to={"/register"}
        className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-200 transition-all duration-300 transform active:scale-95"
      >
        REGISTER
      </Link>
    </div>
  );
};

export default LoginRegisterMenu;
