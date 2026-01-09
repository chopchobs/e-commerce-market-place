import { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { CheckCircle, Search, Trash2, UserCog, XCircle } from "lucide-react";
import {
  changeRoleUser,
  changeStatusUser,
  listUsers,
  removeUser,
} from "../../api/admin";
import date from "../utility/date";
import Swal from "sweetalert2";

const TableUser = () => {
  const token = useEcomStore((state) => state.token);
  const [user, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch users from API
    hdlGetUsers(token);
  }, []);
  //functions  - users
  const hdlGetUsers = async (token) => {
    setLoading(true);
    listUsers(token)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((error) => {
        console.log("Error in getting users (Admin): ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //functions  - change status (enable/disable)
  const hdlChangeStatus = async (userId, userStatus) => {
    console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus, // keep data opposite
    };
    changeStatusUser(token, value)
      .then((res) => {
        console.log("res", res);
        hdlGetUsers(token);
      })
      .catch((err) => {
        console.log("err", err);
      }); // api call
  };
  //functions  - change role
  const hdlChangeRole = async (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeRoleUser(token, value) // api call
      .then((res) => {
        console.log("res", res);
        hdlGetUsers(token);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };
  //functions  - Delete user
  const hdlDeleteUser = async (token, id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to reserver this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) result;
    setLoading(true);
    removeUser(token, id)
      .then((res) => {
        console.log("DATA", res.data);
        hdlGetUsers(token);
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log("Delete failed", err);
        Swal.fire({
          title: "Failed!",
          text: "Could not remove User.",
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // console.log("Users List: ", user);
  return (
    <div className="bg-white shadow-sm border border-slate-200 overflow-hidden font-sans">
      {/* --- Toolbar --- */}
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between item-center gap-4">
        <div className="flex font-bold text-slate-800 items-center text-xl gap-2">
          <UserCog className="text-indigo-600" size={24} />
          <h2>User Management</h2>
        </div>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search email..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          <Search
            className="absolute top-3 left-2.5 text-slate-400"
            size={18}
          />
        </div>
      </div>
      {/* --- Table --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
              <th className="px-6 py-4">No.</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
        </table>
        {/* Loop Map - Users*/}
        <tbody className="divide-y divide-slate-100 text-sm">
          {user.map((el, index) => {
            return (
              <tr
                key={el.id}
                className="hover:bg-indigo-50/30 transition-colors duration-150 group"
              >
                {/* 1. Sequence */}
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                  {index + 1}
                </td>
                {/* 2. Email */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200 text-xs">
                      {el.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="font-medium text-slate-800">{el.email}</div>
                  </div>
                </td>
                {/* 3. Date */}
                <td className="px-6 py-4 text-slate-500 text-xs text0ce">
                  {date(user.createdAt)}
                  <br />
                  <span className="text-[10px] text-slate-400">
                    Last update: {date(user.updatedAt)}
                  </span>
                </td>
                {/* 4. Role Dropdown*/}
                <td className="px-6 py-4">
                  <select
                    value={el.role}
                    onChange={(e) => hdlChangeRole(el.id, e.target.value)}
                    className={`
                        text-xs font-semibold px-2 py-1 rounded-md border-none cursor-pointer focus:ring-0
                        ${
                          el.role === "admin"
                            ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }
                    `}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
                {/* 5. Status Toggle */}
                <td className="px-6 py-4 items-center">
                  <button
                    onClick={() => hdlChangeStatus(el.id, el.enabled)}
                    className={`
                        inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all
                        ${
                          el.enabled
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }
                    `}
                  >
                    {el.enabled ? (
                      <CheckCircle size={12} />
                    ) : (
                      <XCircle size={12} />
                    )}
                    {el.enabled ? "Active" : "Inactive"}
                  </button>
                </td>
                {/* 6. Actions */}
                <td className="px-6 py-4 items-center">
                  <button
                    onClick={() => hdlDeleteUser(token, el.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        {user.length === 0 && !isLoading && (
          <div className="text-center p-12 text-slate-500">No users found</div>
        )}
      </div>
    </div>
  );
};
export default TableUser;
