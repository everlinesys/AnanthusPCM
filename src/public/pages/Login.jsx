import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdLaunch } from "react-icons/md";
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
    <div className="min-h-screen mx-auto py-20 px-4 md:px-10 bg-gray-100 text-black flex items-center justify-center">
      <div className="w-full max-w-md py-10 space-y-6 px-8 md:px-10 bg-white rounded-xl shadow-lg text-black">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Login</h2>
          <p className="text-gray-500 text-sm">
            Access your learning dashboard
          </p>
        </div>

        {/* Credentials Form */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-gray-300 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-gray-300 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className={`w-full py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-all ${brand.theme.button.primary} ${brand.theme.shape?.radius || ""}`}
            style={{ transition: "background-color 0.3s ease" }}
          >
            Login
          </button>
        </div>

        {/* LMS Registration Link */}
        <p className="text-center text-sm text-gray-600">
          New to {brand.siteName}?{" "}
          <Link
            to="/register"
            className="font-semibold text-black hover:underline"
          >
            Register Here
          </Link>
        </p>

        <hr className="border-gray-200 my-4" />

        {/* Redesigned ERP Gateway (Placed Safely below primary flows) */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-xs text-gray-800">Looking for ERP?</h3>
            <p className="text-[11px] text-gray-500">
              Management portal login
            </p>
          </div>

          <a
            href="https://institution-hub--pcmananthus.replit.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-100 transition shadow-sm"
          >
            ERP Portal
            <MdLaunch size={14} className="text-gray-400" />
          </a>
        </div>

        {popup && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
            Invalid credentials. Please try again.
          </div>
        )}

      </div>
    </div>
  );
}