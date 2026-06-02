"use client";

interface AreaCardProps {
  name: string;
  icon: string;
  description: string;
  isLocked: boolean;
  requiredRank?: string;
  onClick?: () => void;
}

export default function AreaCard({
  name,
  icon,
  description,
  isLocked,
  requiredRank,
  onClick,
}: AreaCardProps) {
  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      className={`
        relative w-full rounded-xl border p-5 text-left transition-all duration-300 group
        ${isLocked
          ? "border-gray-700/40 cursor-not-allowed opacity-60"
          : "border-purple-700/60 hover:border-purple-400 hover:scale-[1.02] cursor-pointer"
        }
      `}
      style={{
        background: isLocked
          ? "rgba(15, 10, 30, 0.7)"
          : "linear-gradient(135deg, rgba(45,27,78,0.7) 0%, rgba(26,10,46,0.8) 100%)",
        boxShadow: isLocked ? "none" : "0 4px 20px rgba(107, 33, 168, 0.2)",
      }}
    >
      {isLocked && (
        <div className="absolute inset-0 rounded-xl locked-overlay pointer-events-none" />
      )}

      {!isLocked && (
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: "inset 0 0 30px rgba(107, 33, 168, 0.15)" }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <span className="text-3xl">{icon}</span>
          {isLocked && (
            <span
              className="text-xs text-gray-500 border border-gray-600 rounded px-2 py-0.5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              🔒 Req: {requiredRank}
            </span>
          )}
          {!isLocked && (
            <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Enter →
            </span>
          )}
        </div>

        <h3
          className="text-base font-bold mb-1"
          style={{
            fontFamily: "'Cinzel', serif",
            color: isLocked ? "#6b7280" : "var(--gold-light)",
          }}
        >
          {name}
        </h3>

        <p
          className="text-xs leading-relaxed"
          style={{ color: isLocked ? "#4b5563" : "#a78bfa" }}
        >
          {description}
        </p>
      </div>
    </button>
  );
}
