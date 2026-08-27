import districtsJson from "./districts.json";
import servicesJson from "./services.json";
import postsJson from "./posts.json";
import pagesJson from "./pages.json";
import faqsJson from "./faqs.json";
import type { Block } from "@/components/Blocks";

export type District = {
  slug: string;
  name: string;
  side: string;
  title: string;
  description: string;
  h2: string;
  intro: string;
  neighborhoodsTitle: string;
  neighborhoods: string[];
  h2b: string;
  outro: string;
  blocks?: Block[];
};

export type Service = {
  slug: string;
  name: string;
  title: string;
  description: string;
  subtitle?: string;
  blocks: Block[];
};

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: string;
  blocks: Block[];
};

export type StaticPage = { title: string; description: string; blocks: Block[] };
export type Faq = { q: string; a: string };

export const districts = districtsJson as District[];
export const services = servicesJson as Service[];
export const posts = postsJson as Post[];

const pagesMap = pagesJson as Record<string, StaticPage>;
const faqsMap = faqsJson as Record<string, Faq[]>;

const emptyPage: StaticPage = { title: "", description: "", blocks: [] };

export function getPage(key: string): StaticPage {
  return pagesMap[key] ?? emptyPage;
}

export function getFaqs(key: string): Faq[] {
  return faqsMap[key] ?? [];
}

export function getDistrict(slug: string): District | undefined {
  return districts.find((d) => d.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
