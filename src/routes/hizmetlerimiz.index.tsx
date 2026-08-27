import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq, faqJsonLd } from "@/components/Faq";
import { CtaBand, PageHero, Testimonials } from "@/components/Sections";
import { getFaqs, getPage, getService } from "@/data/content";
import { images, serviceMeta } from "@/data/site";

const page = getPage("hizmetlerimiz");
const faqs = getFaqs("hizmetlerimiz");
const description =
  page.description ||
  "Ev temizliği, ofis temizliği, detaylı temizlik, taşınma ve inşaat sonrası temizlik hizmetlerimizi keşfedin.";

export const Route = createFileRoute("/hizmetlerimiz/")({
  head: () => ({
    meta: [
      { title: page.title },
      { name: "description", content: description },
      { property: "og:title", content: page.title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/hizmetlerimiz" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/hizmetlerimiz" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(faqs)) }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Hizmetlerimiz"
          title="İhtiyacınıza Özel Temizlik Hizmetleri"
          text="Ev, ofis ve iş yerleriniz için hijyen odaklı, profesyonel ekipmanlarla yürütülen temizlik çözümleri."
          image={images.serviceSide}
        />

        <section className="container-site py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {serviceMeta.map((s) => {
              const detail = getService(s.slug);
              const intro = detail?.blocks.find((b) => b.t === "p")?.v ?? "";
              return (
                <Link
                  key={s.slug}
                  to="/hizmetlerimiz/$slug"
                  params={{ slug: s.slug }}
                  className="group overflow-hidden rounded-4xl border border-border transition-shadow hover:shadow-xl"
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-7">
                    <h2 className="text-xl">{s.name}</h2>
                    <p className="mt-3 line-clamp-4 text-[0.98rem] leading-relaxed">{intro}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-medium text-primary">
                      Detayları gör <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-soft py-16 md:py-24">
          <div className="container-site max-w-3xl">
            <h2 className="mb-8 text-center text-2xl md:text-4xl">Sıkça Sorulan Sorular</h2>
            <Faq items={faqs} />
          </div>
        </section>

        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
