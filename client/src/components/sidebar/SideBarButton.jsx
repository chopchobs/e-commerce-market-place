// Component สำหรับ "Button" (เช่น Logout)
// ไม่เปลี่ยน URL แต่ทำ Action
const SideBarButton = ({ icon: Icon, label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center w-full px-4 py-3.5 my-1 rounded-xl transition-all duration-300 ease-out
        text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 mt-auto
        ${className}
      `}
    >
      <Icon
        size={20}
        className="mr-3 transition-transform duration-300 group-hover:scale-110"
        strokeWidth={2}
      />
      <span className="font-medium text-sm tracking-wide">{label}</span>
    </button>
  );
};
export default SideBarButton;
