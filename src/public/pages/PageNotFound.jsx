import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import { useBranding } from "../../shared/hooks/useBranding";

export default function PageNotFound() {
  const brand = useBranding();

  return (
    <div className={`${brand.theme.layout.page} min-h-screen w-[100vw] flex items-center justify-center px-4`}>
      
      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="p-5 rounded-full"
            style={{ backgroundColor: `${brand.colors.primary}20` }}
          >
            <BookOpen size={40} style={{ color: brand.colors.primary }} />
          </div>
        </div>

        {/* 404 */}
        <h1 className={`${brand.theme.text.title} text-5xl mb-2`}>
          404
        </h1>

        {/* Title */}
        <h2 className={`${brand.theme.text.subtitle} text-xl mb-2`}>
          Page Not Found
        </h2>

        {/* Message */}
        <p className={`${brand.theme.text.body} mb-6`}>
          This page doesn’t exist or has been moved.  
          Let’s get you back to {brand.siteName}.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-3 flex-wrap">

          <Link
            to="/"
            className={`${brand.theme.button.primary} px-5 py-2 ${brand.theme.shape.buttonRadius}`}
            style={{ background: brand.colors.accent }}
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className={`${brand.theme.button.secondary} px-5 py-2 ${brand.theme.shape.buttonRadius}`}
          >
            <span className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Go Back
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}