import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans">
      {/* Sticky header navbar */}
      <Navbar />

      {/* Main page content area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating scroll to top utility */}
      <ScrollToTopButton />
    </div>
  );
}
