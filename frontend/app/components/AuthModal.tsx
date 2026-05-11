import { useState, type FormEvent } from "react";

import { login, register } from "../api/auth/auth.api";

type AuthModalProps = {
  mode: "login" | "signup";
  onClose: () => void;
  onAuthSuccess: (username: string) => void;
};

export function AuthModal({ mode, onClose, onAuthSuccess }: AuthModalProps) {
  const isLogin = mode === "login";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const result = isLogin
        ? await login({ email, password })
        : await register({ username, email, password });

      onAuthSuccess(result.username);
      onClose();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <label className="block text-sm font-medium text-gray-800">
              Username
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
              />
            </label>
          )}

          <label className="block text-sm font-medium text-gray-800">
            Email
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
          </label>

          <label className="block text-sm font-medium text-gray-800">
            Password
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
          </label>

          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
