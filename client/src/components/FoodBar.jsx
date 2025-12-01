import React from "react";

import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const FoodBar = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
              LOGO
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              We are a premium fashion retailer dedicated to providing the best
              quality clothing and accessories for modern lifestyle.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Shop
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "New Arrivals",
                "Best Sellers",
                "Men",
                "Women",
                "Accessories",
                "Sale",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "Track Order",
                "Returns & Exchanges",
                "Shipping Info",
                "Size Guide",
                "FAQ",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Get in Touch
            </h3>
            <ul className="space-y-4 text-sm mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-indigo-500 mt-0.5" />
                <span>
                  123 Fashion Street, Siam Square,
                  <br />
                  Bangkok, Thailand 10330
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-indigo-500" />
                <span>+66 2 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-500" />
                <span>support@ecom-store.com</span>
              </li>
            </ul>

            {/* Newsletter Input */}
            <div>
              <h4 className="text-white text-xs font-bold mb-2 uppercase">
                Subscribe to our newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-md focus:outline-none focus:border-indigo-500 text-sm text-white"
                />
                <button className="bg-indigo-600 px-4 py-2 text-white rounded-r-md hover:bg-indigo-700 transition-colors text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FoodBar;
