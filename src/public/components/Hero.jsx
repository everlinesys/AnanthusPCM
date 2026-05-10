import { MdWhatsapp } from "react-icons/md";
import { useBranding } from "../../shared/hooks/useBranding";
import { useState } from "react";

export default function Hero() {
  const brand = useBranding();
  const [open, setOpen] = useState(false);

  const whatsappNumber = brand.contact?.whatsapp;

  const openWhatsApp = () => {
    const text = `Hello ${brand.siteName}, I want to know more about your courses.`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section className="relative overflow-hidden bg-white min-h-[90vh] flex items-center">
      {/* Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto relative z-10 grid md:grid-cols-2 gap-8 items-center px-6 py-12 md:py-24">

        {/* LEFT CONTENT */}
        <div data-aos="fade-right" className="space-y-6">
          <h1 className="text-4xl md:text-7xl font-bold leading-[1.2] tracking-tight text-emerald-700 malayalam " >
            {brand.hero?.title || "All-In-One Learning Platform For Competitive Exams"}
          </h1>

          <p className="text-zinc-700 text-lg md:text-xl max-w-xl leading-relaxed">
            {brand.hero?.subtitle ||
              "We Prepare Students For Entrance, Government And Commerce Exams, As Well As Offering Personalized Tuition In Science And Commerce."}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-200"
              onClick={() => window.open("/register")} >
              Register Now
            </button>
            <a href="#courses"
              className="px-8 py-3 border-2 border-emerald-500 text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-all"
            >
              Explore Courses
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div data-aos="fade-left" className="relative flex justify-center items-center">
          {/* Green Diamond Shape Background */}
          <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-emerald-500 rotate-45 rounded-3xl opacity-80" />

          {/* Instructor Image */}
          {brand.hero?.image ? (
            <img
              src={brand.hero.image}
              alt="Instructors"
              className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl"
            />
          ) : (
            <div className="relative z-10 w-80 h-80 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-400 font-bold italic">
              Instructor Image
            </div>
          )}

          {/* Floating Call Icon (Reference Image style) */}
          <div className="absolute bottom-10 left-10 z-20 bg-orange-500 p-4 rounded-full shadow-xl text-white animate-bounce">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Support */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {open && (
          <div className="w-72 rounded-2xl shadow-2xl overflow-hidden mb-4 border border-zinc-100 bg-white animate-in slide-in-from-bottom-5">
            <div className="px-4 py-3 text-white font-bold bg-emerald-600 flex justify-between items-center">
              <span>{brand.siteName} Support</span>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="p-4 text-sm text-zinc-600">
              <p className="font-bold text-zinc-800">Hi 👋</p>
              <p>Have questions about courses? Chat with us!</p>
            </div>
            <div className="p-3">
              <button
                onClick={openWhatsApp}
                className="w-full py-2 bg-[#25D366] text-white font-bold rounded-full flex items-center justify-center gap-2"
              >
                <MdWhatsapp size={20} /> Chat Now
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
        >
          <MdWhatsapp size={32} />
        </button>
      </div>
    </section>
  );
}