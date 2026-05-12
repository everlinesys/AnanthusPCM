import React, { useState, useEffect, useRef } from "react";
import { Users, Calendar, Award, TrendingUp } from "lucide-react";

const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
};

export default function Claim() {
  const stats = [
    {
      label: "Students Trusted",
      value: 4000,
      suffix: "+",
      icon: <Users className="text-emerald-500" size={28} />,
      desc: "Growing daily across Kerala",
    },
    {
      label: "Years of Excellence",
      value: 10,
      suffix: "+",
      icon: <Calendar className="text-emerald-500" size={28} />,
      desc: "Proven track record",
    },
    {
      label: "Success Rate",
      value: 100,
      suffix: "%",
      icon: <Award className="text-emerald-500" size={28} />,
      desc: "Board exam distinctions",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative group p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500"
            >
              {/* Decorative Background Icon */}
              <div className="absolute top-6 right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                {React.cloneElement(stat.icon, { size: 120 })}
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>

                <div className="flex items-baseline gap-1">
                  <h3 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </h3>
                  <TrendingUp size={20} className="text-emerald-500 animate-pulse" />
                </div>

                <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600 mt-4">
                  {stat.label}
                </p>
                
                <p className="text-slate-400 text-sm mt-2 font-medium">
                  {stat.desc}
                </p>
              </div>

              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-10 right-10 h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}