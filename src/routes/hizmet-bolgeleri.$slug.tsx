import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DetailPage } from "@/components/DetailTemplate";
import { getDistrict } from "@/data/content";
import { images, site } from "@/data/site";

export const Route = createFileRoute("/hizmet-bolgeleri/$slug")({
  loader: ({ params }) => {
    const district = getDistrict(params.slug);
    if (!district) throw notFound();
    return { district };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Sayfa bulunamadı" }, { name: "robots", content: "noindex" }],
      };
    }
    const { district } = loaderData;
    return {
      meta: [
        { title: district.title },
        { name: "description", content: district.description },
        { property: "og:title", content: district.title },
        { property: "og:description", content: district.description },
        { property: "og:url", content: `/hizmet-bolgeleri/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/hizmet-bolgeleri/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${district.name} Temizlik Hizmetleri`,
            areaServed: `${district.name}, İstanbul`,
            provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone },
          }),
        },
      ],
    };
  },
  component: DistrictDetail,
});

function DistrictDetail() {
  const { district } = Route.useLoaderData();

  return (
    <>
      <Header />
      <DistrictPage district={district} />
      <Footer />
    </>
  );
}

