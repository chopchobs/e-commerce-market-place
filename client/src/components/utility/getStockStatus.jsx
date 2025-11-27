// Utility: สีของ Badge ตามจำนวนสินค้า
export const getStockStatus = (qty) => {
  if (qty > 10) return "bg-green-100 text-green-800";
  if (qty > 0) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};
