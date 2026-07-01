import React from "react";
import { Product } from "../types/product";
import Badge from "./Badge";
import Button from "./Button";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { title, description, image, affiliateLink, badge } = product;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-neutral-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-50">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute left-4 top-4 z-10">
            <Badge>{badge}</Badge>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Action Button */}
        <div className="mt-5 pt-4 border-t border-neutral-100">
          <Button
            href={affiliateLink}
            variant="primary"
            external={true}
            className="w-full text-center py-2 flex items-center justify-center gap-2"
          >
            View Product
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
