import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle,
  Mail,
} from "lucide-react";

const About = () => {
  return (
    <div className="bg-white font-sans text-slate-800">
      {/* ================= 1. HERO SECTION ================= */}
      <div className="relative bg-slate-900 py-20 sm:py-32 overflow-hidden isolate">
        {/* Decorative Background (Glow Effects) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-[-1]">
          <div className="absolute top-[-10%] left-[20%] w-72 h-72 bg-indigo-500/30 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[20%] w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold mb-6 backdrop-blur-sm tracking-wider uppercase">
            About Our Company
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Redefining <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-white">
              Modern Commerce.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            We're not just selling products; we're building a community rooted
            in quality, trust, and innovation. Join us on our journey to change
            the way the world shops.
          </p>
        </div>
      </div>

      {/* ================= 2. OUR STORY (Grid Layout) ================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Composition (Mobile: Stacked/Hidden, Desktop: Grid) */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80"
                  alt="Our Team"
                  className="rounded-2xl shadow-xl w-full h-48 sm:h-64 object-cover transform translate-y-8 lg:translate-y-12 z-10"
                />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                  alt="Brainstorming"
                  className="rounded-2xl shadow-xl w-full h-48 sm:h-64 object-cover"
                />
              </div>
              {/* Abstract Shape Background */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl -z-10"></div>
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight">
                From Humble Beginnings.
              </h2>
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-6">
                Founded in 2024, what started as a small passion project in a
                garage has blossomed into a global brand. Our mission has always
                been simple: to make premium lifestyle products accessible to
                everyone without compromising on quality.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-8 mt-8 border-t border-slate-100 pt-8">
                <div>
                  <h4 className="text-3xl sm:text-4xl font-bold text-indigo-600">
                    50k+
                  </h4>
                  <p className="text-sm text-slate-400 mt-1">Happy Customers</p>
                </div>
                <div>
                  <h4 className="text-3xl sm:text-4xl font-bold text-indigo-600">
                    99%
                  </h4>
                  <p className="text-sm text-slate-400 mt-1">
                    Satisfaction Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. OUR VALUES (Cards) ================= */}
      <section className="bg-slate-50 py-16 sm:py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Why We Are Different
            </h2>
            <p className="mt-4 text-slate-500">
              Built on trust, driven by passion. Here is what we stand for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <ValueCard
              icon={<Award size={28} />}
              title="Premium Quality"
              desc="We handpick every item and rigorously test it to ensure it meets our gold standards."
            />
            <ValueCard
              icon={<Users size={28} />}
              title="Customer Focused"
              desc="You are our priority. Our support team is here 24/7 to ensure your happiness."
            />
            <ValueCard
              icon={<CheckCircle size={28} />}
              title="Transparency"
              desc="No hidden fees, no fine print. Just honest business and authentic products."
            />
          </div>
        </div>
      </section>

      {/* ================= 4. CONTACT BANNER (Minimal Style) ================= */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-indigo-600 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[20px_20px]"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 p-8 sm:p-12 lg:p-16 items-center">
              <div className="text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Get in touch with us
                </h2>
                <p className="text-indigo-100 mb-8 font-light">
                  Have a question? We'd love to hear from you.
                </p>

                <div className="space-y-4">
                  <ContactItem
                    icon={<MapPin size={20} />}
                    text="123 Tech Avenue, Silicon Valley"
                  />
                  <ContactItem
                    icon={<Phone size={20} />}
                    text="+1 (555) 000-0000"
                  />
                  <ContactItem
                    icon={<Mail size={20} />}
                    text="hello@company.com"
                  />
                </div>
              </div>

              {/* Map/Image Area */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border-4 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Office"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Map overlay simulation */}
                <div className="absolute inset-0 bg-indigo-900/10 pointer-events-none"></div>
                <div className="absolute center bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                  📍 Our HQ
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. CTA BOTTOM ================= */}
      <div className="text-center py-12 sm:py-16">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
          Ready to experience the difference?
        </h3>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const ValueCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 border border-slate-50 text-center sm:text-left group">
    <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl mb-5 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const ContactItem = ({ icon, text }) => (
  <div className="flex items-center gap-4 text-sm sm:text-base">
    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
      {icon}
    </div>
    <span className="font-medium">{text}</span>
  </div>
);

export default About;
