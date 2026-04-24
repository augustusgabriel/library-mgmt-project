import { Routes, Route, Navigate } from "react-router-dom";
import type { JSX } from "react";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Books from "../pages/Books";
import Users from "../pages/Users";


function PrivateRoute({ children }: { children: JSX.Element}) {
    const token = localStorage.getItem("access");

    if (!token) {
        return <Navigate to={'/login'} replace />
    }

    return children;
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Users />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}