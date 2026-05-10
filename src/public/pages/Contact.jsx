import { useBranding } from "../../shared/hooks/useBranding";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { MdWhatsapp } from "react-icons/md";

export default function Contact() {
  const branding = useBranding();

  const primaryEmerald = "#10b981";
  const darkSlate = "#0f172a";

  // WhatsApp link formatter
  const whatsappLink = `https://wa.me/${branding.contact.whatsapp?.replace(/\D/g, "")}`;

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* ===== HEADER SECTION ===== */}
      <section className="bg-[#0f172a] pt-20 pb-40 px-6 md:px-16 relative overflow-hidden">
        {/* Decorative Background Blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -z-0" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            We're Here to <span className="text-emerald-500 italic">Help You.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Have questions about our science batches or mentorship programs? 
            Reach out to our team and start your journey today.
          </p>
        </div>
      </section>

      {/* ===== CONTENT SECTION ===== */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 -mt-24 pb-32 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* CONTACT CARDS (Left Side) */}
          <div className="lg:col-span-1 space-y-4">
            {[
              { 
                icon: <Phone className="text-emerald-500" size={24} />, 
                label: "Call Us", 
                value: branding.contact.phone,
                sub: "Mon - Sat, 9am to 6pm"
              },
              { 
                icon: <Mail className="text-emerald-500" size={24} />, 
                label: "Email Us", 
                value: branding.contact.email,
                sub: "Online support 24/7"
              },
              { 
                icon: <MapPin className="text-emerald-500" size={24} />, 
                label: "Visit Us", 
                value: branding.contact.address,
                sub: "Main Learning Center"
              }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-emerald-200 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{item.label}</p>
                <h4 className="text-lg font-black text-slate-900 break-words">{item.value}</h4>
                <p className="text-xs text-slate-400 mt-2 font-medium">{item.sub}</p>
              </div>
            ))}

            {/* WhatsApp Floating-style CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-6 bg-[#25D366] rounded-[32px] text-white shadow-xl shadow-green-200 hover:scale-[1.02] transition-transform active:scale-95"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <MdWhatsapp size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Fast Response</p>
                  <p className="font-bold">WhatsApp Chat</p>
                </div>
              </div>
              <ChevronRightIcon />
            </a>
          </div>

          {/* CONTACT FORM (Right Side) */}
          <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/60 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                <h2 className="text-3xl font-black text-slate-900">Send a <span className="text-emerald-500">Message</span></h2>
            </div>

            <form className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase ml-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase ml-2">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase ml-2">Your Message</label>
                <textarea
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all outline-none resize-none"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="button"
                  className="w-full md:w-auto px-12 py-4 bg-[#0f172a] text-white rounded-2xl font-black shadow-xl shadow-slate-200 flex items-center justify-center gap-3 hover:bg-emerald-600 hover:shadow-emerald-200 transition-all group"
                >
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}

// Helper Icon
function ChevronRightIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}