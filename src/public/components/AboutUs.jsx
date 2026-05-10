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
} from "lucide-react";
import { MdWhatsapp } from "react-icons/md";
import { useBranding } from "../../shared/hooks/useBranding";

export default function About() {
  const brand = useBranding();

  const instagramUrl = brand.contact?.instagram || "https://instagram.com/ananthuspcm";
  const whatsappUrl = `https://wa.me/${brand.contact?.whatsapp}`;

  const programs = [
    {
      title: "+1 Science",
      desc: "Strong foundation for higher secondary success.",
      list: ["Physics", "Chemistry", "Mathematics"],
    },
    {
      title: "+2 Science",
      desc: "Focused board exam preparation.",
      list: ["Concept Mastery", "Problem Solving", "Exam Strategies"],
    },
    {
      title: "Crash Courses",
      desc: "Fast-track revision for exams.",
      list: ["Previous Questions", "Quick Revision", "Mock Tests"],
    },
    {
      title: "Mentorship",
      desc: "Guidance beyond academics.",
      list: ["Career Guidance", "Study Planning", "Performance Tracking"],
    },
  ];

  return (
    <div className="bg-white text-zinc-900 font-sans">
      
      {/* REAL HERO SECTION: Split Layout */}
      <section className="relative pt-20 pb-32 px-6 md:px-16 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 -skew-x-12 translate-x-20 -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6">
              Empowering Future Scientists
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
              Master Science with <br />
              <span className="text-emerald-500 italic">{brand.siteName}</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg mb-10">
              We provide premium coaching for +1 and +2 students, focusing on deep 
              conceptual clarity and disciplined exam strategies in Physics, Chemistry, and Math.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-emerald-500 shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all active:scale-95"
              >
                <MessageCircle size={20} />
                Enroll Now
              </a>
              <div className="flex items-center gap-3 px-6 py-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-[10px] font-bold">
                       {i === 3 ? '300+' : ''}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-500 underline decoration-emerald-200 underline-offset-4">Joined by 300+ Students</span>
              </div>
            </div>
          </div>

          {/* Visual Side (Geometric / Icon Based) */}
          <div className="relative" data-aos="fade-left">
             <div className="grid grid-cols-2 gap-4">
                <div className="p-8 bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-emerald-50 mt-12">
                   <Target className="text-emerald-500 mb-4" size={40} />
                   <h4 className="font-black text-slate-900">Result Focused</h4>
                   <p className="text-xs text-slate-400 mt-2">Personalized tracking for every student.</p>
                </div>
                <div className="p-8 bg-emerald-500 rounded-[40px] shadow-xl shadow-emerald-200 text-white">
                   <Users className="text-emerald-100 mb-4" size={40} />
                   <h4 className="font-black">Expert Mentors</h4>
                   <p className="text-xs text-emerald-100/70 mt-2">Guidance from subject experts.</p>
                </div>
             </div>
             {/* Abstract Circle Decoration */}
             <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50" />
          </div>
        </div>
      </section>

      {/* CORE STATS SECTION */}
      <section className="py-20 bg-emerald-900 mx-6 md:mx-16 rounded-[48px] text-center mb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {[
            { label: "Students Enrolled", val: "4000+", icon: <Users size={20}/> },
            { label: "Success Rate", val: "98%", icon: <Star size={20}/> },
            { label: "Science Batches", val: "12+", icon: <BookOpen size={20}/> },
            { label: "Years Excellence", val: "04+", icon: <GraduationCap size={20}/> },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-emerald-400 flex justify-center">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-black text-white">{stat.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-300/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS SECTION: Matched Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-900">Our Coaching <span className="text-emerald-500">Programs</span></h2>
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full" />
          </div>
          <p className="text-slate-500 max-w-sm text-sm font-medium">
            Tailored learning paths designed to meet the rigorous demands of Kerala Higher Secondary Science.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((course, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <h3 className="text-xl font-black mb-4 text-slate-800">
                {course.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                {course.desc}
              </p>
              <ul className="space-y-3">
                {course.list.map((li, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <h2 className="text-4xl font-black text-slate-900">The Secret to <span className="text-emerald-500">Success</span></h2>
                <div className="space-y-6">
                    {[
                        { title: "Conceptual Clarity", desc: "No rote learning. We make sure you understand the 'Why' behind every formula." },
                        { title: "Regular Assessments", desc: "Weekly tests and mock board exams to keep you exam-ready always." },
                        { title: "Doubt Clearance", desc: "Dedicated sessions to ensure no question goes unanswered." }
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
            <div className="relative p-10 bg-emerald-500 rounded-[60px] text-white overflow-hidden shadow-2xl shadow-emerald-200">
                 <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-4 italic">“Strong Concepts. Confident Results.”</h3>
                    <p className="text-emerald-100 opacity-80 mb-8">Ready to transform your academic journey? Join our next batch starting soon.</p>
                    <a href={whatsappUrl} className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all">
                        Talk to an Advisor
                    </a>
                 </div>
                 {/* Decorative background circle */}
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            </div>
        </div>
      </section>

    </div>
  );
}