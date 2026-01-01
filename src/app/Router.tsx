import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelectPage from "../pages/RoleSelectPage";
import UserJobsPage from "../pages/UserJobsPage";
import AdminJobsPage from "../pages/AdminJobsPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelectPage />} />
        <Route path="/user/jobs" element={<UserJobsPage />} />
        <Route path="/admin/jobs" element={<AdminJobsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
