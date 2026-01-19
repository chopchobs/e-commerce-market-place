import { Search, Bell, MessageSquare, Settings } from "lucide-react";

const AdminHeader = ({ title = "Dashboard Overview" }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      {/* Left Side: Page Title & Breadcrumbs */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Admin Panel <span className="text-slate-300 mx-2"></span>
        </p>
      </div>

      {/* Right Side: Search & Actions */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full w-64 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
          <button className="relative p-2 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 rounded-full transition-colors">
            <MessageSquare size={20} />
          </button>

          <button className="relative p-2 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
          </button>

          <button className="relative p-2 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 rounded-full transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
