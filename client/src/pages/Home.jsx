import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import useEcomStore from "../store/ecom-store"; // (Optional) ถ้าจะดึงสินค้าจริงมาโชว์

const Home = () => {
  // --- MOCK DATA (ข้อมูลจำลองสำหรับโชว์หน้า Home) ---
  // ในการใช้งานจริง คุณอาจจะดึงสินค้า New Arrivals 4-8 ชิ้นมาจาก Store
  // const products = useEcomStore((state) => state.products).slice(0, 4);
  const mockNewArrivals = [
    {
      id: 1,
      title: "iPhone 15 Pro Max",
      price: 48900,
      image:
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&q=80",
    },
    {
      id: 2,
      title: "MacBook Air M3",
      price: 39900,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=500&q=80",
    },
    {
      id: 3,
      title: "iPad Air 5",
      price: 23900,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
    },
    {
      id: 4,
      title: "AirPods Max",
      price: 19900,
      image:
        "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&q=80",
    },
  ];

  const mockCategories = [
    {
      name: "Laptops",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    },
    {
      name: "Smartphones",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1600086827875-a63c01f1554c?w=400&q=80",
    },
  ];

  return (
    <div className="bg-white font-sans">
      {/* ================= 1. HERO BANNER (ส่วนหัวขนาดใหญ่) ================= */}
      <div className="relative h-[600px] md:h-[700px] bg-slate-900 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <img
          src="https://images.unsplash.com/photo-1468495244123-6c6c332ee871?w=1600&q=80"
          alt="Hero Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-600/80 text-white text-sm font-medium mb-4 backdrop-blur-sm">
              New Collection 2024
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Discover the Future <br /> of Technology.
            </h1>
            <p className="text-lg text-slate-200 mb-8 leading-relaxed">
              Explore our latest range of premium gadgets and accessories
              designed to elevate your lifestyle. Quality you can trust.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-white/10"
            >
              Shop Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= 2. FEATURES (จุดเด่นของร้าน) ================= */}
      <div className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <FeatureItem
              icon={<Truck size={32} />}
              title="Free Shipping"
              desc="On all orders over ฿5,000"
            />
            <FeatureItem
              icon={<ShieldCheck size={32} />}
              title="Secure Payment"
              desc="100% protected transactions"
            />
            <FeatureItem
              icon={<RefreshCw size={32} />}
              title="30-Day Returns"
              desc="Easy and free return policy"
            />
          </div>
        </div>
      </div>

      {/* ================= 3. POPULAR CATEGORIES (หมวดหมู่ยอดฮิต) ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10 text-center tracking-tight">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockCategories.map((cat, index) => (
              <Link
                to="/shop"
                key={index}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/20 to-transparent transition-opacity group-hover:opacity-90"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {cat.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm text-indigo-200 font-medium group-hover:text-white transition-colors">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. NEW ARRIVALS (สินค้ามาใหม่) ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              New Arrivals
            </h2>
            <Link
              to="/shop"
              className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockNewArrivals.map((item) => (
              // --- Mock Product Card (ใช้ Card จริงของคุณแทนได้เลย) ---
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden border border-slate-100"
              >
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm uppercase tracking-wider">
                    New
                  </span>
                  {/* Quick Add Button */}
                  <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    <ShoppingBag size={18} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-slate-800 truncate mb-1">
                    {item.title}
                  </h3>
                  <p className="text-lg font-bold text-indigo-600">
                    ฿{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. PROMO BANNER (แบนเนอร์โปรโมชั่น) ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-indigo-600 h-[400px] flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&q=80"
                alt="Promo"
                className="w-full h-full object-cover opacity-30 mix-blend-overlay"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-16 md:w-1/2">
              <span className="block text-indigo-200 text-sm font-bold uppercase tracking-wider mb-4">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                Get 20% Off <br /> Your First Order
              </h2>
              <p className="text-indigo-100 mb-8">
                Use code{" "}
                <span className="font-bold text-white bg-white/20 px-2 py-1 rounded">
                  WELCOME20
                </span>{" "}
                at checkout. Don't miss out!
              </p>
              <Link
                to="/shop"
                className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg inline-block"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. NEWSLETTER (สมัครรับข่าวสาร) ================= */}
      <section className="py-24 bg-slate-900 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-slate-300 mb-8">
            Sign up for deals, new products, and more. Unsubscribe at any time.
          </p>
          <form className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-500 transition-all shadow-lg whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

// --- Component ย่อยสำหรับ Feature Icons ---
const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center md:items-start p-4">
    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
    <p className="text-sm text-slate-500">{desc}</p>
  </div>
);

export default Home;
