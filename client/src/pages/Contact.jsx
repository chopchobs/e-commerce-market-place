import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-slate-50 font-sans text-slate-800 min-h-screen">
      {/* ================= 1. HEADER (Modern Gradient & Blobs) ================= */}
      <div className="relative bg-white pt-20 pb-16 sm:pt-32 sm:pb-24 overflow-hidden border-b border-slate-100">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 h-72 bg-purple-100/50 rounded-full blur-3xl opacity-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-100">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Let's start a <span className="text-indigo-600">conversation.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            Have a question about our products, or just want to say hello? We
            are always standing by and eager to help.
          </p>
        </div>
      </div>

      {/* ================= 2. MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* --- LEFT COLUMN: Info & Map --- */}
          <div className="flex flex-col gap-10">
            {/* Intro Text */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Get in touch
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We believe in providing the best experience for our customers.
                Whether you have a specific question or just want to explore,
                our team is here for you.
              </p>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ContactCard
                icon={<Mail size={24} />}
                title="Email"
                desc="Our friendly team is here to help."
                detail="hello@store.com"
                href="mailto:hello@store.com"
              />
              <ContactCard
                icon={<MapPin size={24} />}
                title="Office"
                desc="Come say hello at our HQ."
                detail="123 Silicon BKK, TH"
                href="#"
              />
              <ContactCard
                icon={<Phone size={24} />}
                title="Phone"
                desc="Mon-Fri from 8am to 5pm."
                detail="+66 (0) 2-123-4567"
                href="tel:+6621234567"
              />
              <ContactCard
                icon={<MessageSquare size={24} />}
                title="Live Chat"
                desc="Talk to our support team."
                detail="Start a chat"
                href="#"
              />
            </div>

            {/* Map Section */}
            <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-lg border border-white group">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Map"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors"></div>
              {/* Button Overlay */}
              <a
                href="#"
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold text-slate-900 shadow-sm flex items-center gap-2 hover:bg-white transition-colors"
              >
                <MapPin size={16} className="text-indigo-600" /> View on Google
                Maps
              </a>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Contact Form --- */}
          <div className="bg-white p-6 sm:p-10 rounded-4xl shadow-xl shadow-indigo-100/50 border border-slate-100 relative overflow-hidden">
            {/* Form Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[4rem] -mr-8 -mt-8 z-0"></div>

            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900">
                  Send us a message
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  We usually respond within 24 hours.
                </p>
              </div>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    id="firstName"
                    label="First Name"
                    placeholder="John"
                  />
                  <InputField
                    id="lastName"
                    label="Last Name"
                    placeholder="Doe"
                  />
                </div>

                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                />

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.98]"
                >
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FAQ Banner ================= */}
      <div className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full mb-4">
            <Clock size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Support Hours
          </h3>
          <p className="text-slate-500 mb-6">
            Our support team is available Monday to Friday, 9am - 6pm (UTC+7).{" "}
            <br className="hidden sm:block" />
            Looking for immediate answers? Check our Help Center.
          </p>
          <a
            href="#"
            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Visit Help Center &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Input Field ---
// ช่วยลดโค้ดซ้ำและทำให้ Form ดูสะอาด
const InputField = ({ id, label, type = "text", placeholder }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-slate-700 mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
    />
  </div>
);

// --- Sub-Component: Contact Card ---
const ContactCard = ({ icon, title, desc, detail, href }) => (
  <a
    href={href}
    className="flex flex-col items-start p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group"
  >
    <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
    <p className="text-xs text-slate-500 mb-2">{desc}</p>
    <p className="text-sm font-bold text-indigo-600 group-hover:underline truncate w-full">
      {detail}
    </p>
  </a>
);

export default Contact;
