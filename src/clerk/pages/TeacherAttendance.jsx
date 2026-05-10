import { useEffect, useState } from "react";
import api from "../../shared/api";

export default function TeacherAttendance() {
  const [teachers, setTeachers] = useState([]);

  const [attendance, setAttendance] = useState(
    []
  );

  const [selectedTeacher, setSelectedTeacher] =
    useState("");

  const [remarks, setRemarks] = useState("");

  const [loading, setLoading] = useState(false);

  const [uiModal, setUiModal] = useState({
    show: false,
    title: "",
    msg: "",
  });

  useEffect(() => {
    load();
  }, []);

  /* =========================================================
     LOAD
  ========================================================= */

  async function load() {
    try {
      setLoading(true);

      const [teachersRes, attendanceRes] =
        await Promise.all([
          api.get("/clerk/teachers"),

          api.get(
            "/teacher-attendance/today"
          ),
        ]);

      setTeachers(teachersRes.data || []);

      setAttendance(
        attendanceRes.data.attendances || []
      );
    } catch (err) {
      showAlert(
        "Error",
        "Failed to load data"
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     ALERT
  ========================================================= */

  function showAlert(title, msg) {
    setUiModal({
      show: true,
      title,
      msg,
    });
  }

  /* =========================================================
     FORMAT TIME
  ========================================================= */

  function formatIST(dateString) {
    if (!dateString) return "-";

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

  /* =========================================================
     CHECK IN
  ========================================================= */

  async function checkInTeacher() {
    if (!selectedTeacher) {
      return showAlert(
        "Required",
        "Select teacher"
      );
    }

    try {
      await api.post(
        "/teacher-attendance/checkin",
        {
          teacherId: selectedTeacher,
          remarks,
        }
      );

      setSelectedTeacher("");
      setRemarks("");

      load();

      showAlert(
        "Success",
        "Teacher checked in"
      );
    } catch (err) {
      showAlert(
        "Error",
        err.response?.data?.message ||
          "Check in failed"
      );
    }
  }

  /* =========================================================
     CHECK OUT
  ========================================================= */

  async function checkoutTeacher(
    attendanceId
  ) {
    try {
      await api.post(
        "/teacher-attendance/checkout",
        {
          attendanceId,
        }
      );

      load();

      showAlert(
        "Success",
        "Teacher checked out"
      );
    } catch (err) {
      showAlert(
        "Error",
        err.response?.data?.message ||
          "Checkout failed"
      );
    }
  }

  /* =========================================================
     CALCULATE HOURS
  ========================================================= */

  function calculateHours(
    checkIn,
    checkOut
  ) {
    if (!checkIn || !checkOut) return "-";

    const diff =
      (new Date(checkOut) -
        new Date(checkIn)) /
      (1000 * 60 * 60);

    return diff.toFixed(2) + " hrs";
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}

        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black">
            Teacher Attendance
          </h1>

          <p className="text-slate-400 mt-2">
            Manage teacher check-ins and
            attendance.
          </p>
        </div>

        {/* CHECKIN CARD */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">

          <h2 className="text-xl font-bold">
            Teacher Check In
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {/* TEACHER */}

            <select
              value={selectedTeacher}
              onChange={(e) =>
                setSelectedTeacher(
                  e.target.value
                )
              }
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
            >
              <option value="">
                Select Teacher
              </option>

              {teachers.map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                >
                  {t.name}
                </option>
              ))}
            </select>

            {/* REMARKS */}

            <input
              placeholder="Remarks (optional)"
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
            />

            {/* BUTTON */}

            <button
              onClick={checkInTeacher}
              className="bg-indigo-600 hover:bg-indigo-500 rounded-xl px-5 py-3 font-bold"
            >
              Check In
            </button>

          </div>
        </div>

        {/* TODAY TABLE */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          <div className="p-5 border-b border-slate-800 flex justify-between items-center">

            <div>
              <h2 className="text-xl font-bold">
                Today's Attendance
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                {attendance.length} Records
              </p>
            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-slate-950 text-slate-400">
                <tr>

                  <th className="text-left px-5 py-4">
                    Teacher
                  </th>

                  <th className="text-left px-5 py-4">
                    Status
                  </th>

                  <th className="text-left px-5 py-4">
                    Check In
                  </th>

                  <th className="text-left px-5 py-4">
                    Check Out
                  </th>

                  <th className="text-left px-5 py-4">
                    Working Hours
                  </th>

                  <th className="text-left px-5 py-4">
                    Remarks
                  </th>

                  <th className="text-left px-5 py-4">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {attendance.map((a) => (
                  <tr
                    key={a.id}
                    className="border-t border-slate-800"
                  >

                    {/* NAME */}

                    <td className="px-5 py-4">

                      <div className="font-semibold">
                        {a.teacher?.name}
                      </div>

                      <div className="text-xs text-slate-500">
                        {a.teacher?.email}
                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <span className="px-3 py-1 rounded-full bg-emerald-600/20 text-emerald-400 text-xs font-bold">
                        {a.status?.toUpperCase()}
                      </span>

                    </td>

                    {/* CHECKIN */}

                    <td className="px-5 py-4 text-slate-300">
                      {formatIST(a.checkIn)}
                    </td>

                    {/* CHECKOUT */}

                    <td className="px-5 py-4 text-slate-300">
                      {formatIST(a.checkOut)}
                    </td>

                    {/* HOURS */}

                    <td className="px-5 py-4 text-slate-300">
                      {calculateHours(
                        a.checkIn,
                        a.checkOut
                      )}
                    </td>

                    {/* REMARKS */}

                    <td className="px-5 py-4 text-slate-400">
                      {a.remarks || "-"}
                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-4">

                      {!a.checkOut ? (
                        <button
                          onClick={() =>
                            checkoutTeacher(
                              a.id
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-sm font-bold"
                        >
                          Check Out
                        </button>
                      ) : (
                        <span className="text-slate-500 text-sm">
                          Completed
                        </span>
                      )}

                    </td>

                  </tr>
                ))}

                {!loading &&
                  attendance.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-16 text-slate-500"
                      >
                        No attendance records
                        today
                      </td>
                    </tr>
                  )}

              </tbody>

            </table>

          </div>
        </div>

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