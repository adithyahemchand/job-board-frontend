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
    <div>
      <h2>Select Role</h2>
      {!role && (
        <>
          <button onClick={() => handleSelect("user")}>User</button>
          <button onClick={() => handleSelect("admin")}>Admin</button>
        </>
      )}

      {role && (
        <>
          <p>Current role: {role}</p>
          <button onClick={onClearRole}>Logout</button>
        </>
      )}
    </div>
  );
}

export default RoleSelectPage;
