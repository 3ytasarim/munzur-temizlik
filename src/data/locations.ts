import districts from "@/data/districts.json";

export type District = { slug: string; name: string; neighborhoods: string[] };
export type Province = { slug: string; name: string; districts: District[] };

const all = districts as Array<{
  slug: string;
  name: string;
  side: string;
  neighborhoods?: string[];
}>;

function build(sides: string[]): District[] {
  return all
    .filter((d) => sides.includes(d.side))
    .map((d) => ({
      slug: d.slug,
      name: d.name,
      neighborhoods: [...(d.neighborhoods ?? [])].sort((a, b) => a.localeCompare(b, "tr")),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

export const provinces: Province[] = [
  { slug: "istanbul", name: "İstanbul", districts: build(["avrupa", "anadolu"]) },
  { slug: "kocaeli", name: "Kocaeli", districts: build(["kocaeli"]) },
];

export function getDistricts(provinceSlug: string): District[] {
  return provinces.find((p) => p.slug === provinceSlug)?.districts ?? [];
}

export function getNeighborhoods(provinceSlug: string, districtSlug: string): string[] {
  return getDistricts(provinceSlug).find((d) => d.slug === districtSlug)?.neighborhoods ?? [];
}
