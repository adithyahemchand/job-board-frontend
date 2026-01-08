import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  // Clear role from cookies
  function deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; Max-Age=0; sameSite=None; secure`;
  }

  const handleLogout = () => {
    if (!confirm("Please confirm if you would like to log out.")) return;
    deleteCookie("role");
    navigate("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-red-700/60 hover:bg-red-600/70 text-white/90 hover:text-white
 font-semibold py-2 px-6 rounded-lg shadow transition duration-200"
    >
      Logout
    </button>
  );
}
