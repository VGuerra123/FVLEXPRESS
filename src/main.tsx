import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Marketplace } from "./pages/Marketplace";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Landing principal */}
        <Route path="/" element={<App />} />

        {/* Marketplace completo */}
        <Route path="/marketplace" element={<Marketplace />} />


        {/* Ruta no encontrada */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
              <p className="text-gray-600">
                Página no encontrada.{" "}
                <a href="/" className="text-blue-600 underline">
                  Volver al inicio
                </a>
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
