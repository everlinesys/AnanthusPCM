import { MdMap } from "react-icons/md";
import { useBranding } from "../../shared/hooks/useBranding";
import { Star } from "lucide-react";

export default function Testimonials() {
  const brand = useBranding();

  const reviews = brand.reviews || [];
  const primary = "#10b981"; // Xylem Emerald

  if (!reviews.length) return null;

  return (
    <section className="relative w-full overflow-hidden py-24 bg-[#f8fafc]">
      {/* Decorative Xylem Gradient Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 -z-0" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* HEADER: Google Style Clarity */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
             Community Feedback
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
            Loved by <span className="text-emerald-500">Thousands</span>
          </h2>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-slate-500 font-bold">4.9/5 based on 500+ reviews</span>
          </div>
        </div>

        {/* GRID: Masonry-inspired column layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid relative flex flex-col bg-white border border-slate-100 p-8 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Google Style Top Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner"
                    style={{ backgroundColor: i % 2 === 0 ? '#10b981' : '#064e3b' }}
                  >
                    {t.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">{t.name}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">Local Guide • {t.role || "Student"}</p>
                  </div>
                </div>
                {/* Google "G" Icon placeholder feel */}
                <div className="opacity-20 group-hover:opacity-100 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" className="fill-slate-300 group-hover:fill-emerald-500">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
              </div>

              {/* RATING */}
              <div className="flex gap-0.5 mb-4 text-amber-400">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              {/* TESTIMONIAL TEXT */}
              <p className="text-slate-600 leading-relaxed text-sm">
                "{t.text}"
              </p>

              {/* BOTTOM ACCENT */}
              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Verified Review</span>
              </div>
            </div>
          ))}
        </div>

        {/* GOOGLE CTA FOOTER */}
        <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-white border border-slate-200 rounded-full text-slate-700 font-bold shadow-sm hover:bg-slate-50 transition-all inline-flex items-center gap-2">
            <MdMap className="w-10"/>     View more on Google
            </button>
        </div>
      </div>
    </section>
  );
}