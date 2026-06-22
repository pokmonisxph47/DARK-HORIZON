"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthContext } from "@/contexts/authcontext";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  // If already logged in, skip to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: "var(--purple-bright)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "var(--blue-mystic)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5"
          style={{ background: "var(--crimson)" }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-3xl">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-yellow-600" />
          <span className="text-yellow-600 text-sm tracking-widest">⚔ ✦ ⚔</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-yellow-600" />
        </div>

        {/* Title */}
        <h1
          className="text-glow text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight"
          style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)" }}
        >
          Dark Horizons
        </h1>

        <p
          className="text-lg md:text-2xl mb-2 tracking-widest uppercase"
          style={{ fontFamily: "'Cinzel', serif", color: "#a78bfa" }}
        >
          Legends of Lost Kingdoms
        </p>
        <p
          className="text-base md:text-lg mb-10"
          style={{ fontFamily: "'Cinzel', serif", color: "#7c3aed" }}
        >
          & the Mystic Seas
        </p>

        {/* Subtitle */}
        <p
          className="text-purple-300 text-lg md:text-xl mb-12 leading-relaxed max-w-xl mx-auto italic"
          style={{ fontFamily: "'Crimson Text', serif" }}
        >
          &ldquo;Beyond the veil of mortal sight lie kingdoms swallowed by time,
          and seas that whisper the names of forgotten gods.&rdquo;
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="btn-gold px-10 py-4 rounded-lg text-lg shadow-xl"
          >
            Begin Your Journey
          </Link>
          <Link
            href="/login"
            className="px-10 py-4 rounded-lg text-lg border border-purple-600 text-purple-300 hover:bg-purple-900/30 transition-all duration-200"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Continue Journey
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-purple-600 text-sm mt-12">
          Free to play • Browser-based • No downloads required
        </p>
      </div>
    </main>
  );
}
