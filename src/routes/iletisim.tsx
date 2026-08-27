import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Mail, MapPin, PhoneCall } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/Sections";
import { ContactFormSection } from "@/components/ContactForm";
import { getPage } from "@/data/content";
import { images, site } from "@/data/site";


const page = getPage("iletisim");
const description =
  page.description ||
  `Munzur Temizlik ile iletişime geçin: ${site.phone} · ${site.email} · İstanbul geneli temizlik hizmeti.`;

export const Route = createFileRoute("/iletisim")({
  head: () => ({
    meta: [
      { title: page.title || `İletişim - ${site.titleSuffix}` },
      { name: "description", content: description },
      { property: "og:title", content: page.title || `İletişim - ${site.titleSuffix}` },
      { property: "og:description", content: description },
      { property: "og:url", content: "/iletisim" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/iletisim" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: site.name,
          telephone: site.phone,
          email: site.email,
          address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: "İstanbul", addressCountry: "TR" },
          openingHours: "Mo-Su 09:00-17:00",
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="px-3 pt-4 md:px-5">
          <div
            className="rounded-[2rem] px-6 py-16 text-center md:rounded-[2.5rem] md:px-14 md:py-24"
            style={{ background: "linear-gradient(180deg, #F1F7EA 0%, #FFFFFF 100%)" }}
          >
            <p className="eyebrow inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.16em]">
              İletişim
              <img src={images.leaf1} alt="" aria-hidden="true" className="h-3.5 w-auto" />
            </p>
            <h1 className="mx-auto mt-3 max-w-4xl text-3xl leading-tight md:text-[3.2rem]">
              Randevu için 7/24 Bize Ulaşabilirsiniz.
            </h1>
          </div>
        </section>

        <section className="container-site py-14 md:py-20">
          <img
            src={images.leafs}
            alt=""
            aria-hidden="true"
            className="mx-auto mb-14 hidden w-40 md:block"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card icon={<Mail className="h-6 w-6" />} title="Email Adresi">
              <a href={`mailto:${site.email}`} className="hover:text-primary">
                {site.email}
              </a>
            </Card>
            <Card icon={<PhoneCall className="h-6 w-6" />} title="Bizi Arayın">
              <a href={site.phoneHref} className="hover:text-primary">
                {site.phone}
              </a>
            </Card>
            <Card icon={<MapPin className="h-6 w-6" />} title="Adres">
              {site.address}
            </Card>
            <Card icon={<CalendarDays className="h-6 w-6" />} title="Çalışma Saatleri">
              <dl className="space-y-1">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex gap-3">
                    <dt className="w-24 shrink-0 text-sm text-foreground/70">{h.day}</dt>
                    <dd>{h.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </section>

        <ContactFormSection />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.8rem] bg-pale p-8">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary">
        {icon}
      </span>
      <h2 className="mt-6 text-xl font-medium">{title}</h2>
      <div className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">{children}</div>
    </div>
  );
}

