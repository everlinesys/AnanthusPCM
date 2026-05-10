import { useEffect, useState } from "react";
import api from "../../shared/api";
import { 
  Plus, 
  Users, 
  Trash2, 
  ChevronDown, 
  UserPlus, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  GraduationCap
} from "lucide-react";

export default function ClerkClasses() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [selectedStudents, setSelectedStudents] = useState({});
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [className, setClassName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [uiModal, setUiModal] = useState({
    show: false,
    title: "",
    msg: "",
    onConfirm: null,
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const [c, s, co] = await Promise.all([
        api.get("/classes"),
        api.get("/students"),
        api.get("/courses"),
      ]);
      setClasses(c.data || []);
      setStudents(s.data || []);
      setCourses(co.data || []);
    } catch (err) {
      showAlert("Error", "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  function toggle(id) {
    setExpanded((p) => ({ ...p, [id]: !p[id] }));
  }

  function showAlert(title, msg) {
    setUiModal({ show: true, title, msg, onConfirm: null });
  }

  function showConfirm(title, msg, fn) {
    setUiModal({ show: true, title, msg, onConfirm: fn });
  }

  async function createClass(e) {
    e.preventDefault();
    if (!className) return showAlert("Required", "Class name required");
    try {
      await api.post("/classes", {
        name: className,
        courseId: selectedCourse || null,
        type: "batch",
      });
      setClassName("");
      setSelectedCourse("");
      setShowCreateClass(false);
      load();
      showAlert("Success", "Class created");
    } catch (err) {
      showAlert("Error", err.response?.data?.message || "Failed to create class");
    }
  }

  async function createStudent(e) {
    e.preventDefault();
    if (!studentEmail) return showAlert("Required", "Email required");
    try {
      await api.post("/admin/students", {
        name: studentName,
        email: studentEmail,
        phone: studentPhone,
      });
      setStudentName("");
      setStudentEmail("");
      setStudentPhone("");
      setShowCreateStudent(false);
      load();
      showAlert("Success", "Student account created");
    } catch (err) {
      showAlert("Error", err.response?.data?.message || "Creation failed");
    }
  }

  async function addStudentsToClass(classId) {
    try {
      const users = selectedStudents[classId] || [];
      if (users.length === 0) return showAlert("Required", "Select students");
      await Promise.all(
        users.map((userId) => api.post(`/classes/${classId}/students`, { userId }))
      );
      setSelectedStudents((prev) => ({ ...prev, [classId]: [] }));
      load();
      showAlert("Success", `${users.length} students added`);
    } catch (err) {
      showAlert("Error", err.response?.data?.message || "Failed to add students");
    }
  }

  async function removeStudent(classId, userId) {
    showConfirm(
      "Remove Student",
      "Are you sure you want to remove this student from class?",
      async () => {
        try {
          await api.delete(`/classes/${classId}/students/${userId}`);
          setUiModal({ show: false });
          load();
        } catch (err) {
          showAlert("Error", "Failed to remove student");
        }
      }
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <GraduationCap className="text-indigo-400 w-8 h-8" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white">
                Classroom Hub
              </h1>
            </div>
            <p className="text-slate-400 text-lg">
              Manage your academic batches and student enrollments.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowCreateStudent(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all font-semibold border border-slate-700 shadow-lg"
            >
              <UserPlus size={18} />
              Add Student
            </button>
            <button
              onClick={() => setShowCreateClass(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all font-semibold shadow-lg shadow-indigo-500/20"
            >
              <Plus size={18} />
              New Class
            </button>
          </div>
        </header>

        {/* CLASS LIST */}
        <main className="grid gap-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 text-slate-500 animate-pulse">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-500" />
              <p className="text-lg">Fetching classroom data...</p>
            </div>
          ) : classes.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
              <Users className="mx-auto w-12 h-12 text-slate-700 mb-4" />
              <p className="text-slate-500 text-xl font-medium">No classes established yet.</p>
            </div>
          ) : (
            classes.map((cls) => (
              <div
                key={cls.id}
                className={`group border transition-all duration-300 rounded-2xl overflow-hidden ${
                  expanded[cls.id] 
                    ? "border-indigo-500/50 bg-slate-900/80 shadow-2xl" 
                    : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                }`}
              >
                {/* ACCORDION TRIGGER */}
                <button
                  onClick={() => toggle(cls.id)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-xl transition-colors ${expanded[cls.id] ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400"}`}>
                       <Users size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-white group-hover:text-indigo-400 transition-colors">
                        {cls.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm font-medium text-indigo-400 bg-indigo-400/10 px-2.5 py-0.5 rounded-full">
                          Batch
                        </span>
                        <span className="text-sm text-slate-500">
                          {cls.members?.length || 0} Students enrolled
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`text-slate-500 transition-transform duration-300 ${expanded[cls.id] ? "rotate-180 text-indigo-400" : ""}`} 
                    size={24} 
                  />
                </button>

                {/* EXPANDED CONTENT */}
                {expanded[cls.id] && (
                  <div className="border-t border-slate-800 p-6 space-y-8 animate-in fade-in slide-in-from-top-2">
                    
                    {/* ADD STUDENTS SECTION */}
                    <section className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                        <UserPlus size={16} /> Enroll New Students
                      </h4>
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                          <select
                            multiple
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 min-h-[180px] focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-300 scrollbar-hide"
                            value={selectedStudents[cls.id] || []}
                            onChange={(e) => {
                              const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
                              setSelectedStudents(prev => ({ ...prev, [cls.id]: values }));
                            }}
                          >
                            {students
                              .filter(s => !cls.members?.some(m => m.user?.id === s.id))
                              .map(s => (
                                <option key={s.id} value={s.id} className="p-2 rounded-lg cursor-pointer hover:bg-indigo-500/20">
                                  {s.name} ({s.email})
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                          <button
                            onClick={() => addStudentsToClass(cls.id)}
                            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white shadow-lg transition-all"
                          >
                            Enroll Selected
                          </button>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setSelectedStudents(prev => ({ 
                                ...prev, 
                                [cls.id]: students.filter(s => !cls.members?.some(m => m.user?.id === s.id)).map(s => String(s.id)) 
                              }))}
                              className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-semibold border border-slate-700"
                            >
                              All
                            </button>
                            <button
                              onClick={() => setSelectedStudents(prev => ({ ...prev, [cls.id]: [] }))}
                              className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-semibold border border-slate-700"
                            >
                              Clear
                            </button>
                          </div>
                          <p className="text-[11px] text-slate-500 text-center italic mt-2">
                            Hold Ctrl/Cmd to select multiple
                          </p>
                        </div>
                      </div>

                      {/* SELECTED TAGS PREVIEW */}
                      {(selectedStudents[cls.id]?.length > 0) && (
                        <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
                          {selectedStudents[cls.id].map(id => {
                            const student = students.find(s => String(s.id) === String(id));
                            return student && (
                              <span key={id} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
                                {student.name}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </section>

                    {/* ENROLLED STUDENTS LIST */}
                    <section>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                        Current Roster
                      </h4>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cls.members?.map((m) => (
                          <div key={m.id} className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 flex justify-between items-center hover:bg-slate-800/30 transition-colors">
                            <div className="overflow-hidden">
                              <p className="font-bold text-white truncate">{m.user?.name || "Unnamed"}</p>
                              <p className="text-xs text-slate-500 truncate">{m.user?.email}</p>
                            </div>
                            <button
                              onClick={() => removeStudent(cls.id, m.user.id)}
                              className="p-2 text-slate-600 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                              title="Remove Student"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>

                  </div>
                )}
              </div>
            ))
          )}
        </main>

        {/* CREATE CLASS MODAL */}
        {showCreateClass && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-white">New Class</h2>
                <button onClick={() => setShowCreateClass(false)} className="text-slate-500 hover:text-white"><X /></button>
              </div>
              <form onSubmit={createClass} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Class Name</label>
                  <input
                    placeholder="e.g. Computer Science - Batch A"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Link Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all appearance-none"
                  >
                    <option value="">No Course Linked</option>
                    {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowCreateClass(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-4 font-bold transition-all">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-4 font-bold shadow-lg shadow-indigo-500/20 transition-all">
                    Create Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CREATE STUDENT MODAL */}
        {showCreateStudent && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-white">Create Student</h2>
                <button onClick={() => setShowCreateStudent(false)} className="text-slate-500 hover:text-white"><X /></button>
              </div>
              <form onSubmit={createStudent} className="space-y-5">
                <input
                  placeholder="Full Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none"
                />
                <input
                  placeholder="Phone Number"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none"
                />
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowCreateStudent(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-4 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-4 font-bold shadow-lg">
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* GLOBAL UI MODAL */}
        {uiModal.show && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
              <div className="flex flex-col items-center text-center">
                {uiModal.onConfirm ? (
                  <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
                ) : (
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{uiModal.title}</h3>
                <p className="text-slate-400 mb-8">{uiModal.msg}</p>
                
                <div className="flex gap-3 w-full">
                  {uiModal.onConfirm ? (
                    <>
                      <button onClick={() => setUiModal({ show: false })} className="flex-1 bg-slate-800 hover:bg-slate-700 rounded-xl py-3 font-bold">
                        No, Cancel
                      </button>
                      <button onClick={uiModal.onConfirm} className="flex-1 bg-rose-600 hover:bg-rose-500 text-white rounded-xl py-3 font-bold transition-all">
                        Yes, Remove
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setUiModal({ show: false })} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3 font-bold">
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}