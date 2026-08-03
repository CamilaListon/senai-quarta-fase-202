import { createBrowserRouter, Outlet } from "react-router";
import Register from "./pages/Register/Register.tsx";
import Login from "./pages/Login/Login.tsx";
import Home from "./pages/Home/Home.tsx";
import Header from "./components/Header.tsx";


const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#161410]">
      <Header />
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);