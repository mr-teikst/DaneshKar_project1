import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const PublicLayout = () => {
  return (
    <>
      <Outlet />
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

export default PublicLayout;
