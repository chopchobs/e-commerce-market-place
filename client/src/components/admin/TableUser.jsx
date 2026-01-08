import { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { CheckCircle, Search, Trash2, UserCog, XCircle } from "lucide-react";
import { listUsers } from "../../api/admin";
import date from "../utility/date";
const TableUser = () => {
  const token = useEcomStore((state) => state.token);
  const [user, setUsers] = useState([]);
  const [isloading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch users from API
    hdlGetUsers(token);
  }, []);
  //functions  - users
  const hdlGetUsers = async (token) => {
    listUsers(token)
      .then((res) => {
        console.log("Users List (Admin): ", res.data.users);
        setUsers(res.data.users);
      })

      .catch((error) => {
        console.log("Error in getting users (Admin): ", error);
      });
  };
  //functions  - change role
  const hdlChangeRole = async () => {
    // changeUserRole(token, userId) // api call
  };
  //functions  - change status (enable/disable)
  const hdlChangeStatus = async () => {
    // changeUserStatus(token, userId) // api call
  };
  //functions  - Delete user
  const hdlDeleteUser = async () => {
    // deleteUserAdmin(token, userId) // api call
  };

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
          {user.map((item, index) => {
            return (
              <tr
                key={item.id}
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
                      {item.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="font-medium text-slate-800">
                      {item.email}
                    </div>
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
                  <select>
                    <option>Admin</option>
                    <option>User</option>
                  </select>
                </td>
                {/* 5. Status Toggle */}
                <td className="px-6 py-4 items-center">
                  <button
                    className={`
                        inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all
                        ${
                          user.enabled
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }
                    `}
                  >
                    {user.enabled ? (
                      <CheckCircle size={12} />
                    ) : (
                      <XCircle size={12} />
                    )}
                    {user.enabled ? "Active" : "Inactive"}
                  </button>
                </td>
                {/* 6. Actions */}
                <td className="px-6 py-4 items-center">
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        {/* {users.length === 0 && !isLoading && (
          <div className="text-center p-12 text-slate-500">No users found</div>
        )} */}
      </div>
    </div>
  );
};
export default TableUser;
