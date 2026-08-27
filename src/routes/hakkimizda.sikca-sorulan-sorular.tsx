import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq, faqJsonLd } from "@/components/Faq";
import { CtaBand, PageHero } from "@/components/Sections";
import { getFaqs, getPage } from "@/data/content";

const page = getPage("hakkimizda__sikca-sorulan-sorular");
const faqs = getFaqs("hakkimizda__sikca-sorulan-sorular");
const description =
  page.description ||
  "Munzur Temizlik hizmetleri hakkında en çok merak edilen soruların yanıtları.";

export const Route = createFileRoute("/hakkimizda/sikca-sorulan-sorular")({
  head: () => ({
    meta: [
      { title: page.title },
      { name: "description", content: description },
      { property: "og:title", content: page.title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/hakkimizda/sikca-sorulan-sorular" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/hakkimizda/sikca-sorulan-sorular" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(faqs)) }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="S.S.S"
          title="Sıkça Sorulan Sorular"
          text="Evlerinizi sağlıklı ve hijyenik tutmak için sizinle iş birliği yapmaktan mutluluk duyarız. Aradığınız yanıt burada yoksa bizimle iletişime geçin."
        />
        <section className="container-site max-w-3xl py-16 md:py-20">
          <Faq items={faqs} />
        </section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
