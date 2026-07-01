import React from "react";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface CollectionSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  cols?: 3 | 4;
}

export default function CollectionSection({
  title,
  subtitle,
  products,
  cols = 4,
}: CollectionSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 border-t border-neutral-100 first:border-t-0">
      {/* Title block */}
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-2xl text-sm md:text-base text-neutral-500 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Grid */}
      <div
        className={`grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 ${
          cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"
        } xl:gap-x-8`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
