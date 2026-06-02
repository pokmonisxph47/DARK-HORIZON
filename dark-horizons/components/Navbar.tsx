"use client";

import { logoutUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface NavbarProps {
  username?: string;
}

export default function Navbar({ username }: NavbarProps) {
  const router = useRouter();

  async function handleLogout() {
    await logoutUser();
    router.push("/login");
  }

  return (
    <nav className="w-full border-b border-purple-800/50 backdrop-blur-md sticky top-0 z-50"
      style={{ background: "rgba(10, 15, 46, 0.85)" }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1
            className="text-glow text-xl md:text-2xl font-bold tracking-widest uppercase"
            style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)" }}
          >
            ⚔ Dark Horizons
          </h1>
          <p className="text-purple-400 text-xs tracking-widest hidden md:block">
            Legends of Lost Kingdoms
          </p>
        </div>

        <div className="flex items-center gap-4">
          {username && (
            <span className="text-purple-300 text-sm font-semibold hidden sm:block">
              🧙 {username}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded border border-red-700 text-red-400 text-sm hover:bg-red-900/30 hover:text-red-300 transition-all duration-200"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
