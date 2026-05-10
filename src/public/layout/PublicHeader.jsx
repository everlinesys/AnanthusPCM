import { Link, NavLink } from "react-router-dom";
import { getUser } from "../../shared/auth";
import { useBranding } from "../../shared/hooks/useBranding";
import themes from "../../config/themes.json";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function PublicHeader() {
  const user = getUser();
  const brand = useBranding();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const theme =
    themes?.[brand.theme] ||
    themes.darkModern;

  /* ACTIVE LINKS */

  const activeLink =
    "text-white font-bold after:content-[''] after:block after:w-full after:h-0.5 after:bg-white after:rounded-full";

  const normalLink =
    "text-white/80 font-medium hover:text-white transition-colors";

  return (
    <header className="sticky top-0 z-[100] bg-emerald-600 backdrop-blur-md border-b border-emerald-600 shadow-sm px-4 md:px-16">

      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-3 group"
        >

          {brand.logo ? (
            <img
              src={brand.logo}
              alt={brand.siteName}
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="h-11 w-11 bg-white rounded-xl flex items-center justify-center text-emerald-700 font-semibold shadow-lg">
              {brand.siteName?.charAt(0)}
            </div>
          )}

          <span className="text-xl md:text-2xl font-black text-white tracking-tight italic">
            {brand.siteName}
          </span>

        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden md:flex items-center gap-8">

          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive
                ? activeLink
                : normalLink
            }
          >
            Courses
          </NavLink>

          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              isActive
                ? activeLink
                : normalLink
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? activeLink
                : normalLink
            }
          >
            Contact
          </NavLink>

        </nav>

        {/* RIGHT ACTIONS */}

        <div className="flex items-center gap-4">

          {!user ? (
            <div className="flex items-center gap-2 md:gap-4">

              {/* LOGIN */}

              <Link
                to="/login"
                className="hidden sm:block text-white font-bold hover:text-white/80 px-4 py-2 transition-colors"
              >
                Login
              </Link>

              {/* JOIN */}

              <Link
                to="/register"
                className="bg-white text-emerald-700 px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-emerald-50 hover:-translate-y-0.5 transition-all active:scale-95 text-sm"
              >
                Join Now
              </Link>

            </div>
          ) : (
            <Link
              to={
                user.role === "student"
                  ? "/student"
                  : user.role === "ADMIN"
                  ? "/admin"
                  : "/teacher"
              }
              className="bg-white text-emerald-700 px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-emerald-50 transition-all"
            >
              Dashboard
            </Link>
          )}

          {/* MOBILE MENU BUTTON */}

          <button
            className="md:hidden p-2 text-white"
            onClick={() =>
              setIsMenuOpen(
                !isMenuOpen
              )
            }
          >
            {isMenuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-emerald-700 border-b border-emerald-600 p-6 flex flex-col gap-5 animate-in slide-in-from-top duration-300 shadow-2xl">

          <NavLink
            to="/courses"
            onClick={() =>
              setIsMenuOpen(false)
            }
            className={normalLink}
          >
            Courses
          </NavLink>

          <NavLink
            to="/aboutus"
            onClick={() =>
              setIsMenuOpen(false)
            }
            className={normalLink}
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() =>
              setIsMenuOpen(false)
            }
            className={normalLink}
          >
            Contact
          </NavLink>

          {!user && (
            <Link
              to="/login"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="text-white font-bold pt-2"
            >
              Login
            </Link>
          )}

        </div>
      )}
    </header>
  );
}