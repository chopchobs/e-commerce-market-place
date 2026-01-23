const PageHeader = () => {
  return (
    <div className="bg-white py-24 text-center">
      <div className="max-w-2xl mx-auto px-4">
        {/* หัวข้อเล็กด้านบน ใช้สี Indigo สว่างเพื่อดึงสายตา */}
        <p className="text-indigo-600 font-bold tracking-widest text-xs uppercase mb-4">
          Spring / Summer 2024
        </p>

        {/* หัวข้อหลักใช้ Indigo เข้มเกือบดำ ดูหนักแน่น */}
        <h1 className="text-4xl md:text-5xl font-semibold text-indigo-950 tracking-tight mb-6">
          Our Collection
        </h1>

        <p className="text-slate-500 font-light text-lg leading-relaxed">
          Discover the latest trends crafted with{" "}
          <span className="text-indigo-600 font-medium">passion</span> and
          simplicity.
        </p>
      </div>
    </div>
  );
};
export default PageHeader;
