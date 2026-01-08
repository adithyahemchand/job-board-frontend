import LogoutButton from "./LogoutButton";

type PageHeaderProps = {
  profile: "user" | "admin";
};

export default function PageHeader({ profile }: PageHeaderProps) {
  return (
    <header className="text-center bg-white  z-[20] flex  shadow-sm w-full items-center justify-between py-6">
      {/* Left spacer */}
      <div className="flex-1"></div>

      {/* Center */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-blue-600 tracking-wide">
          Job Board
        </h1>
        <p className="text-sm text-gray-500 pt-2">
          Profile: {profile.charAt(0).toUpperCase() + profile.slice(1)}
        </p>
        {/* Logout */}
      </div>

      {/* Right */}
      <div className="flex-1 flex justify-end pr-4">
        <LogoutButton />
      </div>
    </header>
  );
}
