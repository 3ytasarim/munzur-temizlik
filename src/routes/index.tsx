import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq, faqJsonLd } from "@/components/Faq";
import { CtaBand, Testimonials } from "@/components/Sections";
import { getFaqs, getPage, posts } from "@/data/content";
import { advantages, howItWorks, images, postImages, quoteServices, serviceMeta, site, stats } from "@/data/site";

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

function HomeQuoteSection() {
  const [sent, setSent] = useState(false);

  return (
    <section className="container-site py-14 md:py-20">
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* Form card */}
        <div
          className="rounded-[2.5rem] p-8 md:p-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(242,215,1,0.95) 0%, rgba(232,245,211,0.95) 60%, rgba(232,245,211,0.95) 100%)",
          }}
        >
          <p className="eyebrow mb-3 text-[0.75rem]">Ücretsiz Fiyat Teklifi Alın</p>
          <h2 className="max-w-md text-2xl leading-snug md:text-3xl">
            Temizlik hizmetiniz için hemen fiyat alın, süreci başlatın.
          </h2>

          {sent ? (
            <div className="mt-8 rounded-3xl bg-white/80 p-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl">Talebiniz alındı</h3>
              <p className="mt-2 text-sm">
                En kısa sürede sizinle iletişime geçeceğiz.
              </p>
            </div>
          ) : (
            <form
              className="mt-8 grid gap-4 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <QuoteField label="Adınız Soyadınız" name="hq-name" />
              <QuoteField label="Email Adresiniz" name="hq-email" type="email" />
              <QuoteField label="Telefon" name="hq-phone" type="tel" />
              <QuoteField label="Toplam metrekare" name="hq-size" />
              <div className="md:col-span-2">
                <label
                  htmlFor="hq-service"
                  className="mb-2 block font-display text-sm font-medium text-foreground"
                >
                  Bir hizmet seçin
                </label>
                <select
                  id="hq-service"
                  name="hq-service"
                  defaultValue=""
                  className="w-full rounded-2xl border-0 bg-white px-4 py-3 font-display text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>
                    Seç
                  </option>
                  {quoteServices.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 flex items-start gap-3">
                <input
                  id="hq-kvkk"
                  name="hq-kvkk"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-0 text-primary focus:ring-primary"
                />
                <label htmlFor="hq-kvkk" className="text-xs leading-relaxed text-foreground/80">
                  Bu formu göndererek, kişisel verilerinizin Genel Veri Koruma Yönetmeliği ve
                  Gizlilik Politikamıza uygun olarak işlenmesini kabul etmiş olursunuz.
                </label>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 font-display text-sm font-medium text-white transition-colors hover:bg-foreground/90"
                >
                  Formu Gönder
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Image + satisfaction card */}
        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-soft">
            <img
              src={images.aboutTeam}
              alt="Profesyonel temizlik ekibi"
              loading="lazy"
              className="h-80 w-full object-cover md:h-[420px]"
            />
          </div>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-soft p-8 md:p-10">
            <img
              src={images.leaf1}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-6 w-40 opacity-80"
            />
            <div className="relative flex items-start gap-4">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-lg">%100 Memnuniyet Odaklı Hizmet</h3>
                <p className="mt-2 text-sm leading-relaxed">
                  Sizin memnuniyetiniz bizim için en büyük önceliktir.{" "}
                  <strong className="text-foreground">Munzur Temizlik</strong> olarak tüm
                  hizmetlerimizde yüksek kalite ve müşteri mutluluğu için titizlikle çalışıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteField({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-display text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full rounded-2xl border-0 bg-white px-4 py-3 font-display text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
