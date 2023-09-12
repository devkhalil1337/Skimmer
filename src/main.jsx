import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import ModelSelector from "./Components/ModelSelector/ModelSelector.jsx";
import Skimmer14 from "./Pages/Skimmer14.jsx";
import Skimmer16 from "./Pages/Skimmer16.jsx";

const router = createBrowserRouter([
  {
    path: "/Skimmer14",
    element: <Skimmer14 />,
  },
  {
    path: "/Skimmer16",
    element: <Skimmer16 />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
