import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleSelectPage from "../pages/RoleSelectPage";
import UserJobsPage from "../pages/UserJobsPage";
import AdminJobsPage from "../pages/AdminJobsPage";
import type { Role } from "./App";

type Props = {
  role: Role;
  onSelectRole: (role: "USER" | "ADMIN") => void;
  onClearRole: () => void;
};

export default function AppRouter({
  role,
  onSelectRole,
  onClearRole,
}: {
  role: Role;
  onSelectRole: (role: "user" | "admin") => void;
  onClearRole: () => void;
}) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RoleSelectPage
              role={role}
              onSelectRole={onSelectRole}
              onClearRole={onClearRole}
            />
          }
        />
        <Route
          path="/user/jobs"
          element={role === "user" ? <UserJobsPage /> : <Navigate to="/" />}
        />

        <Route
          path="/admin/jobs"
          element={role === "admin" ? <AdminJobsPage /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
