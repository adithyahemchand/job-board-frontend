import { useEffect, useState } from "react";
import AppRouter from "./Router";

export type Role = "user" | "admin" | null;

function App() {
  const [role, setRole] = useState<Role>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // read role from cookie on first load
  useEffect(() => {
    const match = document.cookie.match(/role=(user|admin)/);
    if (match) {
      setRole(match[1] as Role);
    }
    setIsAuthReady(true);
  }, []);

  const selectRole = (selectedRole: "user" | "admin") => {
    document.cookie = `role=${selectedRole}; path=/; sameSite=None; secure`;
    setRole(selectedRole);
  };

  const clearRole = () => {
    document.cookie = "role=; Max-Age=0; path=/";
    setRole(null);
  };

  if (!isAuthReady) {
    return null;
  }

  return (
    <AppRouter role={role} onSelectRole={selectRole} onClearRole={clearRole} />
  );
}

export default App;
