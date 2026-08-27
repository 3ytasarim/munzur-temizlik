import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Blocks } from "@/components/Blocks";
import { CtaBand, Testimonials } from "@/components/Sections";
import { getService } from "@/data/content";
import { serviceMeta, site } from "@/data/site";

export const Route = createFileRoute("/hizmetlerimiz/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    const meta = serviceMeta.find((m) => m.slug === params.slug);
    return { service, image: meta?.image ?? null };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Sayfa bulunamadı" }, { name: "robots", content: "noindex" }],
      };
    }
    const { service } = loaderData;
    const description =
      service.description ||
      service.blocks.find((b) => b.t === "p")?.v.slice(0, 155) ||
      `${service.name} hizmeti hakkında detaylı bilgi.`;
    return {
      meta: [
        { title: service.title },
        { name: "description", content: description },
        { property: "og:title", content: service.title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/hizmetlerimiz/${params.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/hizmetlerimiz/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            serviceType: service.name,
            areaServed: "İstanbul",
            provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone },
          }),
        },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service, image } = Route.useLoaderData();
  const others = serviceMeta.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Header />
      <main>
        <section className="bg-soft">
          <div className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Hizmetlerimiz</p>
              <h1 className="text-3xl md:text-5xl">{service.name}</h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/teklif-formu" className="btn-yellow">
                  Ücretsiz Teklif Al
                </Link>
                <a href={site.phoneHref} className="btn-outline-dark">
                  {site.phone}
                </a>
              </div>
            </div>
            {image && (
              <div className="overflow-hidden rounded-4xl">
                <img src={image} alt={service.name} className="h-72 w-full object-cover md:h-96" />
              </div>
            )}
          </div>
        </section>

        <div className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_320px]">
          <article>
            <Blocks blocks={service.blocks} />
          </article>
          <aside className="h-fit rounded-4xl bg-pale p-7 lg:sticky lg:top-28">
            <h2 className="text-lg">Diğer Hizmetlerimiz</h2>
            <ul className="mt-4 space-y-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to="/hizmetlerimiz/$slug"
                    params={{ slug: o.slug }}
                    className="text-[0.98rem] transition-colors hover:text-primary"
                  >
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/teklif-formu" className="btn-green mt-6 w-full">
              Teklif Al
            </Link>
          </aside>
        </div>

        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
