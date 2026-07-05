import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  getCategoryBySlug,
  getProductsByCategory,
} from "../services/productService";
import { Product, Category } from "../types/product";

import CollectionSection from "../components/CollectionSection";
import EmptyState from "../components/EmptyState";

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryData() {
      if (!categorySlug) return;
      setLoading(true);
      try {
        const [catData, prodData] = await Promise.all([
          getCategoryBySlug(categorySlug),
          getProductsByCategory(categorySlug),
        ]);
        setCategory(catData);
        setProducts(prodData);
      } catch (error) {
        console.error("Failed to load category room products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCategoryData();
  }, [categorySlug]);

  // Handle Loading Skeleton State
  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="relative h-[250px] md:h-[350px] w-full bg-neutral-200 animate-pulse" />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-4 w-32 bg-neutral-200 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-64 bg-neutral-200 rounded mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-4 p-5 md:p-6 rounded-2xl border border-neutral-100 shadow-sm">
                <div className="h-4 w-1/4 bg-neutral-100 rounded animate-pulse mb-2" />
                <div className="h-6 w-3/4 bg-neutral-100 rounded animate-pulse" />
                <div className="h-3 w-full bg-neutral-100 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-neutral-100 rounded animate-pulse" />
                <div className="h-10 w-full bg-neutral-100 rounded-lg animate-pulse mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Handle Category Not Found
  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Board Not Found"
          message={`We couldn't find a room board corresponding to "${categorySlug}". Please browse another section.`}
        />
      </div>
    );
  }

  // Group products by group name
  const groupNames: string[] = [];
  const groupedProducts: Record<string, Product[]> = {};

  products.forEach((p) => {
    const g = p.group || "";
    if (!groupedProducts[g]) {
      groupedProducts[g] = [];
      groupNames.push(g);
    }
    groupedProducts[g].push(p);
  });

  const siteUrl = "https://rentersdecorhub.com";
  const title = `${category.name} Decor Ideas & Affiliate Picks | rentersdecorhub`;
  const description =
    category.description ||
    `Curated list of rental-friendly, damage-free, and budget-friendly home decor items for your ${category.name.toLowerCase()}.`;
  const canonicalUrl = `${siteUrl}/${category.slug}`;

  return (
    <div className="bg-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}${category.coverImage}`} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${category.coverImage}`} />
      </Helmet>

      {/* Category Hero Header */}
      <div className="relative h-[250px] md:h-[350px] w-full overflow-hidden bg-neutral-900">
        <img
          src={category.coverImage}
          alt={category.name}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-black/40 via-black/20 to-black/60">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Curated Inspiration
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white sm:text-6xl">
            {category.name}
          </h1>
        </div>
      </div>

      {/* Category Description Intro */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <p className="text-base md:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Products Display */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8 flex flex-col gap-6">
        {products.length > 0 ? (
          groupNames.map((groupName) => (
            <CollectionSection
              key={groupName || "all"}
              title={groupName || `Top Picks for Your ${category.name}`}
              subtitle=""
              products={groupedProducts[groupName]}
              cols={4}
            />
          ))
        ) : (
          <EmptyState
            title="Board Under Construction"
            message={`We are currently curating and validating damage-free, budget-friendly items for the ${category.name} board. Check back soon!`}
            actionHref="/"
            actionText="Browse Home"
          />
        )}
      </div>
    </div>
  );
}
