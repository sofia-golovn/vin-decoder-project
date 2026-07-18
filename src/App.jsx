import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import VariablesPage from "./pages/VariablesPage";
import VariableDetailPage from "./pages/VariableDetailPage";

export default function App() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("vin_history");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("vin_history", JSON.stringify(history));
  }, [history]);

  const addToHistory = (vin) => {
    const cleanVin = vin.toUpperCase().trim();
    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== cleanVin);
      return [cleanVin, ...filtered].slice(0, 3);
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage history={history} addToHistory={addToHistory} />} />
          <Route path="variables" element={<VariablesPage />} />
          <Route path="variables/:variableId" element={<VariableDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
