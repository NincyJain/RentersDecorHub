export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  affiliateLink: string;
  badge?: string;
  category: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  coverImage: string;
}
