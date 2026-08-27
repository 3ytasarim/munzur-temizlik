import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/Sections";
import { getPage } from "@/data/content";
import { site } from "@/data/site";

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
        <PageHero
          eyebrow="İletişim"
          title="Bize Ulaşın"
          text="Sorularınız ve temizlik talepleriniz için bize telefon, e-posta veya WhatsApp üzerinden ulaşabilirsiniz."
        />

        <section className="container-site grid gap-6 py-16 md:grid-cols-2 md:py-24 lg:grid-cols-4">
          <Card icon={<Phone className="h-5 w-5" />} title="Bizi Arayın">
            <a href={site.phoneHref} className="hover:text-primary">
              {site.phone}
            </a>
          </Card>
          <Card icon={<Mail className="h-5 w-5" />} title="Email Adresi">
            <a href={`mailto:${site.email}`} className="hover:text-primary">
              {site.email}
            </a>
          </Card>
          <Card icon={<MapPin className="h-5 w-5" />} title="Adres">
            {site.address}
          </Card>
          <Card icon={<Clock className="h-5 w-5" />} title="Çalışma Saatleri">
            {site.hours.map((h) => (
              <span key={h.day} className="block">
                {h.day} {h.value}
              </span>
            ))}
          </Card>
        </section>

        <section className="container-site pb-20">
          <div className="rounded-4xl bg-pale p-8 text-center md:p-14">
            <h2 className="text-2xl md:text-3xl">Hızlı teklif almak ister misiniz?</h2>
            <p className="mx-auto mt-3 max-w-xl">
              Teklif formunu doldurun, ekibimiz en kısa sürede size özel fiyatla dönüş yapsın.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/teklif-formu" className="btn-green">
                Teklif Formu
              </Link>
              <a href={site.whatsapp} className="btn-outline-dark" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </section>
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
    <div className="rounded-4xl border border-border p-7">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-pale text-primary">
        {icon}
      </span>
      <h2 className="mt-4 text-lg">{title}</h2>
      <div className="mt-2 text-[0.98rem] leading-relaxed">{children}</div>
    </div>
  );
}
