import { Link } from "@tanstack/react-router";
import { Clock, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { images, serviceMeta, site } from "@/data/site";
import districtsData from "@/data/districts.json";

export function Footer() {
  const districts = (districtsData as { slug: string; name: string }[]).slice(0, 12);

  return (
    <footer className="relative overflow-hidden bg-soft pt-20">
      <img
        src={images.footerLeaf1}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-8 w-40 opacity-70"
      />
      <img
        src={images.footerLeaf2}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-24 w-40 opacity-70"
      />

      <div className="container-site relative">
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={images.logo} alt="Munzur Temizlik" className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              İstanbul genelinde ev, ofis ve iş yerleri için profesyonel, hijyenik ve güvenilir
              temizlik hizmetleri sunuyoruz.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={site.instagram}
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={site.youtube}
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg">Hizmetlerimiz</h3>
            <ul className="space-y-2 text-sm">
              {serviceMeta.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/hizmetlerimiz/$slug"
                    params={{ slug: s.slug }}
                    className="transition-colors hover:text-primary"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/teklif-formu" className="transition-colors hover:text-primary">
                  Teklif Formu
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg">Hizmet Bölgeleri</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {districts.map((d) => (
                <li key={d.slug}>
                  <Link
                    to="/hizmet-bolgeleri/$slug"
                    params={{ slug: d.slug }}
                    className="transition-colors hover:text-primary"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
              <li className="col-span-2">
                <Link to="/hizmet-bolgeleri" className="font-medium text-primary">
                  Tüm bölgeler →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg">İletişim</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={site.phoneHref} className="hover:text-primary">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${site.email}`} className="hover:text-primary">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.day} className="block">
                      {h.day} {h.value}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-sm md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.
          </p>
          <a
            href="https://www.3ytasarim.com"
            target="_blank"
            rel="noopener noreferrer"
            className="design-credit font-medium"
          >
            Design by: 3Y Tasarim & Yazılım Hizmetleri
          </a>
          <div className="flex gap-6">
            <Link to="/hakkimizda" className="hover:text-primary">
              Hakkımızda
            </Link>
            <Link to="/blog" className="hover:text-primary">
              Blog
            </Link>
            <Link to="/iletisim" className="hover:text-primary">
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
