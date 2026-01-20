import React from "react";
import { Mail, User, Shield, Hash, Edit3 } from "lucide-react";

const UserProfile = () => {
  // ข้อมูลจำลองตามที่คุณให้มา
  const userData = {
    id: 1,
    email: "popeyeolref@gmail.com",
    name: "chop chat",
    role: "user",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* ส่วน Header & Avatar */}
        <div className="flex flex-col items-center pt-8 pb-6">
          <div className="relative">
            {/* สร้าง Avatar จากตัวอักษรแรกของชื่อ */}
            <div className="w-24 h-24 rounded-full bg-linear-to-tr from-blue-100 to-blue-50 flex items-center justify-center text-3xl font-bold text-blue-600 shadow-inner mb-4">
              {userData.name.charAt(0).toUpperCase()}
            </div>
            {/* ปุ่มแก้ไขรูป (Mockup) */}
            <button className="absolute bottom-4 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
              <Edit3 size={14} className="text-gray-600" />
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {userData.name}
          </h2>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>

        {/* เส้นคั่น */}
        <div className="border-t border-gray-100"></div>

        {/* ส่วนรายละเอียด (Details) */}
        <div className="p-6 space-y-4">
          {/* ID Section */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                <Hash
                  size={18}
                  className="text-gray-500 group-hover:text-blue-500"
                />
              </div>
              <span className="text-sm font-medium">User ID</span>
            </div>
            <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
              #{userData.id.toString().padStart(4, "0")}
            </span>
          </div>

          {/* Role Section */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-purple-50 transition-colors">
                <Shield
                  size={18}
                  className="text-gray-500 group-hover:text-purple-500"
                />
              </div>
              <span className="text-sm font-medium">Role</span>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full uppercase tracking-wider">
              {userData.role}
            </span>
          </div>

          {/* Email Section (Redundant but good for detail view) */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-orange-50 transition-colors">
                <Mail
                  size={18}
                  className="text-gray-500 group-hover:text-orange-500"
                />
              </div>
              <span className="text-sm font-medium">Email</span>
            </div>
            <span className="text-sm text-gray-900 truncate max-w-[150px]">
              {userData.email}
            </span>
          </div>
        </div>

        {/* ปุ่ม Action ด้านล่าง */}
        <div className="p-6 pt-0">
          <button className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-gray-200 active:scale-[0.98]">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
