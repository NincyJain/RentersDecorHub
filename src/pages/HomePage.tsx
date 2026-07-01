import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { getCategories, getProducts } from "../services/productService";
import { Product, Category } from "../types/product";

import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import CollectionSection from "../components/CollectionSection";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([getCategories(), getProducts()]);
        setCategories(cats);
        setAllProducts(prods);

        // Filter out a few interesting items to show in the "Trending" home section
        const featured = prods
          .filter(
            (p) =>
              p.badge === "Trending" ||
              p.badge === "Best Seller" ||
              p.badge === "Editor's Pick"
          )
          .slice(0, 4);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Failed to load home page products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const siteUrl = "https://rentersdecorhub.com";
  const title = "rentersdecorhub | Curated Rental-Friendly Home Decor Ideas";
  const description =
    "Elevate your rental space without risking your deposit. Discover damage-free, budget-friendly home decor boards and product recommendations.";

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}/images/bedroom/cover.png`} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}/images/bedroom/cover.png`} />
      </Helmet>

      {/* Hero Section */}
      <Hero products={allProducts} />

      {/* Featured Categories (Pinterest Boards) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
            Browse Our Boards
          </h2>
          <p className="max-w-2xl text-sm md:text-base text-neutral-500 leading-relaxed">
            Explore handpicked solutions tailored for every corner of your rental. Click on a category board below to view products.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-neutral-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        )}
      </section>

      {/* Trending Collections Section */}
      {!loading && featuredProducts.length > 0 && (
        <section className="bg-neutral-50/50 border-t border-b border-neutral-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CollectionSection
              title="Latest Trending Picks"
              subtitle="The absolute favorites from our community. Fast-moving, top-rated products that deliver maximum style with zero damage."
              products={featuredProducts}
              cols={4}
            />
          </div>
        </section>
      )}
    </div>
  );
}
