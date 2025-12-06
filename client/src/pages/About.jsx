import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const About = () => {
  return (
    <div className="bg-white font-sans text-slate-800">
      {/* ================= 1. HERO SECTION (ส่วนหัว) ================= */}
      <div className="relative bg-slate-900 py-24 sm:py-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 -translate-x-[50%] -translate-y-[50%] w-96 h-96 bg-indigo-500 rounded-full blur-[128px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 translate-x-[50%] translate-y-[50%] w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
            We are changing the way <br />{" "}
            <span className="text-indigo-400">the world shops.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
            Founded in 2024, our mission is to provide the best quality products
            with an exceptional shopping experience. We believe in innovation,
            sustainability, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* ================= 2. OUR STORY (เรื่องราวของเรา) ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80"
                alt="Office 1"
                className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8"
              />
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80"
                alt="Office 2"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">
                Our Story
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-6">
                From a small garage to a global brand.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                It started with a simple idea: create a platform that makes
                premium lifestyle products accessible to everyone. What began as
                a passion project in a small garage has now grown into a
                community of over 1 million happy customers worldwide.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                We are obsessed with quality. Every product we sell goes through
                a rigorous testing process to ensure it meets our high
                standards. We are not just selling products; we are delivering a
                promise of excellence.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-4 border-indigo-600 pl-4">
                  <h4 className="font-bold text-2xl">50k+</h4>
                  <p className="text-sm text-slate-500">Products Sold</p>
                </div>
                <div className="border-l-4 border-indigo-600 pl-4">
                  <h4 className="font-bold text-2xl">99%</h4>
                  <p className="text-sm text-slate-500">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. OUR VALUES (จุดยืนของเรา) ================= */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-slate-500">
              We are committed to providing the best service in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Award size={32} />}
              title="Quality Assurance"
              desc="We handpick every item to ensure it meets our strict quality standards."
            />
            <ValueCard
              icon={<Users size={32} />}
              title="Customer First"
              desc="Our support team is available 24/7 to help you with any questions."
            />
            <ValueCard
              icon={<CheckCircle size={32} />}
              title="Easy Returns"
              desc="Not satisfied? Return it within 30 days for a full refund, no questions asked."
            />
          </div>
        </div>
      </section>

      {/* ================= 4. CONTACT & LOCATION (ติดต่อเรา) ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="p-10 lg:p-16 lg:w-1/2 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-indigo-100 mb-8 leading-relaxed">
                Have questions about our products or need help with an order?
                We'd love to hear from you. Visit our store or drop us a
                message.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Headquarters</p>
                    <p className="text-sm text-indigo-200">
                      123 Tech Avenue, Silicon Valley, CA
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Phone Support</p>
                    <p className="text-sm text-indigo-200">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Mockup (หรือใส่รูปออฟฟิศ) */}
            <div className="lg:w-1/2 min-h-[400px] bg-slate-200 relative">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="Office Location"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. CTA (ปุ่มปิดท้าย) ================= */}
      <div className="text-center py-12 pb-24">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Ready to start shopping?
        </h3>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
        >
          Explore Collection <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

// Component ย่อยสำหรับการ์ด Values
const ValueCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default About;
