type PageHeaderProps = {
  profile: "user" | "admin";
};

export default function PageHeader({ profile }: PageHeaderProps) {
  return (
    <header className="text-center bg-white sticky top-0 z-[20] flex-col mx-auto shadow-sm w-full items-center justify-center py-6">
      <h1 className="text-5xl font-extrabold text-blue-600 tracking-wide">
        Job Board
      </h1>

      <p className="text-sm text-gray-500 mt-2">
        Profile: {profile.charAt(0).toUpperCase() + profile.slice(1)}
      </p>
    </header>
  );
}
