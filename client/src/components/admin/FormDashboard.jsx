const FormDashboard = () => {
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="text-sm font-medium bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          {/* Today */}
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      {/* Key Metrics Cards (KPIs) */}
      <div></div>
    </div>
  );
};
export default FormDashboard;
