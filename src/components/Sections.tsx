import { Link } from "@tanstack/react-router";
import { images, site, testimonials } from "@/data/site";
import { openQuoteModal } from "@/lib/quote-modal";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-soft">
      <img
        src={images.leafs}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 h-full opacity-40"
      />
      <div className="container-site relative grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2">
        <div>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-3xl leading-tight md:text-5xl">{title}</h1>
          {text && <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed">{text}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={openQuoteModal} className="btn-yellow">
              Ücretsiz Teklif Al
            </button>
            <a href={site.phoneHref} className="btn-outline-dark">
              {site.phone}
            </a>
          </div>
        </div>
        {image && (
          <div className="overflow-hidden rounded-4xl">
            <img src={image} alt={title} className="h-72 w-full object-cover md:h-96" />
          </div>
        )}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="container-site py-16 md:py-24">
      <div className="grid overflow-hidden rounded-4xl bg-pale lg:grid-cols-2">
        <div className="p-8 md:p-14">
          <p className="eyebrow mb-3">Hemen Başlayın</p>
          <h2 className="text-2xl md:text-4xl">
            Tertemiz bir yaşam alanı bir tık uzağınızda
          </h2>
          <p className="mt-4 max-w-lg text-[1.02rem] leading-relaxed">
            İhtiyacınızı bize iletin, size özel temizlik planınızı ve fiyatınızı hemen hazırlayalım.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={openQuoteModal} className="btn-green">
              Teklif Formu
            </button>
            <a href={site.whatsapp} className="btn-outline-dark" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="min-h-64">
          <img
            src={images.ctaImg}
            alt="Profesyonel temizlik ekibi"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="container-site">
        <p className="eyebrow mb-3 text-center">Müşteri Yorumları</p>
        <h2 className="mx-auto max-w-2xl text-center text-2xl md:text-4xl">
          Müşterilerimiz Bizim Hakkımızda Ne Diyor?
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-4xl bg-background p-8">
              <blockquote className="text-[1.02rem] leading-relaxed">“{t.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <span>
                  <span className="block font-display font-medium text-foreground">{t.name}</span>
                  <span className="block text-sm">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
