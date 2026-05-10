import { useEffect, useState } from "react";
import { Download, X, Sparkles } from "lucide-react"; // Optional: lucide-react for icons

export default function InstallButton() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPromptEvent(e);
      // Small delay to make the entrance feel intentional
      setTimeout(() => setIsVisible(true), 1000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) return;
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    if (result.outcome === "accepted") {
      setIsVisible(false);
    }
    setPromptEvent(null);
  };

  if (!promptEvent || !isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-8 z-50 flex justify-center px-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white/80 p-1 shadow-2xl backdrop-blur-xl dark:bg-slate-900/80 border border-white/20">
        
        {/* Subtle Decorative Gradient Background */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
        
        <div className="relative flex items-center gap-4 p-4">
          {/* App Icon Mockup */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200 dark:shadow-none">
            <Download className="text-white" size={28} />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Install App
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Get the best experience on your home screen.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleInstall}
              className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-transform active:scale-95 dark:bg-white dark:text-slate-900"
            >
              Install
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-[10px] font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}