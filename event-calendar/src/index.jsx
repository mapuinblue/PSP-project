import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Error from "./routes/Error";
import Login from "./routes/Login";
import Register from "./routes/Register";
import { DateProvider } from "./context/datecontext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <DateProvider>
      <RouterProvider router={router} />
    </DateProvider>
  </>
);
