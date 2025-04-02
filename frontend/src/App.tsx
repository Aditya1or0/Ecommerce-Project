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
import Dashboard from "./page/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Unprotected from "./components/UnprotectedRoute";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-8 md:px-10 lg:px-22 bg-gradient-to-b from-gray-100/50  to-teal-100/20">
      <ToastContainer theme="dark" position="bottom-right" autoClose={1000} />
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <Unprotected>
                <Login />
              </Unprotected>
            }
          />

          <Route
            path="*"
            element={
              <h1 className="font-semibold text-xl text-center my-8 text-gray-700">
                404 Not Found
              </h1>
            }
          />
        </Routes>
      </ErrorBoundary>

      <Footer />
    </div>
  );
};

export default App;
