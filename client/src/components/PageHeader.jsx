import React from "react";
import { Link } from "react-router-dom";

// รับ Props เพื่อให้เอาไปใช้หน้าอื่นได้ด้วย (เช่น หน้า About, Contact)
const PageHeader = ({
  title = "Our Collection",
  subtitle = "Discover the latest trends crafted with passion.",
  image = null, // ถ้าอยากใส่รูปพื้นหลังในอนาคต
}) => {
  return (
    <div className="relative w-full bg-slate-50 overflow-hidden">
      {/* ================= BACKGROUND DECORATION (ลูกเล่นพื้นหลัง) ================= */}
      {/* 1. Dot Pattern (ลายจุดจางๆ) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* 2. Glowing Orbs (แสงฟุ้งๆ สี Indigo) */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl"></div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Breadcrumb (Home / Current Page) */}
          <nav className="flex justify-center items-center gap-2 text-sm text-slate-500 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-indigo-600 font-medium truncate max-w-[150px]">
              {title}
            </span>
          </nav>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {title}
            <span className="text-indigo-600">.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Border (เส้นขีดด้านล่างให้ดูจบส่วน) */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent"></div>
    </div>
  );
};

export default PageHeader;
