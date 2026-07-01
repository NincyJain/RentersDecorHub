import React from "react";
import { Info } from "lucide-react";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionHref?: string;
}

export default function EmptyState({
  title = "No Products Found",
  message = "We couldn't find any products matching your criteria. Try looking into another category or search term.",
  actionText = "Back to Home",
  actionHref = "/",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50">
      <div className="rounded-full bg-neutral-100 p-3 text-neutral-400">
        <Info className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-neutral-500 leading-relaxed">
        {message}
      </p>
      {actionHref && (
        <div className="mt-6">
          <Button href={actionHref} variant="outline">
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}
