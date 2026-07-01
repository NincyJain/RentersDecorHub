import React from "react";

interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  const getStyles = () => {
    switch (children?.toString().toLowerCase()) {
      case "best seller":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "budget pick":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "trending":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "editor's pick":
        return "bg-indigo-50 text-indigo-800 border-indigo-200";
      default:
        return "bg-neutral-50 text-neutral-700 border-neutral-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStyles()}`}
    >
      {children}
    </span>
  );
}
