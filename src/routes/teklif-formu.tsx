import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/Sections";
import { quoteServices, site } from "@/data/site";

export const Route = createFileRoute("/teklif-formu")({
  head: () => ({
    meta: [
      { title: `Teklif Formu - ${site.titleSuffix}` },
      {
        name: "description",
        content:
          "Munzur Temizlik teklif formunu doldurun, ev veya ofis temizliğiniz için ücretsiz ve hızlı fiyat teklifi alın.",
      },
      { property: "og:title", content: `Teklif Formu - ${site.titleSuffix}` },
      {
        property: "og:description",
        content: "Ücretsiz temizlik teklifi almak için formu doldurun.",
      },
      { property: "og:url", content: "/teklif-formu" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/teklif-formu" }],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Ücretsiz Teklif"
          title="Teklif Formu"
          text="Aşağıdaki formu doldurun; ekibimiz en kısa sürede size özel fiyat teklifi ile dönüş yapsın."
        />

        <section className="container-site py-16 md:py-24">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-4xl bg-pale">
            <QuoteWizard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
