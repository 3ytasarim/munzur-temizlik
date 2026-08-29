import { Link } from "@tanstack/react-router";
import { ChevronRight, Phone } from "lucide-react";
import { Blocks, type Block } from "@/components/Blocks";
import { QuoteSection, CtaBand } from "@/components/Sections";
import { images, serviceMeta, site } from "@/data/site";
import { openQuoteModal } from "@/lib/quote-modal";

export function Sidebar({ image }: { image?: string | undefined }) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      {image && (
        <div className="relative">
          <img
            src={images.leaf1}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 left-6 w-16"
          />
          <div className="overflow-hidden rounded-[2rem]">
            <img src={image} alt="Temizlik hizmeti" className="aspect-[4/3.4] w-full object-cover" />
          </div>
        </div>
      )}

      <div className="rounded-[2rem] bg-soft p-6 md:p-7">
        <h2 className="text-xl font-medium">Hizmetlerimiz</h2>
        <ul className="mt-5 space-y-3">
          {serviceMeta
            .filter((s) => s.slug !== "tasinma-oncesi-sonrasi-temizlik")
            .map((s) => (
              <li key={s.slug}>
                <Link
                  to="/hizmetlerimiz/$slug"
                  params={{ slug: s.slug }}
                  className="flex items-center justify-between rounded-full bg-white px-6 py-4 font-display text-[0.98rem] transition-colors hover:bg-pale"
                >
                  {s.name}
                  <ChevronRight className="h-4 w-4 text-primary" />
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div
        className="rounded-[2rem] p-7 md:p-8"
        style={{
          background:
            "linear-gradient(150deg, rgba(242,215,1,0.9) 0%, rgba(232,245,211,0.9) 75%)",
        }}
      >
        <h2 className="max-w-xs text-xl font-medium leading-snug md:text-2xl">
          İstanbul’da temizlik hizmeti mi arıyorsunuz? İletişime Geçin!
        </h2>
        <a
          href={site.phoneHref}
          className="mt-6 inline-flex items-center gap-3 rounded-full bg-secondary px-6 py-3 font-display text-sm font-semibold text-secondary-foreground"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary-foreground/10">
            <Phone className="h-4 w-4 text-secondary-foreground" />
          </span>
          {site.phone}
        </a>
      </div>

      <div className="rounded-[2rem] bg-soft p-7 text-center md:p-8">
        <img
          src={images.serviceSide}
          alt="Sıkça sorulan sorular"
          loading="lazy"
          className="mx-auto w-48"
        />
        <p className="mt-4 font-display text-[1.35rem] leading-snug">
          Merak ettikleriniz mi var? Tüm cevaplar için Sıkça Sorulan Sorular’a göz atın!
        </p>
        <Link
          to="/hakkimizda/sikca-sorulan-sorular"
          className="mt-6 inline-block rounded-full border-2 border-primary px-7 py-3 font-display text-sm font-medium transition-colors hover:bg-pale"
        >
          S.S.S Bölümümüzü Okuyun
        </Link>
      </div>
    </aside>
  );
}

export function DetailPage({
  eyebrow,
  title,
  subtitle,
  blocks,
  image,
  hasForm,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string | undefined;
  blocks: Block[];
  image?: string | undefined;
  hasForm?: boolean | undefined;
}) {
  return (
    <main>
      <section className="px-3 pt-4 md:px-5">
        <div className="rounded-[2rem] bg-soft px-6 py-12 md:rounded-[2.5rem] md:px-14 md:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-4 flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.14em]">
                {eyebrow}
                <img src={images.leaf1} alt="" aria-hidden="true" className="h-4 w-auto" />
              </p>
              <h1 className="text-4xl leading-tight md:text-6xl">{title}</h1>
              {subtitle && (
                <p className="mt-6 max-w-lg text-[1.15rem] leading-relaxed">{subtitle}</p>
              )}
              <button
                type="button"
                onClick={openQuoteModal}
                className="btn-yellow mt-9"
              >
                Teklif Alın
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <article>
            <Blocks blocks={blocks} />
          </article>
          <Sidebar image={image} />
        </div>
      </section>

      {hasForm && <QuoteSection />}
      <CtaBand />
    </main>
  );
}
