import React, { useState } from "react";
import { User, Mail, Lock, Camera, Save, Shield } from "lucide-react";

const UserSettings = () => {
  // จำลอง State สำหรับเก็บข้อมูลในฟอร์ม
  const [formData, setFormData] = useState({
    name: "chop chat",
    email: "popeyeolref@gmail.com",
    role: "user", // ปกติค่านี้ user จะแก้เองไม่ได้
    currentPassword: "",
    newPassword: "",
  });

  // State สำหรับโหลด (Loading) เมื่อกดบันทึก
  const [isSaving, setIsSaving] = useState(false);

  // ฟังก์ชันจำลองการเปลี่ยนค่าใน Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชันจำลองการกด Save
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // จำลองการเรียก API
    setTimeout(() => {
      setIsSaving(false);
      alert("บันทึกข้อมูลเรียบร้อย!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your account preferences
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Section 1: Avatar & Basic Info */}
          <section className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group cursor-pointer">
                <div className="w-28 h-28 rounded-full bg-gray-100 border-4 border-white shadow-sm flex items-center justify-center text-4xl text-gray-400 overflow-hidden">
                  {/* รูป Placeholder หรือจะใช้ <img> */}
                  {formData.name.charAt(0).toUpperCase()}
                </div>
                {/* Overlay กล้องเมื่อเอาเมาส์ชี้ */}
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <span className="text-xs text-gray-400">
                Allowed *.jpeg, *.jpg, *.png
              </span>
            </div>

            {/* Basic Info Inputs */}
            <div className="flex-1 w-full space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Role (Read Only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                  Role
                </label>
                <div className="relative">
                  <Shield
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={formData.role.toUpperCase()}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed font-medium select-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-normal px-2 py-0.5 border border-gray-200 rounded bg-white">
                    Read Only
                  </span>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2: Contact Info */}
          <section className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800">
              Contact Email
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 ml-1">
                This email will be used for notifications and login.
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3: Security (Change Password) */}
          <section className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800">Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                  Current Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="password"
                    name="currentPassword"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all shadow-lg shadow-gray-200
                ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-800 active:scale-95"}
              `}
            >
              {isSaving ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
