import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";

const PrivateLayout = () => {
  const TOKEN = localStorage.getItem("token");
  console.log("token: " + TOKEN);
  if (!TOKEN) {
    console.log("token not seted!");
    return <Navigate to="/login" replace />;
  }

  // Render protected routes if authenticated
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000} // Close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default PrivateLayout;
