import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "PieChart",
          element: <PieChart />,
        },
        {
          path: "BarChart",
          element: <BarChart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
