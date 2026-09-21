import { Sparkles } from "lucide-react";

export function HeroBadge() {
  return (
    <div className="hero-badge mb-6 flex justify-center">
      <div className="badge badge-cyan pulse-glow">
        <Sparkles size={14} />
        <span>Zero Third-Party Dependencies • Pure Go Standard Library</span>
      </div>
    </div>
  );
}
