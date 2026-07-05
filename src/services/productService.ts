import bedroomData from "../data/bedroom.json";
import livingroomData from "../data/livingroom.json";
import studyData from "../data/study.json";
import kitchenData from "../data/kitchen.json";
import bathroomData from "../data/bathroom.json";
import balconyData from "../data/balcony.json";
import monsoonData from "../data/monsoon.json";
import categoriesData from "../data/categories.json";

import { Product, Category } from "../types/product";

// Compile all local JSON products
const allProducts: Product[] = [
  ...bedroomData,
  ...livingroomData,
  ...studyData,
  ...kitchenData,
  ...bathroomData,
  ...balconyData,
  ...monsoonData,
];

const allCategories: Category[] = categoriesData;

// Simulate async responses so the API interface matches a real network request
export async function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    resolve(allProducts);
  });
}

export async function getCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    resolve(allCategories);
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const category = allCategories.find((c) => c.slug === slug) || null;
  return new Promise((resolve) => {
    resolve(category);
  });
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const categoryMap: { [key: string]: string } = {
    "bedroom": "Bedroom",
    "living-room": "Living Room",
    "study-room": "Study Room",
    "kitchen": "Kitchen",
    "bathroom": "Bathroom",
    "balcony": "Balcony",
    "monsoon-essentials": "Monsoon Essentials",
  };

  const categoryName = categoryMap[categorySlug];
  if (!categoryName) return [];

  const filtered = allProducts.filter((p) => p.category === categoryName);
  return new Promise((resolve) => {
    resolve(filtered);
  });
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query || query.trim() === "") {
    return allProducts;
  }
  const lowercaseQuery = query.toLowerCase().trim();
  const filtered = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery)
  );
  return new Promise((resolve) => {
    resolve(filtered);
  });
}
