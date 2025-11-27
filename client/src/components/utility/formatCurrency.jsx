// Utility: รูปแบบเงิน (เป็น THB ตามบริบทของร้านค้า)
export const formatCurrency = (num) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(num);
};
