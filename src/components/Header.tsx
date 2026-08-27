import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { images, serviceMeta, site } from "@/data/site";
import districtsData from "@/data/districts.json";
import { openQuoteModal } from "@/lib/quote-modal";

const sides: { key: string; label: string }[] = [
  { key: "avrupa", label: "Avrupa Yakası" },
  { key: "anadolu", label: "Anadolu Yakası" },
  { key: "kocaeli", label: "Kocaeli" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  const districts = districtsData as { slug: string; name: string; side: string }[];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="container-nav flex h-16 items-center justify-between gap-3 md:h-20 md:gap-4">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Munzur Temizlik ana sayfa">
          <img src={images.logo} alt="Munzur Temizlik logo" className="h-8 w-auto md:h-11" />
        </Link>


        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
          <NavLink to="/">Anasayfa</NavLink>

          <Dropdown
            label="Kurumsal"
            to="/hakkimizda"
            items={[
              { to: "/hakkimizda", label: "Hakkımızda" },
              { to: "/hakkimizda/temizlik-sureci", label: "Temizlik Sürecimiz" },
              { to: "/hakkimizda/sikca-sorulan-sorular", label: "S.S.S" },
            ]}
          />

          <Dropdown
            label="Hizmetlerimiz"
            to="/hizmetlerimiz"
            items={[
              { to: "/hizmetlerimiz", label: "Tüm Hizmetler" },
              ...serviceMeta.map((s) => ({ to: `/hizmetlerimiz/${s.slug}`, label: s.name })),
            ]}
          />

          <div className="group relative">
            <Link
              to="/hizmet-bolgeleri"
              className="flex items-center gap-1 rounded-full px-4 py-2 font-display text-[0.95rem] font-medium text-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Hizmet Bölgeleri
              <ChevronDown className="h-4 w-4" />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-[680px] -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-3 gap-6 rounded-3xl border border-border bg-popover p-6 shadow-xl">
                {sides.map((s) => (
                  <div key={s.key}>
                    <p className="mb-2 font-display text-sm font-medium text-primary">{s.label}</p>
                    <ul className="space-y-1">
                      {districts
                        .filter((d) => d.side === s.key)
                        .map((d) => (
                          <li key={d.slug}>
                            <Link
                              to="/hizmet-bolgeleri/$slug"
                              params={{ slug: d.slug }}
                              className="block text-sm text-ink transition-colors hover:text-primary"
                            >
                              {d.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <NavLink to="/iletisim">İletişim</NavLink>
          <NavLink to="/blog">Blog</NavLink>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2.5 rounded-full border border-border bg-background py-1.5 pl-1.5 pr-5 font-display text-[0.95rem] font-medium text-foreground transition-colors hover:border-secondary xl:flex"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Phone className="h-4 w-4" />
            </span>
            {site.phone}
          </a>
          <button
            type="button"
            aria-label="Ara"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent xl:h-10 xl:w-10"
          >
            <Search className="h-4 w-4" />
          </button>
          <a
            href={site.phoneHref}
            aria-label="Bizi arayın"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent xl:hidden"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={openQuoteModal}
            className="btn-yellow hidden sm:inline-flex"
          >
            Teklif Al
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:h-11 md:w-11 lg:hidden"
            aria-label="Menüyü aç/kapat"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-border bg-background lg:hidden">
          <div className="container-site space-y-1 py-4">
            <MobileLink to="/" onClick={() => setOpen(false)}>
              Ana Sayfa
            </MobileLink>

            <MobileGroup
              label="Hakkımızda"
              open={mobileSub === "about"}
              onToggle={() => setMobileSub(mobileSub === "about" ? null : "about")}
            >
              <MobileLink to="/hakkimizda" onClick={() => setOpen(false)}>
                Hakkımızda
              </MobileLink>
              <MobileLink to="/hakkimizda/temizlik-sureci" onClick={() => setOpen(false)}>
                Temizlik Sürecimiz
              </MobileLink>
              <MobileLink to="/hakkimizda/sikca-sorulan-sorular" onClick={() => setOpen(false)}>
                S.S.S
              </MobileLink>
            </MobileGroup>

            <MobileGroup
              label="Hizmetlerimiz"
              open={mobileSub === "services"}
              onToggle={() => setMobileSub(mobileSub === "services" ? null : "services")}
            >
              <MobileLink to="/hizmetlerimiz" onClick={() => setOpen(false)}>
                Tüm Hizmetler
              </MobileLink>
              {serviceMeta.map((s) => (
                <MobileLink
                  key={s.slug}
                  to="/hizmetlerimiz/$slug"
                  params={{ slug: s.slug }}
                  onClick={() => setOpen(false)}
                >
                  {s.name}
                </MobileLink>
              ))}
            </MobileGroup>

            <MobileGroup
              label="Hizmet Bölgeleri"
              open={mobileSub === "areas"}
              onToggle={() => setMobileSub(mobileSub === "areas" ? null : "areas")}
            >
              <MobileLink to="/hizmet-bolgeleri" onClick={() => setOpen(false)}>
                Tüm Bölgeler
              </MobileLink>
              {districts.map((d) => (
                <MobileLink
                  key={d.slug}
                  to="/hizmet-bolgeleri/$slug"
                  params={{ slug: d.slug }}
                  onClick={() => setOpen(false)}
                >
                  {d.name}
                </MobileLink>
              ))}
            </MobileGroup>

            <MobileLink to="/blog" onClick={() => setOpen(false)}>
              Blog
            </MobileLink>
            <MobileLink to="/iletisim" onClick={() => setOpen(false)}>
              İletişim
            </MobileLink>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openQuoteModal();
              }}
              className="btn-yellow mt-3 w-full"
            >
              Teklif Al
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-full px-4 py-2 font-display text-[0.95rem] font-medium text-foreground transition-colors hover:text-primary"
      activeProps={{ className: "text-primary" }}
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  to,
  items,
}: {
  label: string;
  to: string;
  items: { to: string; label: string }[];
}) {
  return (
    <div className="group relative">
      <Link
        to={to}
        className="flex items-center gap-1 rounded-full px-4 py-2 font-display text-[0.95rem] font-medium text-foreground transition-colors hover:text-primary"
        activeProps={{ className: "text-primary" }}
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </Link>
      <div className="invisible absolute left-0 top-full z-50 w-72 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        <ul className="rounded-3xl border border-border bg-popover p-3 shadow-xl">
          {items.map((i) => (
            <li key={i.to}>
              <Link
                to={i.to}
                className="block rounded-2xl px-4 py-2 text-sm text-ink transition-colors hover:bg-pale hover:text-foreground"
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileGroup({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left font-display font-medium text-foreground"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="ml-3 border-l border-border pl-3">{children}</div>}
    </div>
  );
}

function MobileLink({
  to,
  params,
  onClick,
  children,
}: {
  to: string;
  params?: Record<string, string>;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      params={params as never}
      onClick={onClick}
      className="block rounded-2xl px-4 py-2.5 font-display text-[0.95rem] text-ink transition-colors hover:text-primary"
    >
      {children}
    </Link>
  );
}
