import React from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-white font-sans text-slate-800">
      {/* ================= HEADER SECTION ================= */}
      <div className="bg-slate-50 py-16 md:py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            We'd love to hear from you. Our friendly team is always here to
            chat.
          </p>
        </div>
      </div>

      {/* ================= MAIN CONTENT (Split Layout) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* --- LEFT COLUMN: Contact Info & Map --- */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Whether you have a question about features, pricing, need a
                demo, or anything else, our team is ready to answer all your
                questions.
              </p>

              <div className="space-y-6">
                <ContactInfoItem
                  icon={<Mail size={20} />}
                  title="Chat to us"
                  desc="Our friendly team is here to help."
                  detail="support@example.com"
                />
                <ContactInfoItem
                  icon={<MapPin size={20} />}
                  title="Visit us"
                  desc="Come say hello at our office HQ."
                  detail="123 Tech Park, Silicon BKK, Thailand"
                />
                <ContactInfoItem
                  icon={<Phone size={20} />}
                  title="Call us"
                  desc="Mon-Fri from 8am to 5pm."
                  detail="+66 (0) 2-123-4567"
                />
              </div>
            </div>

            {/* Map Placeholder (ใส่รูปแผนที่สวยๆ หรือ Google Maps Embed) */}
            <div className="rounded-2xl overflow-hidden h-64 bg-slate-100 relative">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Map Location"
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
              />
              <div className="absolute inset-0 bg-slate-900/10 pointer-events-none"></div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Contact Form --- */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
            <p className="text-slate-500 mb-8 text-sm">
              We usually respond within 24 hours.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3.5 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= FAQ Teaser (Optional) ================= */}
      <div className="bg-slate-50 py-16 text-center">
        <p className="text-slate-600">
          Looking for immediate answers? Check out our{" "}
          <a href="#" className="text-indigo-600 font-bold hover:underline">
            Help Center
          </a>{" "}
          or{" "}
          <a href="#" className="text-indigo-600 font-bold hover:underline">
            FAQs
          </a>
          .
        </p>
      </div>
    </div>
  );
};

// Component ย่อยสำหรับแสดงข้อมูลติดต่อแต่ละบรรทัด
const ContactInfoItem = ({ icon, title, desc, detail }) => (
  <div className="flex gap-4 items-start">
    <div className="text-indigo-600 bg-indigo-50 p-3 rounded-full shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-lg text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500">{desc}</p>
      <p className="text-indigo-600 font-semibold mt-1">{detail}</p>
    </div>
  </div>
);

export default Contact;
