import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { faqJsonLd } from "@/components/Faq";
import { getFaqs, getPage } from "@/data/content";
import { images, site } from "@/data/site";
import { openQuoteModal } from "@/lib/quote-modal";
import iconPhone from "@/assets/images/icon-phone.svg";

const page = getPage("hakkimizda__sikca-sorulan-sorular");
const faqs = getFaqs("hakkimizda__sikca-sorulan-sorular");
const title = page.title || "S.S.S | Munzur Temizlik";
const description =
  page.description ||
  "Munzur Temizlik hizmetleri hakkında en çok merak edilen soruların yanıtları.";

export const Route = createFileRoute("/hakkimizda/sikca-sorulan-sorular")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
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
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="px-3 pt-3 md:px-5">
          <div className="rounded-[2rem] bg-linear-to-b from-[#F4F8EF] to-white px-5 pb-10 pt-14 text-center md:rounded-[2.5rem] md:px-14 md:pb-16 md:pt-40">
            <p className="eyebrow inline-flex items-start gap-1 text-[0.7rem] uppercase tracking-[0.16em]">
              S.S.S
              <img src={images.leaf2} alt="" aria-hidden="true" className="mt-[-4px] h-3 w-auto" />
            </p>
            <h1 className="mt-2 text-[2rem] leading-tight md:text-[3.6rem]">
              Sıkça Sorulan Sorular
            </h1>

            <div className="relative mx-auto mt-6 h-24 w-40 md:mt-8 md:h-36 md:w-56">
              <img
                src={images.leaf1}
                alt=""
                aria-hidden="true"
                className="absolute left-2 top-0 w-16 -rotate-12 md:w-24"
              />
              <img
                src={images.leaf3}
                alt=""
                aria-hidden="true"
                className="absolute right-6 top-1 w-9 md:right-10 md:w-12"
              />
              <img
                src={images.leaf2}
                alt=""
                aria-hidden="true"
                className="absolute bottom-1 left-1/2 w-14 -translate-x-1/2 md:w-20"
              />
            </div>

            {/* İçerik: sol metin + sağ akordiyon */}
            <div className="mx-auto mt-6 grid max-w-[1320px] gap-8 text-left md:mt-14 lg:grid-cols-2 lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="text-center text-[1.85rem] leading-tight md:text-left md:text-[2.6rem]">
                  Sizinle İş Birliği Yapmak İçin Sabırsızlanıyoruz
                </h2>
                <p className="mt-4 max-w-lg text-center leading-relaxed text-foreground/70 md:mt-6 md:text-left">
                  Evlerinizi sağlıklı ve hijyenik tutmak için sizinle iş birliği yapmaktan mutluluk
                  duyarız. Sıkça Sorulan Sorular (SSS) bölümümüzde yer almayan bir konu hakkında
                  sorunuz varsa, bizimle iletişime geçmekten çekinmeyin.
                </p>

                <div className="mt-8 rounded-[1.6rem] bg-linear-to-r from-[#F2D701] to-[#E8F5D3] px-6 py-7 md:mt-20 md:max-w-[26rem] md:rounded-[2rem] md:px-8 md:py-9">
                  <p className="font-display text-[1.15rem] font-medium md:text-[1.35rem]">
                    Hâlâ Sorularınız mı Var?
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-5 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 font-display text-[0.95rem] font-medium"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F2D701]">
                      <img src={iconPhone} alt="" aria-hidden="true" className="h-4 w-4" />
                    </span>
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                {faqs.map((item, i) => {
                  const isOpen = open.includes(i);
                  return (
                    <div key={item.q} className="rounded-[1.4rem] bg-[#F1F7E8] md:rounded-[1.8rem]">
                      <button
                        type="button"
                        onClick={() => toggle(i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-8 md:py-7"
                      >
                        <span className="font-display text-[1rem] font-normal leading-snug md:text-[1.15rem]">
                          {item.q}
                        </span>
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-6 md:px-8 md:pb-8">
                          <div className="mb-4 h-px w-full bg-foreground/10" />
                          <p className="leading-relaxed text-foreground/70">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Alt CTA bandı */}
        <section className="px-3 pb-4 pt-10 md:px-5 md:pb-6 md:pt-20">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#E4F0CE] px-6 py-12 md:rounded-[2.5rem] md:px-14 md:py-24">
            <img
              src={images.leaf1}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 top-4 w-14 -rotate-12 md:left-[26%] md:right-auto md:top-2 md:w-24"
            />
            <img
              src={images.leaf2}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 top-16 w-11 md:left-[30%] md:right-auto md:top-20 md:w-20"
            />
            <h2 className="max-w-md text-[1.85rem] leading-tight md:text-[2.6rem]">
              Her Temizlikte Sizi Etkilemeyi Hedefliyoruz
            </h2>
            <button type="button" onClick={openQuoteModal} className="btn-yellow mt-7">
              Ücretsiz Teklif Alın
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
