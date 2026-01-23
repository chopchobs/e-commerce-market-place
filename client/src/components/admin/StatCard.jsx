import { TrendingUp, TrendingDown } from "lucide-react";
const StatCard = ({
  title,
  value,
  icon: Icon,
  bgIcon,
  trend,
  isUp,
  subtext,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
        </div>
        {/* ✅ เพิ่ม text-white และใช้ Icon เป็น tag */}
        <div className={`p-3 rounded-lg shadow-sm ${bgIcon} text-white`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        {subtext ? (
          <span className="text-slate-400">{subtext}</span>
        ) : (
          <>
            <span
              className={`flex items-center font-medium ${
                isUp ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isUp ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              {trend}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default StatCard;
