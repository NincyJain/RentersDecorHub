import React from "react";
import SearchBar from "./SearchBar";
import { Product } from "../types/product";

interface HeroProps {
  products: Product[];
}

export default function Hero({ products }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-neutral-50 border-b border-neutral-100 py-20 lg:py-32">
      {/* Subtle Grid Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Tag */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-200 mb-6 animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
            Renter-Friendly & Damage-Free Decor
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 font-sans max-w-3xl leading-[1.1]">
            Style Your Rental Apartment Without Losing Your{" "}
            <span className="text-amber-600 underline decoration-amber-200 underline-offset-4">
              Deposit
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-500 leading-relaxed">
            Discover damage-free home decor, space-conscious modular furnishings, and smart accessories curated specifically for renters. Handpicked Amazon affiliate picks.
          </p>

          {/* Embed search bar */}
          <div className="mt-10 w-full max-w-md">
            <SearchBar products={products} />
            <p className="mt-2.5 text-xs text-neutral-400">
              Popular: <span className="italic">&ldquo;shelf&rdquo;, &ldquo;lamp&rdquo;, &ldquo;bamboo&rdquo;</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
