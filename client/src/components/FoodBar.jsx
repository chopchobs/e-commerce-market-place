import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const FoodBar = () => {
  return (
    // ✨ ใช้ bg-slate-900 ที่ไม่ดำสนิท ให้ความรู้สึก Premium
    <footer className="bg-slate-900 pt-16 pb-8 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= TOP SECTION: Main Grid ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          {/* 1. Brand & About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {/* Logo Icon แบบ Minimal */}
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <span className="font-bold text-lg">L</span>
              </div>
              LOGO
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              Premium fashion designed for the modern lifestyle. Quality and
              style in every detail.
            </p>
          </div>

          {/* 2. Quick Links (Shop) */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              <FooterLink text="New Arrivals" />
              <FooterLink text="Best Sellers" />
              <FooterLink text="Men's Fashion" />
              <FooterLink text="Women's Fashion" />
            </ul>
          </div>

          {/* 3. Customer Support */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              <FooterLink text="Track Order" />
              <FooterLink text="Shipping Info" />
              <FooterLink text="Returns & Exchange" />
              <FooterLink text="Contact Us" />
            </ul>
          </div>

          {/* 4. Contact & Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Stay Connected
            </h3>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-slate-400 mb-6">
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-indigo-500" /> +66 2 123 4567
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-indigo-500" /> support@store.com
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                Bangkok, Thailand
              </p>
            </div>

            {/* Clean Input Field */}
            <form className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-slate-800/50 border border-slate-700 text-white text-sm rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
              />
              <button className="absolute right-1.5 top-1.5 p-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="h-px bg-slate-800 w-full mb-8"></div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-slate-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>

          {/* Social Icons (Clean Circle Style) */}
          <div className="flex gap-4">
            <SocialLink icon={<Facebook size={18} />} />
            <SocialLink icon={<Instagram size={18} />} />
            <SocialLink icon={<Twitter size={18} />} />
          </div>

          {/* Policy Links (Hidden on small mobile for cleaner look, visible on larger) */}
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Sub-Components (เพื่อโค้ดที่สะอาดและแก้ใขง่าย) ---

const FooterLink = ({ text }) => (
  <li>
    <a
      href="#"
      className="text-slate-400 text-sm hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1 group"
    >
      <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-indigo-500">
        <ArrowRight size={12} />
      </span>
      {text}
    </a>
  </li>
);

const SocialLink = ({ icon }) => (
  <a
    href="#"
    className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
  >
    {icon}
  </a>
);

export default FoodBar;
