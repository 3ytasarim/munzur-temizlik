import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPage, posts } from "@/data/content";
import { postImages, site } from "@/data/site";

const page = getPage("blog");
const description =
  page.description ||
  "Temizlik ipuçları, doğa dostu ürünler ve profesyonel temizlik rehberleri Munzur Temizlik blogunda.";

/** Orijinal sitedeki sıralama */
const order = [
  "derinlemesine-temizlik-ve-duzenleme-evinize-yeni-bir-nefes",
  "doga-dostu-temizlik-urunleri-ile-temizlige-yeni-bir-bakis-sagliginizi-ve-gelecegimizi-koruyan-cevreci-secimler",
  "tasinmadan-once-ev-temizligi-hizmetleri-yeni-evinize-tertemiz-bir-baslangic-yapin",
  "eksizsiz-daire-temizligi-rehberi-piril-piril-bir-yasam-alani-icin-adim-adim-kilavuz",
  "kotu-kokan-koltuk-nasil-temizlenir-etkili-ve-kalici-cozumler",
  "bir-daireyi-derinlemesine-temizlemek-ne-kadar-surer",
  "doga-dostu-hali-temizligi-en-kapsamli-rehber",
  "temiz-ve-saglikli-bir-evin-faydalari-nelerdir",
];

const sorted = [...posts].sort((a, b) => {
  const ia = order.indexOf(a.slug);
  const ib = order.indexOf(b.slug);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
});

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: page.title || `Blog - ${site.titleSuffix}` },
      { name: "description", content: description },
      { property: "og:title", content: page.title || `Blog - ${site.titleSuffix}` },
      { property: "og:description", content: description },
      { property: "og:url", content: "/blog" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="container-site pt-3">
          <div className="rounded-[2rem] bg-gradient-to-b from-[#F1F7E8] to-white px-5 py-16 text-center md:rounded-[2.5rem] md:px-12 md:py-28">
            <p className="eyebrow relative inline-flex items-start gap-1">
              Blog
              <span className="mt-0.5 text-primary" aria-hidden="true">
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                  <path
                    d="M2 10 L5 2 M8 10 L11 2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </p>
            <h1 className="mx-auto mt-4 max-w-4xl text-[1.9rem] leading-tight md:text-5xl md:leading-[1.15]">
              Profesyonellerden Temizlik Tüyoları: Evinizi Parlatacak İpuçları
            </h1>
          </div>
        </section>

        {/* Öne çıkan yazı */}
        {featured && (
          <section className="container-site pt-10 md:pt-16">
            <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col justify-center rounded-[2rem] bg-[#F4F8EF] p-8 md:p-12">
                <span className="eyebrow">{featured.category}</span>
                <h2 className="mt-3 text-2xl leading-snug md:text-[2.1rem] md:leading-[1.25]">
                  <Link to="/$slug" params={{ slug: featured.slug }} className="hover:text-primary">
                    {featured.title}
                  </Link>
                </h2>
                <div className="mt-8">
                  <Link
                    to="/$slug"
                    params={{ slug: featured.slug }}
                    className="inline-flex items-center gap-4 rounded-full bg-white py-2 pl-6 pr-2 font-medium text-foreground shadow-sm transition-colors hover:text-primary"
                  >
                    Devamını Oku
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-pale text-primary">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>

              {postImages[featured.slug] && (
                <Link
                  to="/$slug"
                  params={{ slug: featured.slug }}
                  className="overflow-hidden rounded-[2rem]"
                >
                  <img
                    src={postImages[featured.slug]}
                    alt={featured.title}
                    className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-full md:min-h-[420px]"
                  />
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Diğer yazılar */}
        <section className="container-site py-14 md:py-24">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <article key={p.slug}>
                {postImages[p.slug] && (
                  <Link
                    to="/$slug"
                    params={{ slug: p.slug }}
                    className="block overflow-hidden rounded-[1.5rem]"
                  >
                    <img
                      src={postImages[p.slug]}
                      alt={p.title}
                      loading="lazy"
                      className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>
                )}
                <span className="eyebrow mt-5 block">{p.category}</span>
                <h2 className="mt-2 text-xl leading-snug md:text-[1.4rem]">
                  <Link to="/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                    {p.title}
                  </Link>
                </h2>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
