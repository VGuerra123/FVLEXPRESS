import productsData from "../data/products.json";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  tags: string[];
}

export const useProducts = () => {
  const all: Product[] = productsData;

  const filterByTag = (tag: string) =>
    all.filter((p) => p.tags.includes(tag));

  const filterByCategory = (cat: string) =>
    all.filter((p) => p.category === cat);

  return { all, filterByTag, filterByCategory };
};
