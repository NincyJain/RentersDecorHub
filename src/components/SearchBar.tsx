import React, { useState, useEffect, useRef } from "react";
import { Product } from "../types/product";
import { Search, X, ExternalLink } from "lucide-react";

interface SearchBarProps {
  products: Product[];
  placeholder?: string;
}

export default function SearchBar({
  products,
  placeholder = "Search home decor products...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter products as user types
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
    setResults(filtered.slice(0, 5)); // Limit to 5 suggestions
  }, [query, products]);

  // Click outside listener to close suggestions dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-lg z-30">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-full border border-neutral-200 bg-white px-5 py-3 pl-12 text-sm text-neutral-800 placeholder-neutral-400 shadow-sm transition-all focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
        />
        <Search className="absolute left-4 h-5 w-5 text-neutral-400" />

        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-4 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && query.trim() !== "" && (
        <div className="absolute top-full mt-2 w-full rounded-2xl border border-neutral-100 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-1 duration-200">
          {results.length > 0 ? (
            <div className="flex flex-col gap-1">
              <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block border-b border-neutral-50 mb-1">
                Suggested Products
              </span>
              {results.map((product) => (
                <a
                  key={product.id}
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center gap-3.5 rounded-xl p-2 hover:bg-neutral-50 transition-colors group"
                >
                  {/* Thumbnail */}
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-50 border border-neutral-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-neutral-900 truncate group-hover:text-neutral-700">
                      {product.title}
                    </h4>
                    <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wide">
                      In {product.category}
                    </span>
                  </div>

                  {/* View indicator */}
                  <span className="text-[10px] font-medium text-neutral-400 bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white px-2 py-1 rounded-full transition-all duration-300 flex items-center gap-1">
                    View <ExternalLink className="h-2.5 w-2.5" />
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-neutral-400">
              No products found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
