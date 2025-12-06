const NewProduct = ({ item }) => {
  if (!item || !item.createdAt) return null;

  const currentDate = new Date();
  const productDate = new Date(item.createdAt);
  const diffTime = Math.abs(currentDate - productDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 7) {
    return null;
  }

  return (
    <div>
      {/* ใส่ไอคอนเล็กๆ (ถ้าชอบ) */}
      {/* <Sparkles size={10} /> */}
      <span className="absolute top-3 left-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-r-full shadow-md z-20">
        NEW ARRIVAL
      </span>
    </div>
  );
};

export default NewProduct;
