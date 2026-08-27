import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Blocks } from "@/components/Blocks";
import { CtaBand, PageHero } from "@/components/Sections";
import { getPage } from "@/data/content";
import { images } from "@/data/site";

const page = getPage("hakkimizda__temizlik-sureci");
const description =
  page.description ||
  "Munzur Temizlik'in banyo, mutfak, yatak odası ve yaşam alanlarını kapsayan detaylı temizlik süreci adım adım.";

export const Route = createFileRoute("/hakkimizda/temizlik-sureci")({
  head: () => ({
    meta: [
      { title: page.title },
      { name: "description", content: description },
      { property: "og:title", content: page.title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/hakkimizda/temizlik-sureci" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/hakkimizda/temizlik-sureci" }],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  const blocks = page.blocks.filter((b) => b.t !== "h1" && b.v !== "Inactive");

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Süreç"
          title="Temizlik Sürecimiz"
          text="Her alan için ayrı ayrı planlanmış, kontrol listeleriyle yürütülen profesyonel temizlik akışı."
          image={images.womanIndoors}
        />
        <section className="container-site max-w-4xl py-16 md:py-20">
          <Blocks blocks={blocks} />
        </section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
