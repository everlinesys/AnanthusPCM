import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/useBranding";
import { BookOpen, ChevronRight, Star, GraduationCap } from "lucide-react";

export default function FeaturedCoursesStrip() {
    const [courses, setCourses] = useState([]);
    const [groups, setGroups] = useState([]);
    const brand = useBranding();

    useEffect(() => {
        async function load() {
            try {
                const [courseRes, groupRes] = await Promise.all([
                    api.get("/courses"),
                    api.get("/course-groups"),
                ]);
                setCourses(courseRes.data || []);
                setGroups(groupRes.data || []);
            } catch (err) {
                console.error(err);
            }
        }
        load();
    }, []);

    // Course Card Component for Reusability
    const CourseCard = ({ course }) => (
        <Link
            to={`/courses/${course.id}`}
            className="flex flex-col bg-white rounded-3xl overflow-hidden border border-emerald-50 shadow-sm hover:shadow-xl transition-all duration-300 group"
        >
            <div className="h-48 bg-emerald-50 overflow-hidden relative">
                {/* Top Badge (Optional: e.g. 'Popular') */}
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-emerald-600 uppercase tracking-tighter shadow-sm">
                    Trending
                </div>

                {course.thumbnail ? (
                    <img
                        src={`${api.defaults.baseURL.replace("/api", "")}${course.thumbnail}`}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                ) : (
                    <div className="h-full flex items-center justify-center text-emerald-200">
                        <GraduationCap size={48} />
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow space-y-3">
                <h3 className="font-bold text-zinc-800 text-lg line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {course.title}
                </h3>

                <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
                    <div className="flex items-center gap-1">
                        <Star size={14} className="text-amber-400 fill-amber-400" /> 
                        <span className="text-zinc-700">{course.rating || 4.8}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BookOpen size={14} className="text-emerald-500" /> 
                        <span>{course.lessonsCount || 12} Lessons</span>
                    </div>
                </div>

                <div className="pt-3 border-t border-emerald-50 flex items-center justify-between">
                    <span className="text-emerald-600 font-black text-lg">
                        Enrol Now
                    </span>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <ChevronRight size={18} />
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <section className="bg-white py-16 px-6 md:px-16" id="courses">
            <div className="max-w-7xl mx-auto space-y-16">
                
                {/* ================= GROUPED COURSES ================= */}
                {groups.map((group) => (
                    <div key={group.id} className="space-y-8">
                        {/* Header Style matching Xylem */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="space-y-1">
                                <span className="text-emerald-500 font-bold text-sm uppercase tracking-widest">
                                    Explore Categories
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-zinc-900">
                                    {group.name}
                                </h2>
                            </div>
                            <Link to="/courses" className="text-emerald-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                View All Programs <ChevronRight size={20} />
                            </Link>
                        </div>

                        {/* Grid: 1 Column on Mobile, 2 on Tablet, 3/4 on Desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {group.courses?.map((item) => (
                                <CourseCard key={item.course.id} course={item.course} />
                            ))}
                        </div>
                    </div>
                ))}

                {/* ================= ALL COURSES STRIP ================= */}
                <div className="pt-12 border-t border-zinc-100">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-zinc-800">
                            Recommended For You
                        </h2>
                        <div className="w-12 h-1.5 bg-emerald-500 rounded-full mt-2" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.slice(0, 4).map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}