import { Navigate, Outlet } from "react-router-dom";

export function RefereeRoute() {
    const authStorage = localStorage.getItem("beach-tennis-referee-session");
    const isAuthenticated = !!authStorage;

    if (!isAuthenticated) {
        return <Navigate to="/arbitro" replace />;
    }

    return <Outlet />;
}
