import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Books from "../pages/Books";
import Users from "../pages/Users";
import Sidebar from "../components/Sidebar";

function PrivateRoute() {
    const token = localStorage.getItem("access");

    return token ? <Outlet /> : <Navigate to={"/login"} replace />
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
                <Route element={<Sidebar />}>
                    <Route path="/" element={<Users />} />
                    <Route path="/books" element={<Books />} />
                </Route>
            </Route>
        </Routes>
    );
}