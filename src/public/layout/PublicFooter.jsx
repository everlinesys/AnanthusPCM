import { Link } from "react-router-dom";
import { useBranding } from "../../shared/hooks/useBranding";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

export default function PublicFooter() {
  const brand = useBranding();
  const currentYear = new Date().getFullYear();

  // Xylem-style Dark Palette
  const bgDark = "#0f172a"; // Deep Slate/Navy
  const accentEmerald = "#10b981";

  return (
    <footer className="relative bg-[#0f172a] text-slate-400 pt-20 overflow-hidden">
      {/* Subtle Glow Effect in corner */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              {brand.logo ? (
                <img src={brand.logo} alt="logo" className="h-10 w-auto brightness-0 invert" />
              ) : (
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {brand.siteName?.charAt(0)}
                </div>
              )}
              <span className="text-2xl font-black text-white tracking-tighter italic">
                {brand.siteName}
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Leading the way in digital excellence and competitive exam preparation. Join thousands of students achieving their dreams with {brand.siteName}.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/courses" className="hover:text-emerald-400 transition-colors">Premium Courses</Link></li>
              <li><Link to="/aboutus" className="hover:text-emerald-400 transition-colors">Our Success Story</Link></li>
              <li><Link to="/pricing" className="hover:text-emerald-400 transition-colors">Study Material</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <span>123 Education Lane, Learning Hub,<br />Pala, Kerala, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>+91 9876 543 210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>support@{brand.siteName?.toLowerCase().replace(/\s/g, '')}.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: App Download / Newsletter */}
          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50">
            <h4 className="text-white font-bold mb-2">Download our App</h4>
            <p className="text-xs mb-4 text-slate-400">Access classes anytime, anywhere.</p>
            <div className="space-y-3">
               <button className="w-full bg-black text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all border border-zinc-800">
                  <div className="text-left leading-tight">
                    <p className="text-[10px] uppercase">Get it on</p>
                    <p className="text-sm font-bold">Google Play</p>
                  </div>
               </button>
               <Link 
                to="/register" 
                className="w-full bg-emerald-500 text-white px-4 py-3 rounded-xl flex items-center justify-center font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
               >
                 Enroll for Free
               </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px]">
          <p>© {currentYear} {brand.siteName}. Designed by Everline Systems.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}