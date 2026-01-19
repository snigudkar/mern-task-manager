import AvatarMenu from "./AvatarMenu";

export default function Topbar({ user, onLogout }) {
  return (
    <header className="h-16 w-full border-b bg-white flex items-center justify-between px-6 sticky top-0 z-50">
      <h1 className="text-xl font-black text-blue-600">TaskFlow</h1>

      <AvatarMenu user={user} onLogout={onLogout} />
    </header>
  );
}
