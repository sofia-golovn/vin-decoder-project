import React from "react";
import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="app-wrapper">
      <header className="main-header">
        <div className="header-container">
          <Link to="/" className="logo">
            VIN Decoder
          </Link>
          <nav className="main-nav">
            <Link to="/">Головна</Link>
            <Link to="/variables">Змінні</Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="main-footer">
        <p>&copy; 2026 VIN Decoder SPA.</p>
      </footer>
    </div>
  );
}
