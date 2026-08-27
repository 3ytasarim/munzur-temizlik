import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq, faqJsonLd } from "@/components/Faq";
import { CtaBand, Testimonials } from "@/components/Sections";
import { getFaqs, getPage, posts } from "@/data/content";
import { advantages, howItWorks, images, postImages, serviceMeta, site, stats } from "@/data/site";

const page = getPage("home");
const faqs = getFaqs("home");
const title = page.title || `Anasayfa - ${site.titleSuffix}`;
const description =
  page.description ||
  "İstanbul'un tüm ilçelerinde ev, ofis ve iş yeri temizliği. Deneyimli kadro, şeffaf fiyat ve %100 memnuniyet garantisi ile Munzur Temizlik.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(faqs)) },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: site.name,
          telephone: site.phone,
          email: site.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address,
            addressLocality: "İstanbul",
            addressCountry: "TR",
          },
          areaServed: "İstanbul",
        }),
      },
    ],
  }),
  component: Home,
});

const heroBadges = ["Profesyonel", "Samimi", "Hızlı İletişim"];

function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <img
            src={images.heroImg}
            alt="İstanbul'da profesyonel temizlik hizmeti"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />
          <div className="container-site py-24 md:py-36">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl leading-tight text-white md:text-5xl">
                İstanbul’un Her Noktasına Profesyonel Temizlik Hizmeti
              </h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/90">
                Avrupa Yakası’ndan Anadolu Yakası’na kadar tüm ilçelere hizmet sağlıyoruz.
                Deneyimli kadromuz ve zamanında hizmet anlayışımızla İstanbul’un en güvenilir
                temizlik çözümünü sunuyoruz.
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {heroBadges.map((b) => (
                  <li
                    key={b}
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-display text-sm text-white backdrop-blur"
                  >
                    <Check className="h-4 w-4" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/teklif-formu" className="btn-yellow">
                  Ücretsiz Teklif Al
                </Link>
                <a href={site.phoneHref} className="btn-green">
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quote form */}
        <HomeQuoteSection />

        {/* How it works */}
        <section className="container-site py-16 md:py-24">
          <p className="eyebrow mb-3 text-center">Süreç</p>
          <h2 className="text-center text-2xl md:text-4xl">Nasıl Çalışır?</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {howItWorks.map((s, i) => (
              <div key={s.title} className="overflow-hidden rounded-4xl bg-soft">
                <img src={s.image} alt={s.title} loading="lazy" className="h-52 w-full object-cover" />
                <div className="p-7">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-display text-sm font-medium text-secondary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-xl">{s.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="bg-soft py-16 md:py-24">
          <div className="container-site grid items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-4xl">
              <img
                src={images.aboutTeam}
                alt="Munzur Temizlik ekibi"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="eyebrow mb-3">Hakkımızda</p>
              <h2 className="text-2xl md:text-4xl">
                Parlayan Mekanlar İçin En Doğru Tercih: Munzur Temizlik
              </h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed">
                Munzur Temizlik, İstanbul genelinde profesyonel, güvenilir ve ulaşılabilir temizlik
                hizmeti sunma vizyonuyla yola çıkmıştır. Deneyimli ekibimiz ve yüksek müşteri
                memnuniyeti anlayışımızla her mekânı yeniden hayata döndürüyoruz.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Temizlik süreciyle ilgili sizi her adımda bilgilendiriyoruz.",
                  "Evinizi kendi evimiz gibi özenle temizliyoruz.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link to="/hakkimizda" className="btn-outline-dark mt-8">
                Daha Fazla Bilgi
              </Link>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="container-site py-16 md:py-24">
          <h2 className="mx-auto max-w-3xl text-center text-2xl md:text-4xl">
            Uzmanız. Tecrübeliyiz. Size Özel Çözümler Sunuyoruz.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {advantages.map((a) => (
              <div key={a.title} className="rounded-4xl border border-border p-8">
                <h3 className="text-lg">{a.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid gap-8 rounded-4xl bg-pale p-10 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* Services */}
        <section className="bg-soft py-16 md:py-24">
          <div className="container-site">
            <p className="eyebrow mb-3 text-center">Hizmetlerimiz</p>
            <h2 className="mx-auto max-w-3xl text-center text-2xl md:text-4xl">
              İstanbul’da Güvenilir Temizlik Hizmeti Arayanlara Özel Çözümler
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {serviceMeta.slice(0, 4).map((s) => (
                <Link
                  key={s.slug}
                  to="/hizmetlerimiz/$slug"
                  params={{ slug: s.slug }}
                  className="group overflow-hidden rounded-4xl bg-background"
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex items-center justify-between gap-2 p-6">
                    <h3 className="text-base">{s.shortName}</h3>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/hizmetlerimiz" className="btn-green">
                Tüm Hizmetler
              </Link>
            </div>
          </div>
        </section>

        <Testimonials />

        {/* FAQ */}
        <section className="container-site py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">S.S.S</p>
              <h2 className="text-2xl md:text-4xl">Sıkça Sorulan Sorular</h2>
              <p className="mt-4">
                İstanbul&apos;da temizlik hizmeti mi arıyorsunuz? Hemen bize ulaşın:
              </p>
              <a href={site.phoneHref} className="btn-yellow mt-6">
                {site.phone}
              </a>
            </div>
            <Faq items={faqs} />
          </div>
        </section>

        {/* Blog */}
        <section className="bg-soft py-16 md:py-24">
          <div className="container-site">
            <p className="eyebrow mb-3 text-center">Blog</p>
            <h2 className="text-center text-2xl md:text-4xl">
              Temizlik Uzmanlarından Pratik İpuçları
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {posts.slice(0, 3).map((p) => (
                <Link
                  key={p.slug}
                  to="/$slug"
                  params={{ slug: p.slug }}
                  className="group overflow-hidden rounded-4xl bg-background"
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
                    <h3 className="mt-2 text-base leading-snug">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/blog" className="btn-outline-dark">
                Tüm Yazılar
              </Link>
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
