import { useNavigate } from "react-router-dom";
import type { Role } from "../app/App";

function RoleSelectPage({
  role,
  onSelectRole,
  onClearRole,
}: {
  role: Role;
  onSelectRole: (role: "user" | "admin") => void;
  onClearRole: () => void;
}) {
  const navigate = useNavigate();

  const handleSelect = (r: "user" | "admin") => {
    onSelectRole(r);
    navigate(r === "user" ? "/user/jobs" : "/admin/jobs");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-6 px-6">
      <div className="w-full max-w-3xl pl-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-extrabold text-blue-600 tracking-tight">
            Job Board
          </h1>
        </div>

        {/* Role Selection */}
        {!role && (
          <div className="flex flex-col items-center space-y-4 mt-4">
            <p className="text-gray-700 text-lg font-medium">
              Please select the profile
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSelect("user")}
                className="bg-blue-500/70 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700/70 transition duration-200"
              >
                User
              </button>
              <button
                onClick={() => handleSelect("admin")}
                className="bg-blue-500/70 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700/70 transition duration-200"
              >
                Admin
              </button>
            </div>
          </div>
        )}

        {/* Selected Role */}
        {role && (
          <div className="flex justify-center items-center space-x-4 mt-4">
            <span className="text-gray-700 text-base">
              Current profile: <span className="font-semibold">{role}</span>
            </span>
            <button
              onClick={onClearRole}
              className="bg-red-50 text-red-700/90 hover:bg-red-100 hover:text-red-800 font-semibold py-2 px-6 rounded-lg shadow transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoleSelectPage;
