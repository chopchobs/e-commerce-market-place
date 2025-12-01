import ProductCard from "./ProductCard";

// ⚠️ แก้ตรงนี้: รับ props ชื่อ products (ให้ตรงกับตอนส่งมา)
const ProductList = ({ getProducts }) => {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getProducts?.length > 0 ? (
          getProducts.map((item) => (
            // loop ผ่านสินค้าแต่ละชิ้นแล้วส่งเข้า ProductCard
            <ProductCard key={item.id} item={item} />
          ))
        ) : (
          <div className="col-span-full text-center p-10 text-slate-500 bg-slate-50 rounded-lg">
            No products found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <button className="px-8 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-full hover:bg-slate-50 transition-all">
          Load More Products
        </button>
      </div>
    </div>
  );
};

export default ProductList;
