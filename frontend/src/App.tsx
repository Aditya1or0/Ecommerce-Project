import React from "react";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Home from "./page/Home";
import { Route, Routes } from "react-router-dom";
import Products from "./page/Products";
import Cart from "./page/Cart";
import ProductDetails from "./page/ProductDetails";
import About from "./page/About";
import Login from "./page/Login";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-8 md:px-10 lg:px-22 bg-gradient-to-b from-teal-100/20 to-gray-100/30">
      <ToastContainer theme="dark" position="bottom-right" autoClose={1000} />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
