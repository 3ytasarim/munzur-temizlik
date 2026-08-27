import { Check, Mail, PhoneCall, MapPin, CalendarDays } from "lucide-react";
import { CtaBand } from "@/components/Sections";
import { images, site } from "@/data/site";
import { openQuoteModal } from "@/lib/quote-modal";
import type { District } from "@/data/content";

function Chunked({ items }: { items: string[] }) {
  const cols = 4;
  const per = Math.ceil(items.length / cols);
  const groups = Array.from({ length: cols }, (_, i) => items.slice(i * per, (i + 1) * per));
  return (
    <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((g, i) => (
        <ul key={i} className="space-y-5">
          {g.map((n) => (
            <li key={n} className="flex items-center gap-3 text-[1.02rem]">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Check className="h-3.5 w-3.5" />
              </span>
              {n}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

const contactCards = [
  { icon: Mail, title: "Email Adresi", lines: [site.email] },
  { icon: PhoneCall, title: "Bizi Arayın", lines: [site.phone] },
  { icon: MapPin, title: "Adres", lines: [site.address] },
  { icon: CalendarDays, title: "Çalışma Saatleri", lines: [] as string[] },
];

export function DistrictPage({ district }: { district: District }) {
  return (
    <main>
      {/* Hero */}
      <section className="px-3 pt-4 md:px-5">
        <div
          className="rounded-[2rem] px-6 py-16 text-center md:rounded-[2.5rem] md:px-14 md:py-24"
          style={{
            background: "linear-gradient(180deg, #F1F7EA 0%, #FFFFFF 100%)",
          }}
        >
          <p className="eyebrow inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.16em]">
            Hizmet Bölgeleri
            <img src={images.leaf1} alt="" aria-hidden="true" className="h-3.5 w-auto" />
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl">{district.name}</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="container-site py-14 md:py-20">
        <img
          src={images.leafs}
          alt=""
          aria-hidden="true"
          className="mx-auto mb-14 hidden w-40 md:block"
        />
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.16em]">
              {district.name}
              <img src={images.leaf1} alt="" aria-hidden="true" className="h-3.5 w-auto" />
            </p>
            <h2 className="text-3xl leading-tight md:text-[2.6rem]">{district.h2}</h2>
          </div>
          <p className="text-[1.02rem] leading-relaxed text-foreground/80">{district.intro}</p>
        </div>

        <hr className="mt-14 border-border" />

        <div className="mt-14 text-center">
          <h2 className="text-2xl md:text-[2.1rem]">{district.neighborhoodsTitle}</h2>
        </div>
        <Chunked items={district.neighborhoods} />
      </section>

      {/* Green band */}
      <section className="px-3 pb-24 md:px-5">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 pb-24 pt-16 text-center md:rounded-[2.5rem] md:px-14 md:pb-28 md:pt-20">
          <img
            src={images.leaf2}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-10 hidden w-32 md:block"
          />
          <img
            src={images.leaf3}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-8 hidden w-20 md:block"
          />
          <p className="eyebrow text-[0.78rem] uppercase tracking-[0.16em] text-white/90">
            Biz Sizin İçin Burayayız
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl leading-tight text-white md:text-[2.6rem]">
            {district.h2b}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-white/90">{district.outro}</p>

          <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((c) => (
              <div key={c.title} className="rounded-[1.6rem] bg-pale p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl font-medium">{c.title}</h3>
                {c.title === "Çalışma Saatleri" ? (
                  <dl className="mt-3 space-y-1 text-sm text-foreground/80">
                    {site.hours.map((h) => (
                      <div key={h.day} className="flex gap-3">
                        <dt className="w-24 shrink-0">{h.day}</dt>
                        <dd>{h.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">{c.lines[0]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="absolute -bottom-0 left-1/2 -translate-x-1/2">
            <div className="rounded-t-[1.6rem] bg-pale px-5 pt-4">
              <button type="button" onClick={openQuoteModal} className="btn-yellow mb-4">
                Ücretsiz Teklif Al
              </button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
