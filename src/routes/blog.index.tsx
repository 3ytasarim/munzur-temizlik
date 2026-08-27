import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaBand, PageHero } from "@/components/Sections";
import { getPage, posts } from "@/data/content";
import { postImages, site } from "@/data/site";

const page = getPage("blog");
const description =
  page.description ||
  "Temizlik ipuçları, doğa dostu ürünler ve profesyonel temizlik rehberleri Munzur Temizlik blogunda.";

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
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Blog"
          title="Temizlik Rehberleri ve İpuçları"
          text="Evinizi ve iş yerinizi daha hijyenik tutmanız için uzman ekibimizden pratik bilgiler."
        />

        <section className="container-site py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to="/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-4xl border border-border transition-shadow hover:shadow-xl"
              >
                {postImages[p.slug] && (
                  <img
                    src={postImages[p.slug]}
                    alt={p.title}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="p-7">
                  <span className="eyebrow">{p.category}</span>
                  <h2 className="mt-2 text-lg leading-snug">{p.title}</h2>
                  <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed">
                    {p.blocks.find((b) => b.t === "p")?.v}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
