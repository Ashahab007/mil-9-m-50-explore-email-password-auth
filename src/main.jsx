import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./layout/Root/Root.jsx";
import Home from "./components/Home/Home.jsx";
import "./App.css";
import LogIn from "./components/LogIn/LogIn.jsx";
import Registar from "./components/Registar/Registar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: LogIn },
      { path: "registar", Component: Registar },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
