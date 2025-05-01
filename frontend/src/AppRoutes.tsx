// import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import UnprotectedRoute from "./components/routes/UnprotectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./page/Home";
import Products from "./page/Products";
import Cart from "./page/Cart";
import ProductDetails from "./page/ProductDetails";
import About from "./page/About";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import MainLayout from "./MainLayout";
import OrderPage from "./page/Orders";
import AdminPanel from "./page/AdminPanel";

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Products />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Cart />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProductDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <UnprotectedRoute>
              <Login />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <UnprotectedRoute>
              <OrderPage cart={[]} totalAmount={0} />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <MainLayout>
              <AdminPanel />
            </MainLayout>
          }
        />
        <Route
          path="*"
          element={
            <MainLayout>
              <h1 className="font-semibold text-xl text-center my-8 text-gray-700">
                404 Not Found
              </h1>
            </MainLayout>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
