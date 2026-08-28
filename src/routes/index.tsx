import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Phone,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq, faqJsonLd } from "@/components/Faq";
import { CtaBand, QuoteSection } from "@/components/Sections";
import { getFaqs, getPage, posts } from "@/data/content";
import {
  advantages,
  howItWorks,
  images,
  postImages,
  serviceMeta,
  site,
  stats,
  testimonials,
} from "@/data/site";

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

import {
  advantageIcons,
  arrowIll,
  googleG,
  heroAvatars,
  heroBadges,
  starSvg,
  stepIcons,
  stepLeafs,
} from "@/data/home-ui";

function GoogleRating() {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-md">
      <img src={starSvg} alt="" aria-hidden="true" className="h-8 w-8 shrink-0" />
      <span>
        <span className="flex items-center gap-1">
          <span className="font-display text-lg font-medium leading-none text-foreground">4.8</span>
          <img src={googleG} alt="Google" className="h-4 w-4" />
        </span>
        <span className="mt-1 block text-[0.72rem] leading-none">480 Google Puanı</span>
      </span>
    </div>
  );
}

function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="container-site pt-3 md:pt-6">
          <div
            className="relative flex items-end overflow-hidden rounded-[28px] bg-cover bg-[position:right_top] bg-no-repeat px-3 pb-3 pt-[270px] sm:pt-[320px] md:min-h-[740px] md:items-center md:rounded-[37px] md:bg-center md:px-[7%] md:py-[7%]"
            style={{ backgroundImage: `url(${images.heroImg})` }}
          >
            <div className="w-full max-w-[640px] rounded-[24px] bg-soft p-6 sm:p-8 md:rounded-[30px] md:p-12">
              <h1 className="text-[1.6rem] leading-[1.18] sm:text-[2rem] md:text-[2.6rem]">
                İstanbul’un Her Noktasına Profesyonel Temizlik Hizmeti
              </h1>
              <p className="mt-4 text-[0.95rem] leading-relaxed md:mt-5 md:text-[1.02rem]">
                Avrupa Yakası&apos;ndan Anadolu Yakası’na kadar tüm ilçelere hizmet sağlıyoruz.
                Deneyimli kadromuz ve zamanında hizmet anlayışımızla İstanbul’un en güvenilir
                temizlik firmaları arasındayız.
              </p>

              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/teklif-formu" className="btn-yellow">
                  Ücretsiz Teklif
                </Link>
                <Link to="/hizmetlerimiz" className="btn-outline-dark">
                  Hizmetlerimiz
                </Link>
              </div>
              <ul className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
                {heroBadges.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 font-display text-sm font-medium text-foreground"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 fill-primary text-white" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Google rating + avatars on a white cut-out patch, bottom right */}
            <div className="absolute bottom-0 right-0 flex flex-col items-end gap-2 rounded-tl-[24px] bg-white p-3 pb-4 md:rounded-tl-[37px] md:p-5 md:pb-6">
              <GoogleRating />
              <div className="flex -space-x-3 rounded-full bg-white p-1 shadow-md">
                {heroAvatars.map((a) => (
                  <img
                    key={a}
                    src={a}
                    alt=""
                    aria-hidden="true"
                    className="h-9 w-9 rounded-full border-2 border-white object-cover md:h-10 md:w-10"
                  />
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* Quote form */}
        <QuoteSection />

        {/* How it works */}
        <section className="container-site py-16 md:py-24">
          <p className="eyebrow mb-3 text-center">Munzur Temizlik</p>
          <h2 className="text-center text-3xl md:text-[2.5rem]">Nasıl Çalışır?</h2>
          <div className="mt-14 flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-center">
            {howItWorks.map((s, i) => (
              <div key={s.title} className="contents">
                <div className="flex-1 text-center">
                  <div className="relative mx-auto h-36 w-36">
                    <span className="absolute inset-0 flex items-center justify-center rounded-full bg-pale">
                      <img src={stepIcons[i]} alt="" aria-hidden="true" className="h-16 w-16" />
                    </span>
                    <img
                      src={stepLeafs[i]}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-4 -top-4 w-20"
                    />
                  </div>
                  <h3 className="mt-8 text-xl">{s.title}</h3>
                  <p className="mx-auto mt-3 max-w-[250px] text-[0.98rem] leading-relaxed md:max-w-xs">
                    {s.text}
                  </p>
                </div>
                {i < howItWorks.length - 1 && (
                  <>
                    {/* mobile: vertical arrow */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 80"
                      className="h-20 w-3 shrink-0 text-primary md:hidden"
                      fill="none"
                    >
                      <path
                        d="M6 0v70"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M1.5 64L6 72l4.5-8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <img
                      src={arrowIll}
                      alt=""
                      aria-hidden="true"
                      className="mt-16 hidden w-32 shrink-0 self-start md:block"
                    />
                  </>
                )}
              </div>
            ))}
          </div>

        </section>


        {/* About */}
        <section className="container-site">
          <div className="rounded-[37px] bg-soft p-8 md:p-16">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="eyebrow mb-3">Biz Kimiz?</p>
                <h2 className="text-3xl leading-tight md:text-[2.5rem]">
                  Parlayan Mekanlar İçin En Doğru Tercih: Munzur Temizlik
                </h2>
                <p className="mt-6 text-[1.02rem] leading-relaxed">
                  <strong className="font-medium text-foreground">Munzur Temizlik</strong>, İstanbul
                  genelinde profesyonel, güvenilir ve ulaşılabilir temizlik hizmeti sunma vizyonuyla
                  yola çıkmıştır. Deneyimli ekibimiz ve yüksek müşteri memnuniyetimizle, yaşam
                  alanlarınızı kusursuz bir hijyenle buluşturuyoruz.
                </p>
                <hr className="my-7 border-border" />
                <ul className="space-y-3">
                  {[
                    "Temizlik süreciyle ilgili sizi her adımda bilgilendiriyoruz.",
                    "Evinizi kendi evimiz gibi özenle temizliyoruz.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 fill-primary text-white" />
                      <span className="font-display text-sm font-medium text-foreground">{t}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/hakkimizda" className="btn-yellow mt-8">
                  Hakkımızda
                </Link>
              </div>
              <div className="overflow-hidden rounded-[30px]">
                <img
                  src={images.aboutTeam}
                  alt="Munzur Temizlik ekibi"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="container-site -mt-24 pt-24">
          <div className="relative overflow-hidden rounded-[37px] bg-primary px-6 pb-20 pt-32 text-white md:px-14">
            <img
              src={images.leaf1}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute left-6 top-24 hidden w-40 opacity-30 md:block"
            />
            <img
              src={images.leaf2}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-10 top-20 hidden w-24 opacity-30 md:block"
            />
            <p className="relative text-center font-display text-sm font-medium uppercase tracking-[0.08em] text-white/80">
              Neden Munzur Temizlik?
            </p>
            <h2 className="relative mx-auto mt-3 max-w-2xl text-center text-3xl text-white md:text-[2.5rem]">
              Uzmanız. Tecrübeliyiz. Size Özel Çözümler Sunuyoruz.
            </h2>

            <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((a, i) => (
                <div key={a.title} className="rounded-[24px] bg-pale p-7 text-foreground">
                  <span className="inline-flex h-16 w-16 items-center justify-center">
                    <img
                      src={advantageIcons[i] ?? advantageIcons[0]}
                      alt=""
                      aria-hidden="true"
                      className="h-14 w-14"
                    />
                  </span>
                  <h3 className="mt-6 text-xl leading-snug">{a.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed">{a.text}</p>
                </div>
              ))}

            </div>

            <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => {
                const [value, suffix] = s.value.split(" ");
                return (
                  <div
                    key={s.label}
                    className={i === 0 ? "px-2" : "px-2 lg:border-l lg:border-white/25"}
                  >
                    <p className="font-display text-4xl font-medium text-white md:text-5xl">
                      {value}
                      <sup className="ml-1 text-xl">{suffix}</sup>
                    </p>
                    <p className="mt-3 text-sm text-white/90">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative z-10 -mt-7 flex justify-center">
            <Link
              to="/hakkimizda/temizlik-sureci"
              className="rounded-full border-2 border-primary bg-background px-8 py-3.5 font-display text-[0.95rem] font-medium text-foreground transition-colors hover:bg-pale"
            >
              Temizlik Süreci
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="container-site py-16 md:py-24">
          <p className="eyebrow mb-3 text-center md:text-left">
            İstanbul Profesyonel Temizlik Hizmetlerimiz
          </p>
          <h2 className="mx-auto max-w-2xl text-center text-[1.65rem] leading-tight md:mx-0 md:text-left md:text-[2.5rem]">
            İstanbul’da Güvenilir Temizlik Hizmeti Arayanlara Özel Çözümler
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceMeta.slice(0, 4).map((s) => (
              <div
                key={s.slug}
                className="rounded-[28px] p-3"
                style={{
                  background: "linear-gradient(180deg, #F2D701 0%, #E8F5D3 45%, #F4F6F0 100%)",
                }}
              >
                <div className="relative overflow-hidden rounded-[22px]">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="h-52 w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </span>
                </div>
                <h3 className="mt-5 px-2 text-center text-lg leading-snug md:min-h-14 md:text-left">
                  {s.shortName}
                </h3>

                <Link
                  to="/hizmetlerimiz/$slug"
                  params={{ slug: s.slug }}
                  className="mt-6 flex items-center justify-between gap-3 rounded-full bg-background px-5 py-3 font-display text-sm font-medium text-foreground"
                >
                  Daha Fazla
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-pale">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container-site pb-16 md:pb-24">
          <div className="rounded-[37px] bg-soft px-6 py-16 md:px-14">
            <p className="eyebrow text-center">Temizlik Hizmetlerinde Yorumlar</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl leading-tight md:text-[2.5rem]">
              İstanbul’da En Çok Tavsiye Edilen Temizlik Firmalarından Biriyiz
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {testimonials.slice(0, 2).map((t) => (
                <figure key={t.name} className="rounded-[24px] bg-background p-9">
                  <span className="font-display text-4xl leading-none text-foreground">“</span>
                  <blockquote className="mt-5 text-[1.05rem] leading-relaxed">{t.text}</blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <span>
                      <span className="block font-display text-sm font-medium uppercase tracking-wide text-foreground">
                        {t.name}
                      </span>
                      <span className="block text-sm">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <GoogleRating />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container-site pb-16 md:pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="eyebrow mb-3">Munzur Temizlik</p>
              <h2 className="text-3xl md:text-[2.5rem]">Sıkça Sorulan Sorular</h2>
              <div className="mt-10 rounded-[28px] bg-pale p-8">
                <p className="font-display text-lg font-medium text-foreground">
                  İstanbul&apos;da temizlik hizmeti mi arıyorsunuz?
                  <br />
                  Hemen bize ulaşın:
                </p>
                <a
                  href={site.phoneHref}
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-background py-2 pl-2 pr-6 font-display text-[0.95rem] font-medium text-foreground"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Phone className="h-4 w-4" />
                  </span>
                  {site.phone}
                </a>
              </div>
            </div>
            <Faq items={faqs} />
          </div>
        </section>

        {/* Blog */}
        <section className="container-site pb-16 md:pb-24">
          <div className="rounded-[37px] bg-soft px-6 py-16 md:px-14">
            <p className="eyebrow mb-3">Güncel Yazılar</p>
            <h2 className="max-w-xl text-3xl leading-tight md:text-[2.5rem]">
              Temizlik Uzmanlarından Pratik İpuçları
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {posts.slice(0, 3).map((p) => (
                <Link key={p.slug} to="/$slug" params={{ slug: p.slug }} className="group block">
                  {postImages[p.slug] && (
                    <div className="overflow-hidden rounded-[22px]">
                      <img
                        src={postImages[p.slug]}
                        alt={p.title}
                        loading="lazy"
                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <span className="mt-5 block font-display text-xs font-medium uppercase tracking-[0.08em] text-primary">
                    {p.category}
                  </span>
                  <h3 className="mt-2 text-xl leading-snug">{p.title}</h3>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/blog"
                className="rounded-full border-2 border-primary bg-background px-8 py-3.5 font-display text-[0.95rem] font-medium text-foreground transition-colors hover:bg-pale"
              >
                Daha Fazla İpucu
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

