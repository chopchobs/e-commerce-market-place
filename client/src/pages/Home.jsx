import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
  Star,
} from "lucide-react";

const Home = () => {
  // --- MOCK DATA ---
  const mockNewArrivals = [
    {
      id: 1,
      title: "iPhone 17 Pro Max Natural Titanium",
      price: 48900,
      image:
        "https://s.isanook.com/hi/0/ud/323/1615651/iphone-17-pro-on-desk-centere.jpg?ip/resize/w728/q80/jpg",
      rating: 4.8,
    },
    {
      id: 2,
      title: "MacBook Air M3 15-inch",
      price: 39900,
      image:
        "https://www.apple.com/newsroom/images/2024/03/apple-unveils-the-new-13-and-15-inch-macbook-air-with-the-powerful-m3-chip/tile/Apple-MacBook-Air-2-up-hero-240304-lp.jpg.landing-big_2x.jpg",
      rating: 4.9,
    },
    {
      id: 3,
      title: "iPad Air 5 WiFi + Cellular",
      price: 23900,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
      rating: 4.7,
    },
    {
      id: 4,
      title: "AirPods Max Silver",
      price: 19900,
      image:
        "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&q=80",
      rating: 4.6,
    },
  ];

  const mockCategories = [
    {
      name: "Laptops",
      itemCount: "12 Items",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    },
    {
      name: "Smartphones",
      itemCount: "24 Items",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    },
    {
      name: "Accessories",
      itemCount: "50+ Items",
      image:
        "https://www.flashfly.net/wp/wp-content/uploads/2021/04/airtag-accessories.jpg",
    },
  ];

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      {/* ================= 1. HERO BANNER ================= */}
      {/* Mobile: h-[80vh] เพื่อให้เห็น content เต็มตา, Desktop: h-[700px] */}
      <div className="relative h-[80vh] md:h-[700px] bg-slate-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1468495244123-6c6c332ee871?w=1600&q=80"
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-50 scale-105 animate-[kenburns_20s_infinite_alternate]"
          />
          {/* Gradient Overlay: ให้ตัวหนังสืออ่านง่ายขึ้น */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center md:justify-start text-center md:text-left">
          <div className="max-w-2xl mt-10 md:mt-0 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              New Collection 2026
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
              Discover <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-white">
                Future Tech.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 font-light">
              Experience the latest innovation with our premium selection of
              gadgets. Designed for those who dare to step ahead.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Link
                to="/shop"
                className="inline-flex justify-center items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-white/5"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. FEATURES (Service Info) ================= */}
      <div className="py-8 md:py-12 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Scroll แนวนอนได้ถ้าเนื้อหายาว หรือ Stack ลงมา */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 divide-slate-100">
            <FeatureItem
              icon={<Truck className="text-indigo-600" size={28} />}
              title="Free Shipping"
              desc="On all orders over ฿5,000"
            />
            <FeatureItem
              icon={<ShieldCheck className="text-indigo-600" size={28} />}
              title="Secure Payment"
              desc="100% protected transactions"
            />
            <FeatureItem
              icon={<RefreshCw className="text-indigo-600" size={28} />}
              title="30-Day Returns"
              desc="Easy and free return policy"
            />
          </div>
        </div>
      </div>

      {/* ================= 3. POPULAR CATEGORIES ================= */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Browse Categories
            </h2>
            <p className="text-slate-500">
              Find exactly what you are looking for
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {mockCategories.map((cat, index) => (
              <Link
                to="/shop"
                key={index}
                className="group relative h-52 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute bottom-6 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {cat.itemCount}
                  </p>
                  <h3 className="text-2xl font-bold text-white flex items-center justify-between">
                    {cat.name}
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. NEW ARRIVALS (Product Grid) ================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                New Arrivals
              </h2>
              <p className="text-slate-500 mt-2">
                Latest gadgets added to our store
              </p>
            </div>
            <Link
              to="/shop"
              className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-1 transition-colors group"
            >
              View All{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Product Grid: Mobile=2 cols, Desktop=4 cols  */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {mockNewArrivals.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Image Area */}
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Badge */}
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-indigo-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                    NEW
                  </span>

                  {/* Desktop Hover Action (Mobile will use global click) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block">
                    <button className="w-full bg-white text-slate-900 font-bold py-2 rounded-xl shadow-lg hover:bg-indigo-600 hover:text-white transition-colors flex items-center justify-center gap-2">
                      <ShoppingBag size={18} /> Add to Cart
                    </button>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-3 sm:p-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-1">
                    <Star
                      size={12}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-xs text-slate-400 font-medium">
                      {item.rating}
                    </span>
                  </div>

                  <h3
                    className="text-sm sm:text-base font-medium text-slate-700 truncate mb-1"
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-base sm:text-lg font-bold text-slate-900">
                      ฿{item.price.toLocaleString()}
                    </p>
                    {/* Mobile Only: Cart Button Icon */}
                    <button className="sm:hidden p-1.5 rounded-full bg-slate-100 text-slate-600 active:bg-indigo-600 active:text-white transition-colors">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. PROMO BANNER ================= */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-indigo-900 min-h-[300px] sm:h-[400px] flex items-center shadow-2xl shadow-indigo-200">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&q=80"
                alt="Promo"
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-linear-to-r from-indigo-900/90 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 sm:p-16 max-w-xl">
              <span className="inline-block py-1 px-3 rounded-lg bg-indigo-800/50 border border-indigo-700 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-4">
                Limited Time Offer
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
                Get 20% Off <br /> First Order
              </h2>
              <p className="text-indigo-200 mb-8 font-light text-sm sm:text-base">
                Join our community and experience premium technology at an
                unbeatable price. Use code{" "}
                <span className="font-mono text-white font-bold">
                  WELCOME20
                </span>
              </p>
              <Link
                to="/shop"
                className="inline-block w-full sm:w-auto text-center bg-white text-indigo-900 px-8 py-3.5 rounded-full font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-lg"
              >
                Claim Offer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. NEWSLETTER ================= */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-6">
            <ShoppingBag size={24} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight">
            Subscribe & Save
          </h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Join the list and get 10% off your next purchase! We promise we
            don't spam.
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <button className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

// --- Feature Item Subcomponent ---
const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 p-4 sm:p-0">
    <div className="shrink-0 p-3 bg-indigo-50 rounded-2xl">{icon}</div>
    <div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 leading-snug">{desc}</p>
    </div>
  </div>
);

export default Home;
