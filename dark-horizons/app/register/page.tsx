"use client";

import { useState } from "react";
import { registerUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await registerUser(email, password, username);
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed.";
      if (errorMessage.includes("email-already-in-use")) {
        setError("That email is already registered. Try logging in.");
      } else if (errorMessage.includes("invalid-email")) {
        setError("Please enter a valid email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1
            className="text-glow text-3xl font-bold mb-2"
            style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)" }}
          >
            Create Account
          </h1>
          <p className="text-purple-400 text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
            Begin your legend
          </p>
        </div>

        <div
          className="rounded-xl border border-purple-700/50 p-8"
          style={{
            background: "linear-gradient(135deg, rgba(26,10,46,0.95) 0%, rgba(45,27,78,0.85) 100%)",
            boxShadow: "0 0 40px rgba(107, 33, 168, 0.2)",
          }}
        >
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-900/40 border border-red-700/60 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-purple-300 text-sm mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your hero name"
              className="w-full px-4 py-3 rounded-lg bg-purple-950/50 border border-purple-700/50 text-white placeholder-purple-600 focus:outline-none focus:border-purple-400 transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block text-purple-300 text-sm mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-purple-950/50 border border-purple-700/50 text-white placeholder-purple-600 focus:outline-none focus:border-purple-400 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-purple-300 text-sm mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              className="w-full px-4 py-3 rounded-lg bg-purple-950/50 border border-purple-700/50 text-white placeholder-purple-600 focus:outline-none focus:border-purple-400 transition-colors"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full btn-gold py-3 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-center text-purple-400 text-sm mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-300 hover:text-white underline transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
