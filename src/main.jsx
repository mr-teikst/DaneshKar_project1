import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./routes/index.jsx";
import { BookProvider } from "./contexts/BookContext.jsx";
createRoot(document.getElementById("root")).render(
  <BookProvider>
    <RouterProvider router={router} />
  </BookProvider>
);
