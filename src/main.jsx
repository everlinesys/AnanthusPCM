import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./app/App.jsx";

/* =========================================
   FORCE SCROLL TOP
========================================= */

window.history.scrollRestoration = "manual";

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

/* =========================================
   SERVICE WORKER
========================================= */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() =>
        console.log("SW registered")
      )
      .catch(console.error);
  });
}

/* =========================================
   RENDER
========================================= */

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <App />
  </StrictMode>
);