import { useNavigate } from "react-router-dom";
import type { Role } from "../app/App";

function RoleSelectPage({
  role,
  onSelectRole,
  onClearRole,
}: {
  role: Role;
  onSelectRole: (role: "USER" | "ADMIN") => void;
  onClearRole: () => void;
}) {
  const navigate = useNavigate();

  const handleSelect = (r: "USER" | "ADMIN") => {
    onSelectRole(r);
    navigate(r === "USER" ? "/user/jobs" : "/admin/jobs");
  };

  return (
    <div>
      <h2>Select Role</h2>
      {!role && (
        <>
          <button onClick={() => handleSelect("USER")}>User</button>
          <button onClick={() => handleSelect("ADMIN")}>Admin</button>
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
