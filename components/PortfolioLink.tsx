import React from "react";
import { Globe } from "lucide-react";

export const PORTFOLIO_URL = "/portfolio";
export const PRIMARY_PORTFOLIO_URL = "https://shishir.click";
export const FALLBACK_PORTFOLIO_URL = "https://shishir1290.netlify.app";

interface PortfolioLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

export default function PortfolioLink({
  children,
  className = "",
  showIcon = false,
  ...props
}: PortfolioLinkProps) {
  return (
    <a
      href={PORTFOLIO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title="Visit Md. Sadmanur Islam Shishir's Portfolio (Primary: shishir.click | Backup: shishir1290.netlify.app)"
      {...props}
    >
      {showIcon && <Globe size={14} className="text-[var(--accent-cyan)]" />}
      {children || "Portfolio"}
    </a>
  );
}
