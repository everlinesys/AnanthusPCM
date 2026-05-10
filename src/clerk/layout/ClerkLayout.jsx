import { useState } from "react";
import { Outlet } from "react-router-dom";
import ClerkSidebar from "./ClerkSidebar";
import ClerkHeader from "./ClerkHeader";

export default function ClerkLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 min-w-screen">

      {/* ⭐ SIDEBAR */}
      <ClerkSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ⭐ MAIN */}
      <div className="flex-1 flex flex-col">

        <ClerkHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto text-black font-sm">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
