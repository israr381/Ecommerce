type HeaderProps = {
  isLoggedIn: boolean;
  username: string;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onLogout: () => void;
};

export function Header({
  isLoggedIn,
  username,
  onOpenLogin,
  onOpenSignup,
  onLogout,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold text-gray-900">E-commerce</h1>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-700">Hi, {username}</p>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenLogin}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onOpenSignup}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
