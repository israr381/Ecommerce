import type { Route } from "./+types/home";
import { useOutletContext } from "react-router";

type AuthContext = {
  isLoggedIn: boolean;
  username: string;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "E-commerce Home" },
    { name: "description", content: "Welcome to the E-commerce app" },
  ];
}

export default function Home() {
  const { isLoggedIn, username } = useOutletContext<AuthContext>();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {isLoggedIn ? (
        <section className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-2xl font-bold text-green-800">Welcome back, {username}!</h2>
          <p className="mt-2 text-green-700">
            You are logged in successfully. Start exploring products.
          </p>
        </section>
      ) : (
        <section className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-blue-800">Welcome to our store</h2>
          <p className="mt-2 text-blue-700">
            Please login or sign up from the header to continue.
          </p>
        </section>
      )}
    </main>
  );
}
