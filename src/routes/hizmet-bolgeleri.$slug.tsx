import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaBand, Testimonials } from "@/components/Sections";
import { districts, getDistrict } from "@/data/content";
import { images, serviceMeta, site } from "@/data/site";

export const Route = createFileRoute("/hizmet-bolgeleri/$slug")({
  loader: ({ params }) => {
    const district = getDistrict(params.slug);
    if (!district) throw notFound();
    return { district };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Sayfa bulunamadı" }, { name: "robots", content: "noindex" }] };
    }
    const d = loaderData.district;
    const description = d.description || d.intro.slice(0, 155);
    return {
      meta: [
        { title: d.title },
        { name: "description", content: description },
        { property: "og:title", content: d.title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/hizmet-bolgeleri/${params.slug}` },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `/hizmet-bolgeleri/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `${site.name} - ${d.name}`,
            telephone: site.phone,
            email: site.email,
            areaServed: { "@type": "Place", name: `${d.name}, İstanbul` },
          }),
        },
      ],
    };
  },
  component: DistrictPage,
});

function DistrictPage() {
  const { district } = Route.useLoaderData();
  const nearby = districts.filter((d) => d.side === district.side && d.slug !== district.slug);

  return (
    <>
      <Header />
      <main>
        <section className="bg-soft">
          <div className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Hizmet Bölgeleri</p>
              <h1 className="text-3xl md:text-5xl">{district.h2 || district.name}</h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed">{district.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/teklif-formu" className="btn-yellow">
                  Ücretsiz Teklif Al
                </Link>
                <a href={site.phoneHref} className="btn-outline-dark">
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-4xl">
              <img
                src={images.karolina}
                alt={`${district.name} temizlik hizmeti`}
                className="h-72 w-full object-cover md:h-96"
              />
            </div>
          </div>
        </section>

        <section className="container-site py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              {district.neighborhoodsTitle && (
                <h2 className="text-2xl md:text-3xl">{district.neighborhoodsTitle}</h2>
              )}
              <div className="mt-6 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {district.neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="flex items-center gap-2 rounded-2xl bg-soft px-4 py-3 text-[0.95rem]"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    {n}
                  </span>
                ))}
              </div>

              {district.h2b && <h2 className="mt-12 text-2xl md:text-3xl">{district.h2b}</h2>}
              {district.outro && (
                <p className="mt-4 text-[1.02rem] leading-relaxed">{district.outro}</p>
              )}

              <h2 className="mt-12 text-2xl md:text-3xl">
                {district.name} Bölgesinde Sunduğumuz Hizmetler
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {serviceMeta.map((s) => (
                  <Link
                    key={s.slug}
                    to="/hizmetlerimiz/$slug"
                    params={{ slug: s.slug }}
                    className="rounded-2xl border border-border px-5 py-4 font-display transition-colors hover:border-primary hover:text-primary"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-4xl bg-pale p-7 lg:sticky lg:top-28">
              <h2 className="text-lg">Yakın Bölgeler</h2>
              <ul className="mt-4 grid grid-cols-2 gap-1.5">
                {nearby.map((d) => (
                  <li key={d.slug}>
                    <Link
                      to="/hizmet-bolgeleri/$slug"
                      params={{ slug: d.slug }}
                      className="text-[0.95rem] transition-colors hover:text-primary"
                    >
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
