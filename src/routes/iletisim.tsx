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
        <section className="px-3 pt-3 md:px-5">
          <div
            className="rounded-[2rem] px-6 pb-8 pt-24 text-center md:rounded-[2.5rem] md:px-14 md:pb-10 md:pt-44"
            style={{ background: "linear-gradient(180deg, #F3F8EC 0%, #FFFFFF 100%)" }}
          >
            <p className="eyebrow inline-flex items-start gap-1 text-[0.78rem] uppercase tracking-[0.16em]">
              İletişim
              <img src={images.leaf2} alt="" aria-hidden="true" className="mt-[-2px] h-3 w-auto" />
            </p>
            <h1 className="mx-auto mt-2 max-w-5xl text-3xl leading-[1.1] md:text-[3.3rem]">
              Randevu için 7/24 Bize Ulaşabilirsiniz.
            </h1>
          </div>
        </section>

        <section className="container-site pb-14 md:pb-20">
          <div className="relative mx-auto mb-12 hidden h-40 w-56 md:block">
            <img src={images.leaf3} alt="" aria-hidden="true" className="absolute left-0 top-2 w-24 -rotate-12" />
            <img src={images.leaf1} alt="" aria-hidden="true" className="absolute right-6 top-0 w-14 rotate-6" />
            <img src={images.leaf2} alt="" aria-hidden="true" className="absolute bottom-0 left-16 w-24 rotate-3" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card icon={iconMail} title="Email Adresi">
              <a href={`mailto:${site.email}`} className="hover:text-primary">
                {site.email}
              </a>
            </Card>
            <Card icon={iconPhone} title="Bizi Arayın">
              <a href={site.phoneHref} className="hover:text-primary">
                {site.phone}
              </a>
            </Card>
            <Card icon={iconPin} title="Adres">
              {site.address}
            </Card>
            <Card icon={iconCalendar} title="Çalışma Saatleri">
              <dl className="space-y-1 text-sm">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex gap-3">
                    <dt className="w-24 shrink-0 text-foreground/70">{h.day}</dt>
                    <dd>{h.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </section>

        <ContactFormSection />
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
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[260px] flex-col rounded-[1.8rem] bg-[#F4F7F0] p-7">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
        <img src={icon} alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
      </span>
      <h2 className="mt-8 text-[1.55rem] font-medium leading-tight">{title}</h2>
      <div className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">{children}</div>
    </div>
  );
}


