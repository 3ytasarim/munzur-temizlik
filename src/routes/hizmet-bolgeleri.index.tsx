import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaBand, PageHero } from "@/components/Sections";
import { districts, getPage } from "@/data/content";
import { images } from "@/data/site";

const page = getPage("hizmet-bolgeleri");
const description =
  page.description ||
  "Munzur Temizlik olarak İstanbul Avrupa ve Anadolu Yakası ile Kocaeli'nde 40'tan fazla ilçede profesyonel temizlik hizmeti veriyoruz.";

const groups = [
  { key: "avrupa", label: "Avrupa Yakası" },
  { key: "anadolu", label: "Anadolu Yakası" },
  { key: "kocaeli", label: "Kocaeli" },
];

export const Route = createFileRoute("/hizmet-bolgeleri/")({
  head: () => ({
    meta: [
      { title: page.title || `Hizmet Bölgeleri - İstanbul Temizlik | Munzur Temizlik` },
      { name: "description", content: description },
      { property: "og:title", content: page.title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/hizmet-bolgeleri" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/hizmet-bolgeleri" }],
  }),
  component: AreasPage,
});

function AreasPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Hizmet Bölgeleri"
          title="İstanbul Genelinde Temizlik Hizmeti"
          text="Avrupa Yakası, Anadolu Yakası ve Kocaeli'nde hizmet verdiğimiz ilçeleri inceleyin."
          image={images.lilianaDrew}
        />

        <section className="container-site space-y-14 py-16 md:py-24">
          {groups.map((g) => {
            const list = districts.filter((d) => d.side === g.key);
            if (!list.length) return null;
            return (
              <div key={g.key}>
                <h2 className="mb-6 text-2xl md:text-3xl">{g.label}</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {list.map((d) => (
                    <Link
                      key={d.slug}
                      to="/hizmet-bolgeleri/$slug"
                      params={{ slug: d.slug }}
                      className="flex items-center gap-2 rounded-2xl border border-border px-5 py-4 font-display transition-colors hover:border-primary hover:text-primary"
                    >
                      <MapPin className="h-4 w-4 text-primary" />
                      {d.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
