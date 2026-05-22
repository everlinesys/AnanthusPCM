import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdLaunch, MdSchool, MdBusinessCenter } from "react-icons/md";
import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/useBranding";

export default function Login() {
  const brand = useBranding();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      if (data.user.role === "ADMIN") navigate("/admin");
      else if (data.user.role === "CLERK") navigate("/clerk");
      else if (data.user.role === "TEACHER") navigate("/teacher");
      else navigate("/student");
    } catch (err) {
      setPopup(true);
      setTimeout(() => setPopup(false), 3000);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-10 bg-gray-100 text-black flex items-center justify-center">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* Left Column: Primary LMS Login */}
        <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <MdSchool size={22} />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">LMS Gateway</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Learning Dashboard</h2>
            <p className="text-gray-500 text-sm">
              Sign in to access your courses, schedules, and assignments.
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-gray-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-gray-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className={`w-full py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-all ${brand.theme.button.primary} ${brand.theme.shape?.radius || ""}`}
              style={{ transition: "background-color 0.3s ease" }}
            >
              Sign In to LMS
            </button>
          </div>

          <p className="text-center md:text-left text-sm text-gray-600">
            New to {brand.siteName}?{" "}
            <Link
              to="/register"
              className="font-semibold text-black hover:underline"
            >
              Register Here
            </Link>
          </p>
        </div>

        {/* Right Column: Equal Weight ERP Hub Gateway */}
        <div className="bg-gray-50 p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center items-start space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <MdBusinessCenter size={22} className="text-gray-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Management Hub</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Institution ERP</h2>
            <p className="text-gray-500 text-sm">
              Access administrative tools, payroll, billing, and system configurations.
            </p>
          </div>

          <div className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              The management portal operates on an isolated secure infrastructure. Click below to open the ERP console.
            </p>
            
            <a
              href="https://institution-hub--pcmananthus.replit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-gray-900 text-white font-medium hover:bg-black transition-all shadow-md group"
            >
              Launch ERP Portal
              <MdLaunch size={18} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="text-xs text-gray-400">
            Authorized personnel only. Sessions are logged for compliance monitoring.
          </div>
        </div>

      </div>

      {popup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Invalid credentials. Please try again.
        </div>
      )}
    </div>
  );
}