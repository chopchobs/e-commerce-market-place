const NewProduct = ({ item }) => {
  // ป้องกัน Error กรณี item หรือ createdAt ไม่มีข้อมูล
  if (!item || !item.createdAt) return null;
  // Calculate days difference
  const currentDate = new Date();
  const productDate = new Date(item.createdAt);
  const diffTime = Math.abs(currentDate - productDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // validate days
  if (diffDays > 7) {
    return null;
  }
  return (
    <span
      className="absolute top-4 left-5 bg-indigo-600 text-white text-[8px] 
       font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider z-50"
    >
      New Arrival
    </span>
  );
};
export default NewProduct;
