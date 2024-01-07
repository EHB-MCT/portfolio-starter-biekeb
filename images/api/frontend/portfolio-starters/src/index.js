import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.js";
import UserDashboard from "./components/UserDashboard.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Adjust the import path
import Login from "./components/Login.jsx";
import { KeyboardControls } from "@react-three/drei";
import Level from "./components/User/Level.jsx";
import AccountSettings from "./components/User/AccountSettings.jsx";
import OnWin from "./components/User/OnWin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />
    ),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute element={<UserDashboard />} allowedRoles={["user"]} />
    ),
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/level",
    element: <ProtectedRoute element={<Level />} allowedRoles={["user"]} />,
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute element={<AccountSettings />} allowedRoles={["user"]} />
    ),
  },
  {
    path: "/win",
    element: <ProtectedRoute element={<OnWin />} allowedRoles={["user"]} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <RouterProvider router={router} />
    </KeyboardControls>
  </React.StrictMode>
);
