import React from "react";
import {
  Instagram,
  MessageCircle,
  BookOpen,
  Star,
  GraduationCap,
  CheckCircle2,
  Users,
  Target,
  Briefcase,
  FlaskConical,
  Library,
} from "lucide-react";
import { MdWhatsapp } from "react-icons/md";
import { useBranding } from "../../shared/hooks/useBranding";

export default function About() {
  const brand = useBranding();

  const instagramUrl = brand.contact?.instagram || "https://instagram.com/ananthuspcm";
  const whatsappUrl = `https://wa.me/${brand.contact?.whatsapp}`;

  const programs = [
    {
      title: "Class 9 & 10 (Foundations)",
      desc: "Strong core building for CBSE and Kerala State syllabus.",
      list: ["Science & Maths", "Social Science", "Foundation for +1"],
      icon: <Library className="text-emerald-500" size={24} />,
    },
    {
      title: "+1 & +2 Science",
      desc: "Comprehensive coaching for Higher Secondary & Entrance.",
      list: ["Physics & Chemistry", "Mathematics", "Biology / Computer Science"],
      icon: <FlaskConical className="text-emerald-500" size={24} />,
    },
    {
      title: "+1 & +2 Commerce",
      desc: "Professional-grade training for future finance experts.",
      list: ["Accountancy", "Business Studies", "Economics"],
      icon: <Briefcase className="text-emerald-500" size={24} />,
    },
    {
      title: "Entrance & Revision",
      desc: "Strategic preparation for competitive exams.",
      list: ["KEAM / NEET Focus", "CUET Preparation", "Mock Board Exams"],
      icon: <Target className="text-emerald-500" size={24} />,
    },
  ];

  return (
    <div className="bg-white text-zinc-900 font-sans">
      
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 px-6 md:px-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 -skew-x-12 translate-x-20 -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6">
              CBSE & Kerala State Syllabus Expert
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
              Expert Coaching for <br />
              <span className="text-emerald-500 italic">Science & Commerce</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg mb-10">
              Premium tuition and mentorship for Class 9 to 12. Specializing in 
              <strong> Science and Commerce</strong> streams with a track record of academic excellence.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-emerald-500 shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all active:scale-95"
              >
                <MessageCircle size={20} />
                Start Learning
              </a>
            </div>
          </div>

          <div className="relative" data-aos="fade-left">
             <div className="grid grid-cols-2 gap-4">
                <div className="p-8 bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-emerald-50 mt-12">
                   <CheckCircle2 className="text-emerald-500 mb-4" size={40} />
                   <h4 className="font-black text-slate-900">Dual Syllabus</h4>
                   <p className="text-xs text-slate-400 mt-2">Expertise in both CBSE and Kerala State boards.</p>
                </div>
                <div className="p-8 bg-emerald-500 rounded-[40px] shadow-xl shadow-emerald-200 text-white">
                   <Users className="text-emerald-100 mb-4" size={40} />
                   <h4 className="font-black">9-12 Focus</h4>
                   <p className="text-xs text-emerald-100/70 mt-2">Dedicated batches for High School and Plus Two.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-emerald-900 mx-6 md:mx-16 rounded-[48px] text-center mb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {[
            { label: "Students Trained", val: "4500+", icon: <Users size={20}/> },
            { label: "Board Success", val: "100%", icon: <Star size={20}/> },
            { label: "Subject Experts", val: "15+", icon: <GraduationCap size={20}/> },
            { label: "Academic Years", val: "10+", icon: <BookOpen size={20}/> },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-emerald-400 flex justify-center">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-black text-white">{stat.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-300/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-900">Academic <span className="text-emerald-500">Programs</span></h2>
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((course, index) => (
            <div
              key={index}
              className="group p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="mb-4">{course.icon}</div>
              <h3 className="text-xl font-black mb-4 text-slate-800">{course.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">{course.desc}</p>
              <ul className="space-y-3">
                {course.list.map((li, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                    <CheckCircle2 size={14} className="text-emerald-500" /> {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <h2 className="text-4xl font-black text-slate-900">Why Choose <span className="text-emerald-500">{brand.siteName}</span>?</h2>
                <div className="space-y-6">
                    {[
                        { title: "Syllabus Mastery", desc: "Precise coaching tailored to Kerala State SCERT and CBSE NCERT guidelines." },
                        { title: "From 9th to 12th", desc: "A continuous learning journey that builds strong fundamentals before reaching Plus Two." },
                        { title: "Exam-Ready Strategies", desc: "Focus on previous year question papers, time management, and presentation skills." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm font-black border border-emerald-50">
                                {i + 1}
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-800">{item.title}</h5>
                                <p className="text-sm text-slate-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-10 bg-emerald-500 rounded-[60px] text-white shadow-2xl">
                <h3 className="text-3xl font-black mb-4 italic">“Precision in Science. Excellence in Commerce.”</h3>
                <p className="text-emerald-100 mb-8">Batches for Class 9, 10, +1, and +2 are now enrolling. Secure your future with expert guidance.</p>
                <a href={whatsappUrl} className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all">
                    Inquire About Batches
                </a>
            </div>
        </div>
      </section>
    </div>
  );
}