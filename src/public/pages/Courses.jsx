import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/useBranding";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const brand = useBranding();
  const navigate = useNavigate();

  const primary = brand?.primaryColor || "#059669";

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get("/courses");
        setCourses(data);
      } catch (err) {
        console.error("Courses load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-sm opacity-60">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 min-w-[100vw]" >
      <header
        className="py-20 text-center text-white px-6 md:px-16"
        style={{ backgroundColor: primary  }}
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          {brand.preview?.title || "Explore Our Courses"}
        </h1>

        <p className="opacity-90 max-w-xl mx-auto">
          {brand.preview?.description ||
            "Structured learning designed for real-world success."}
        </p>
      </header>

      {/* --- COURSES GRID --- */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:px-16">

        {courses.length === 0 ? (
          <div className="text-center text-gray-500">
            No courses available yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="h-52 bg-gray-100 overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={`${api.defaults.baseURL.replace("/api", "")}${course.thumbnail}`}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">

                  <h3 className="text-xl font-bold text-gray-800">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Lessons / Duration (REAL DATA ONLY) */}
                  <div className="text-xs text-gray-500 flex gap-4 pt-2">
                    {course.lessons && (
                      <span>📚 {course.lessons} Lessons</span>
                    )}
                    {course.duration && (
                      <span>⏱ {course.duration}</span>
                    )}
                  </div>

                  {/* Anchor instead of fake button */}
                  <a
                    href={`/courses/${course.id}`}
                    className="inline-block mt-4 font-semibold text-sm"
                    style={{ color: primary }}
                  >
                    View Details →
                  </a>

                </div>
              </div>
            ))}

          </div>
        )}
      </main>
    </div>
  );
}
