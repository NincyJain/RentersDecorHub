import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../types/product";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { name, slug, coverImage, description } = category;

  return (
    <Link
      to={`/${slug}`}
      className="group relative flex aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Background Image */}
      <img
        src={coverImage}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/50" />

      {/* Content Positioned at Bottom */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
          Inspiration Board
        </span>
        <h3 className="mt-1 text-xl md:text-2xl font-bold text-white tracking-tight">
          {name}
        </h3>
        <p className="mt-2 text-xs md:text-sm text-neutral-200 line-clamp-2 opacity-90 transition-all duration-300 group-hover:text-white">
          {description}
        </p>

        {/* Call to Action Indicator */}
        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-white uppercase tracking-wider opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          Explore Board
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}
