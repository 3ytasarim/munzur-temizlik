import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DetailPage } from "@/components/DetailTemplate";
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
      service.blocks.find((b) => b.t === "p")?.v?.slice(0, 155) ||
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

  return (
    <>
      <Header />
      <DetailPage
        eyebrow="Hizmetlerimiz"
        title={service.name}
        subtitle={service.subtitle}
        blocks={service.blocks}
        image={image ?? undefined}
        hasForm
      />
      <Footer />
    </>
  );
}
