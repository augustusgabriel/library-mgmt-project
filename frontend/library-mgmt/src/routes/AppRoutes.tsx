import { Routes, Route, Navigate } from "react-router-dom";
import type { JSX } from "react";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Books from "../pages/Books";


function PrivateRoute({ children }: { children: JSX.Element}) {
    const isAuthenticated = true;

    return isAuthenticated ? children : <Navigate to="/login" />;
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
                        <Books />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}