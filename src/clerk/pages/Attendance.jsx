import { useEffect, useState } from "react";
import api from "../../shared/api";

export default function Attendance() {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");

    const [students, setStudents] = useState([]);

    const [attendanceHistory, setAttendanceHistory] =
        useState([]);

    const [attendanceMap, setAttendanceMap] = useState(
        {}
    );

    const [topic, setTopic] = useState("");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [uiModal, setUiModal] = useState({
        show: false,
        title: "",
        msg: "",
    });

    useEffect(() => {
        loadClasses();
    }, []);

    /* =========================================================
       LOAD CLASSES
    ========================================================= */

    async function loadClasses() {
        try {
            setLoading(true);

            const res = await api.get("/classes");

            setClasses(res.data || []);
        } catch (err) {
            showAlert("Error", "Failed to load classes");
        } finally {
            setLoading(false);
        }
    }

    /* =========================================================
       SELECT CLASS
    ========================================================= */

    async function selectClass(classId) {
        try {
            setSelectedClass(classId);

            const [studentsRes, historyRes] =
                await Promise.all([
                    api.get(`/classes/${classId}/students`),

                    api.get(
                        `/attendance/report?groupId=${classId}`
                    ),
                ]);

            setStudents(studentsRes.data || []);

            setAttendanceHistory(
                historyRes.data.sessions || []
            );

            // initialize attendance map
            const initialMap = {};

            (studentsRes.data || []).forEach(
                (student) => {
                    initialMap[student.id] = "present";
                }
            );

            setAttendanceMap(initialMap);
        } catch (err) {
            showAlert("Error", "Failed to load data");
        }
    }

    /* =========================================================
       UPDATE STATUS
    ========================================================= */

    function updateStatus(studentId, status) {
        setAttendanceMap((prev) => ({
            ...prev,
            [studentId]: status,
        }));
    }

    /* =========================================================
       SAVE ATTENDANCE
    ========================================================= */

    async function submitAttendance() {
        if (!selectedClass) {
            return showAlert(
                "Required",
                "Please select a class"
            );
        }

        try {
            setSaving(true);

            const selectedClassData = classes.find(
                (c) => c.id === Number(selectedClass)
            );

            // create session
            const sessionRes = await api.post(
                "/attendance/session",
                {
                    groupId: Number(selectedClass),
                    topic,
                    date: new Date(),
                }
            );

            const attendanceId =
                sessionRes.data.attendanceSession.id;

            const records = students.map((student) => ({
                studentId: student.id,

                status:
                    attendanceMap[student.id] || "present",
            }));

            // mark attendance
            await api.post("/attendance/mark", {
                attendanceId,
                records,
            });

            // reload history
            const historyRes = await api.get(
                `/attendance/report?groupId=${selectedClass}`
            );

            setAttendanceHistory(
                historyRes.data.sessions || []
            );

            showAlert(
                "Success",
                `Attendance saved for ${selectedClassData?.name}`
            );
        } catch (err) {
            console.error(err);

            showAlert(
                "Error",
                err.response?.data?.message ||
                "Failed to save attendance"
            );
        } finally {
            setSaving(false);
        }
    }

    /* =========================================================
       MODAL
    ========================================================= */

    function showAlert(title, msg) {
        setUiModal({
            show: true,
            title,
            msg,
        });
    }

    /* =========================================================
       FORMAT IST DATE
    ========================================================= */

    function formatIST(dateString) {
        return new Date(dateString).toLocaleString(
            "en-IN",
            {
                timeZone: "Asia/Kolkata",

                day: "2-digit",
                month: "short",
                year: "numeric",

                hour: "numeric",
                minute: "2-digit",

                hour12: true,
            }
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-10">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* HEADER */}

                <div className="border-b border-slate-800 pb-6">
                    <h1 className="text-3xl font-black">
                        Attendance Management
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Mark and manage class attendance.
                    </p>
                </div>

                {/* TOP CONTROLS */}

                <div className="grid md:grid-cols-2 gap-4">

                    {/* CLASS SELECT */}

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                        <label className="text-sm text-slate-400 mb-2 block">
                            Select Class
                        </label>

                        <select
                            value={selectedClass}
                            onChange={(e) =>
                                selectClass(e.target.value)
                            }
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                        >
                            <option value="">
                                Choose class
                            </option>

                            {classes.map((cls) => (
                                <option
                                    key={cls.id}
                                    value={cls.id}
                                >
                                    {cls.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* TOPIC */}

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                        <label className="text-sm text-slate-400 mb-2 block">
                            Topic / Notes
                        </label>

                        <input
                            value={topic}
                            onChange={(e) =>
                                setTopic(e.target.value)
                            }
                            placeholder="Today's topic"
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                        />
                    </div>

                </div>

                {/* STUDENTS */}

                <div className="space-y-4">

                    {students.length > 0 && (
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">
                                Students
                            </h2>

                            <button
                                onClick={submitAttendance}
                                disabled={saving}
                                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold disabled:opacity-50"
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Attendance"}
                            </button>
                        </div>
                    )}

                    {students.length === 0 &&
                        selectedClass && (
                            <div className="text-center py-16 border border-dashed border-slate-700 rounded-2xl text-slate-500">
                                No students found in this class
                            </div>
                        )}

                    {students.map((student) => (
                        <div
                            key={student.id}
                            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >

                            {/* STUDENT */}

                            <div>
                                <div className="font-bold text-lg">
                                    {student.name}
                                </div>

                                <div className="text-sm text-slate-400">
                                    {student.email}
                                </div>
                            </div>

                            {/* STATUS */}

                            <div className="flex gap-2">

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            student.id,
                                            "present"
                                        )
                                    }
                                    className={`px-5 py-2 rounded-xl font-bold transition ${attendanceMap[student.id] ===
                                            "present"
                                            ? "bg-emerald-600"
                                            : "bg-slate-800"
                                        }`}
                                >
                                    Present
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            student.id,
                                            "absent"
                                        )
                                    }
                                    className={`px-5 py-2 rounded-xl font-bold transition ${attendanceMap[student.id] ===
                                            "absent"
                                            ? "bg-rose-600"
                                            : "bg-slate-800"
                                        }`}
                                >
                                    Absent
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            student.id,
                                            "late"
                                        )
                                    }
                                    className={`px-5 py-2 rounded-xl font-bold transition ${attendanceMap[student.id] ===
                                            "late"
                                            ? "bg-amber-500 text-black"
                                            : "bg-slate-800"
                                        }`}
                                >
                                    Late
                                </button>

                            </div>
                        </div>
                    ))}

                </div>

                {/* ATTENDANCE HISTORY */}

                {attendanceHistory.length > 0 && (
                    <div className="space-y-4 pt-8">

                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">
                                Attendance History
                            </h2>

                            <div className="text-sm text-slate-400">
                                {attendanceHistory.length} Sessions
                            </div>
                        </div>

                        <div className="grid gap-4">

                            {/* ATTENDANCE HISTORY */}

                            {attendanceHistory.length > 0 && (
                                <div className="space-y-6 pt-8">

                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold">
                                            Attendance History
                                        </h2>

                                        <div className="text-sm text-slate-400">
                                            {attendanceHistory.length} Sessions
                                        </div>
                                    </div>

                                    {attendanceHistory.map((session) => {

                                        const presentStudents =
                                            session.records?.filter(
                                                (r) => r.status === "present"
                                            ) || [];

                                        const absentStudents =
                                            session.records?.filter(
                                                (r) => r.status === "absent"
                                            ) || [];

                                        const lateStudents =
                                            session.records?.filter(
                                                (r) => r.status === "late"
                                            ) || [];

                                        return (
                                            <div
                                                key={session.id}
                                                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
                                            >

                                                {/* HEADER */}

                                                <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                                                    <div>
                                                        <div className="text-xl font-bold">
                                                            {session.topic ||
                                                                "Attendance Session"}
                                                        </div>

                                                        <div className="text-sm text-slate-400 mt-1">
                                                            {formatIST(session.date)}
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-3 flex-wrap">

                                                        <div className="px-4 py-2 rounded-xl bg-slate-800 text-sm">
                                                            Total:{" "}
                                                            {session.records?.length || 0}
                                                        </div>

                                                        <div className="px-4 py-2 rounded-xl bg-emerald-600/20 text-emerald-400 text-sm font-semibold">
                                                            Present: {presentStudents.length}
                                                        </div>

                                                        <div className="px-4 py-2 rounded-xl bg-rose-600/20 text-rose-400 text-sm font-semibold">
                                                            Absent: {absentStudents.length}
                                                        </div>

                                                        <div className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-400 text-sm font-semibold">
                                                            Late: {lateStudents.length}
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* TABLE */}

                                                <div className="overflow-x-auto">

                                                    <table className="w-full text-sm">

                                                        <thead className="bg-slate-950 text-slate-400">
                                                            <tr>

                                                                <th className="text-left px-5 py-4 font-semibold">
                                                                    Student
                                                                </th>

                                                                <th className="text-left px-5 py-4 font-semibold">
                                                                    Status
                                                                </th>

                                                                <th className="text-left px-5 py-4 font-semibold">
                                                                    Marked At
                                                                </th>

                                                            </tr>
                                                        </thead>

                                                        <tbody>

                                                            {session.records?.map((record) => (
                                                                <tr
                                                                    key={record.id}
                                                                    className="border-t border-slate-800"
                                                                >

                                                                    {/* NAME */}

                                                                    <td className="px-5 py-4">
                                                                        <div className="font-semibold">
                                                                            {record.student?.name}
                                                                        </div>
                                                                    </td>

                                                                    {/* STATUS */}

                                                                    <td className="px-5 py-4">

                                                                        {record.status ===
                                                                            "present" && (
                                                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600/20 text-emerald-400">
                                                                                    PRESENT
                                                                                </span>
                                                                            )}

                                                                        {record.status ===
                                                                            "absent" && (
                                                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600/20 text-rose-400">
                                                                                    ABSENT
                                                                                </span>
                                                                            )}

                                                                        {record.status ===
                                                                            "late" && (
                                                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400">
                                                                                    LATE
                                                                                </span>
                                                                            )}

                                                                    </td>

                                                                    {/* TIME */}

                                                                    <td className="px-5 py-4 text-slate-400">
                                                                        {formatIST(record.markedAt)}
                                                                    </td>

                                                                </tr>
                                                            ))}

                                                        </tbody>

                                                    </table>

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>
                            )}

                        </div>
                    </div>
                )}

                {/* LOADING */}

                {loading && (
                    <div className="text-center py-20 text-slate-500">
                        Loading...
                    </div>
                )}

                {/* MODAL */}

                {uiModal.show && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-sm">

                            <h3 className="text-xl font-bold mb-3">
                                {uiModal.title}
                            </h3>

                            <p className="text-slate-400 text-sm mb-6">
                                {uiModal.msg}
                            </p>

                            <button
                                onClick={() =>
                                    setUiModal({
                                        show: false,
                                        title: "",
                                        msg: "",
                                    })
                                }
                                className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl py-3 font-bold"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}