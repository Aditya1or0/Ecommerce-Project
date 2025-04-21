import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./AppRoutes";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer theme="dark" position="bottom-right" autoClose={1000} />
      <AppRoutes />
    </>
  );
};

export default App;
