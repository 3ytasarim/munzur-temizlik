import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Blocks, type Block } from "@/components/Blocks";
import { CtaBand, PageHero, Testimonials } from "@/components/Sections";
import { images, site, stats } from "@/data/site";
import { getPage } from "@/data/content";
import pagesUnused from "@/data/pages.json";
void pagesUnused;

const page = getPage("hakkimizda");


export const Route = createFileRoute("/hakkimizda/")({
  head: () => ({
    meta: [
      { title: page.title },
      {
        name: "description",
        content:
          page.description ||
          "Munzur Temizlik; İstanbul genelinde ev, ofis ve iş yerleri için profesyonel temizlik hizmeti sunan deneyimli bir temizlik şirketidir.",
      },
      { property: "og:title", content: page.title },
      {
        property: "og:description",
        content: page.description || "Munzur Temizlik hakkında bilgi edinin.",
      },
      { property: "og:url", content: "/hakkimizda" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/hakkimizda" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const blocks = page.blocks.filter((b) => b.t !== "h1" && b.v !== "Inactive");

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Hakkımızda"
          title="Munzur Temizlik Hakkında"
          text="Hijyen, güven ve müşteri memnuniyetini merkeze alan profesyonel temizlik ekibiniz."
          image={images.aboutBanner}
        />

        <section className="bg-pale py-14">
          <div className="container-site grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-medium text-foreground md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-site grid items-start gap-12 py-16 md:py-24 lg:grid-cols-2">
          <div className="overflow-hidden rounded-4xl">
            <img
              src={images.aboutTeam}
              alt={`${site.name} temizlik ekibi`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <Blocks blocks={blocks} />
          </div>
        </section>

        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
