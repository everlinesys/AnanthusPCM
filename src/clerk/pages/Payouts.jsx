import { useEffect, useState } from "react";
import api from "../../shared/api";

export default function Payouts() {
  const [teachers, setTeachers] = useState([]);

  const [payouts, setPayouts] = useState([]);

  const [selectedTeacher, setSelectedTeacher] =
    useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [hours, setHours] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");

  const [remarks, setRemarks] = useState("");

  const [manualMode, setManualMode] =
    useState(false);

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

      const [teachersRes, payoutsRes] =
        await Promise.all([
          api.get("/clerk/teachers"),

          api.get("/clerk/manual-payouts"),
        ]);

      setTeachers(teachersRes.data || []);

      setPayouts(
        payoutsRes.data.payouts || []
      );
    } catch (err) {
      showAlert(
        "Error",
        "Failed to load payouts"
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
     FORMAT
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
     CREATE PAYOUT
  ========================================================= */

  async function createPayout(e) {
    e.preventDefault();

    if (!selectedTeacher) {
      return showAlert(
        "Required",
        "Select teacher"
      );
    }

    try {
      const payload = {
        teacherId: Number(
          selectedTeacher
        ),

        fromDate,

        toDate,

        remarks,

        isManual: manualMode,
      };

      // MANUAL
      if (manualMode) {
        payload.manualHours =
          Number(hours);

        payload.manualAmount =
          Number(amount);

        payload.rate =
          Number(rate);
      }

      await api.post(
        "/clerk/manual-payouts",
        payload
      );

      setSelectedTeacher("");

      setFromDate("");
      setToDate("");

      setHours("");
      setRate("");
      setAmount("");

      setRemarks("");

      setManualMode(false);

      load();

      showAlert(
        "Success",
        "Payout created"
      );
    } catch (err) {
      showAlert(
        "Error",
        err.response?.data?.message ||
          "Failed to create payout"
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}

        <div className="border-b border-slate-800 pb-6">

          <h1 className="text-3xl font-black">
            Teacher Payouts
          </h1>

          <p className="text-slate-400 mt-2">
            Manage teacher salary and
            payouts.
          </p>

        </div>

        {/* CREATE */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold">
              Create Payout
            </h2>

            {/* MODE */}

            <button
              onClick={() =>
                setManualMode(
                  !manualMode
                )
              }
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                manualMode
                  ? "bg-amber-500 text-black"
                  : "bg-indigo-600"
              }`}
            >
              {manualMode
                ? "MANUAL MODE"
                : "AUTO MODE"}
            </button>

          </div>

          <form
            onSubmit={createPayout}
            className="space-y-5"
          >

            {/* TOP */}

            <div className="grid md:grid-cols-2 gap-4">

              <select
                value={
                  selectedTeacher
                }
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

              <input
                placeholder="Remarks"
                value={remarks}
                onChange={(e) =>
                  setRemarks(
                    e.target.value
                  )
                }
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
              />

            </div>

            {/* DATES */}

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setFromDate(
                    e.target.value
                  )
                }
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
              />

              <input
                type="date"
                value={toDate}
                onChange={(e) =>
                  setToDate(
                    e.target.value
                  )
                }
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
              />

            </div>

            {/* MANUAL */}

            {manualMode && (
              <div className="grid md:grid-cols-3 gap-4">

                <input
                  type="number"
                  placeholder="Hours"
                  value={hours}
                  onChange={(e) =>
                    setHours(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  placeholder="Rate / Hour"
                  value={rate}
                  onChange={(e) =>
                    setRate(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  placeholder="Manual Amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                />

              </div>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 rounded-xl px-6 py-3 font-bold"
            >
              Create Payout
            </button>

          </form>

        </div>

        {/* PAYOUT TABLE */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          <div className="p-5 border-b border-slate-800">

            <h2 className="text-xl font-bold">
              Payout History
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-slate-950 text-slate-400">
                <tr>

                  <th className="text-left px-5 py-4">
                    Teacher
                  </th>

                  <th className="text-left px-5 py-4">
                    Mode
                  </th>

                  <th className="text-left px-5 py-4">
                    Hours
                  </th>

                  <th className="text-left px-5 py-4">
                    Rate
                  </th>

                  <th className="text-left px-5 py-4">
                    Amount
                  </th>

                  <th className="text-left px-5 py-4">
                    Period
                  </th>

                  <th className="text-left px-5 py-4">
                    Remarks
                  </th>

                </tr>
              </thead>

              <tbody>

                {payouts.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-slate-800"
                  >

                    {/* TEACHER */}

                    <td className="px-5 py-4">

                      <div className="font-semibold">
                        {p.teacher?.name}
                      </div>

                      <div className="text-xs text-slate-500">
                        {p.teacher?.email}
                      </div>

                    </td>

                    {/* MODE */}

                    <td className="px-5 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          p.isManual
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-indigo-600/20 text-indigo-400"
                        }`}
                      >
                        {p.isManual
                          ? "MANUAL"
                          : "AUTO"}
                      </span>

                    </td>

                    {/* HOURS */}

                    <td className="px-5 py-4">
                      {p.isManual
                        ? p.manualHours
                        : p.totalHours}
                    </td>

                    {/* RATE */}

                    <td className="px-5 py-4">
                      ₹{p.rate}
                    </td>

                    {/* AMOUNT */}

                    <td className="px-5 py-4 font-bold text-emerald-400">
                      ₹
                      {p.isManual
                        ? p.manualAmount
                        : p.amount}
                    </td>

                    {/* PERIOD */}

                    <td className="px-5 py-4 text-slate-400">

                      <div>
                        {formatIST(
                          p.fromDate
                        )}
                      </div>

                      <div className="text-xs">
                        to
                      </div>

                      <div>
                        {formatIST(
                          p.toDate
                        )}
                      </div>

                    </td>

                    {/* REMARKS */}

                    <td className="px-5 py-4 text-slate-400">
                      {p.remarks || "-"}
                    </td>

                  </tr>
                ))}

                {!loading &&
                  payouts.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-16 text-slate-500"
                      >
                        No payouts found
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