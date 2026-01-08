import { useNavigate } from "react-router-dom";
import type { Role } from "../app/App";

export default function RoleSelectPage({
  onSelectRole,
}: {
  onSelectRole: (role: Role) => void;
}) {
  const navigate = useNavigate();

  const handleSelect = (r: "user" | "admin") => {
    onSelectRole(r);
    navigate(r === "user" ? "/user/jobs" : "/admin/jobs");
  };

  return (
    <>
      <div className="text-center bg-white  z-[20] flex-col mx-auto shadow-sm w-full items-center justify-center py-6">
        <h1 className="text-5xl font-extrabold text-blue-600 tracking-wide">
          Job Board
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          One platform. Many opportunities.
        </p>
      </div>

      <div className="bg-gray-50 min-h-screen flex justify-center p-4">
        <div className="w-full ">
          {/* Role Selection */}
          <div className="flex flex-col items-center space-y-4 p-4">
            <p className="text-gray-600 text-md ">Please select the profile</p>
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
        </div>
      </div>
    </>
  );
}
