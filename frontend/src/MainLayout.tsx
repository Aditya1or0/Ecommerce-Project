import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100/50 to-teal-100/20">
      <Navbar />

      <main className="flex-1 px-4 sm:px-8 md:px-10 lg:px-22">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
