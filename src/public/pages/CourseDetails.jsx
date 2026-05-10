import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../shared/api";
import { getUser } from "../../shared/auth";
import VideoPlayer from "../../shared/video/VideoPlayer";
import { useBranding } from "../../shared/hooks/useBranding";
import { CheckCircle, PlayCircle, ShieldCheck, CreditCard, ChevronRight } from "lucide-react";

export default function CourseDetails() {
  const { courseId } = useParams();
  const user = getUser();
  const brand = useBranding();
  const [selectedPlan, setSelectedPlan] = useState("full");
  const [course, setCourse] = useState(null);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [owned, setOwned] = useState(false);

  const primaryEmerald = "#10b981";

  useEffect(() => {
    async function load() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      try {
        const courseRes = await api.get(`/courses/${courseId}`);
        const unitsRes = await api.get(`/units?courseId=${courseId}`);
        const data = courseRes.data;

        setCourse({
          ...data,
          installmentOptions: Array.isArray(data.installmentOptions)
            ? data.installmentOptions
            : JSON.parse(data.installmentOptions || "[]"),
        });
        setUnits(unitsRes.data);

        if (user) {
          const pr = await api.get(`/purchase/my?userId=${user.id}`);
          const ownedIds = pr.data.map((p) => p.courseId);
          setOwned(ownedIds.includes(Number(courseId)));
        }
      } catch (err) {
        console.error("Course details error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId]);

  async function buy(courseId) {
    if (!user) return (window.location = "/register");
    const orderRes = await api.post("/payments/create-order", {
      courseId,
      plan: selectedPlan === "full" ? 1 : selectedPlan,
    });

    const options = {
      key: orderRes.data.key,
      amount: orderRes.data.amount,
      currency: orderRes.data.currency,
      order_id: orderRes.data.orderId,
      name: brand.siteName,
      description: course.title,
      handler: async function (response) {
        await api.post("/payments/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          courseId,
          plan: selectedPlan === "full" ? 1 : selectedPlan,
        });
        window.location = `/student/watch/${courseId}`;
      },
    };
    new window.Razorpay(options).open();
  }

  if (loading) return <div className="py-40 text-center font-bold text-slate-400">Loading curriculum...</div>;
  if (!course) return <div className="py-40 text-center font-bold text-rose-500">Course not found.</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* ===== PREMIUM HERO ===== */}
      <section className="relative bg-[#0f172a] pt-20 pb-32 overflow-hidden">
        {/* Abstract Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/10 -skew-x-12 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              Premium Science Batch
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed whitespace-pre-line max-w-xl">
              {course.description}
            </p>

            <div className="flex items-center gap-6">
              <div className="space-y-1">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-tighter">Current Price</p>
                <div className="text-4xl font-black text-white flex items-center gap-3">
                  ₹{course.price}
                  <span className="text-xl text-slate-500 line-through font-medium">₹{course.oldPrice}</span>
                </div>
              </div>
              <div className="h-12 w-px bg-slate-800" />
              <div className="text-emerald-400 font-bold text-sm">
                Save {Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100)}% Today
              </div>
            </div>

            {/* PAYMENT PLANS */}
            {course.installmentOptions?.length > 0 && !owned && (
              <div className="p-6 bg-slate-800/40 rounded-3xl border border-slate-700/50 space-y-4">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <CreditCard size={14} /> Flexible Payment Options
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedPlan("full")}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedPlan === "full" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
                  >
                    Full Access
                  </button>
                  {course.installmentOptions.filter(m => m > 0).map((months) => (
                    <button
                      key={months}
                      onClick={() => setSelectedPlan(months)}
                      className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedPlan === months ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
                    >
                      {months} Months
                    </button>
                  ))}
                </div>
                {selectedPlan !== "full" && (
                  <p className="text-emerald-400 text-xs font-bold italic">
                    Pay only ₹{Math.ceil(course.price / selectedPlan)} / month
                  </p>
                )}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              {owned ? (
                <button
                  onClick={() => (window.location = `/student/watch/${courseId}`)}
                  className="px-10 py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2"
                >
                  <PlayCircle size={20} /> Resume Learning
                </button>
              ) : (
                <button
                  onClick={() => buy(courseId)}
                  className="px-10 py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2"
                >
                  Enroll Now <ChevronRight size={20} />
                </button>
              )}
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                 <ShieldCheck className="text-emerald-500" /> Secure Payment via Razorpay
              </div>
            </div>
          </div>

          {/* RIGHT: Video Preview */}
          <div className="relative group" data-aos="zoom-in">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-[32px] overflow-hidden border-8 border-slate-800 shadow-2xl bg-black aspect-video">
              {course.introBunnyVideoId ? (
                <VideoPlayer videoId={course.introBunnyVideoId} />
              ) : (
                <img
                  src={`${api.defaults.baseURL.replace("/api", "")}${course.thumbnail}`}
                  className="w-full h-full object-cover opacity-80"
                  alt={course.title}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CURRICULUM SECTION ===== */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
           <div>
              <h2 className="text-3xl font-black text-slate-900">Course Curriculum</h2>
              <p className="text-slate-500 text-sm mt-1">{units.length} High-Quality Lessons</p>
           </div>
           <div className="hidden sm:block h-px flex-grow mx-8 bg-slate-100" />
           <CheckCircle className="text-emerald-500" />
        </div>

        <div className="space-y-4">
          {units.map((unit, index) => (
            <div 
              key={unit.id} 
              className="group flex items-center gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 font-black group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                  {unit.title}
                </h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black mt-1">Lesson Module</p>
              </div>
              <PlayCircle className="text-slate-200 group-hover:text-emerald-500 transition-colors" size={24} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}