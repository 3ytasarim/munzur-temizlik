import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Blocks } from "@/components/Blocks";
import { CtaBand } from "@/components/Sections";
import { getPost, posts } from "@/data/content";
import { postImages, site } from "@/data/site";

/** Blog arşivindeki sıra (ilgili yazılar bu sıraya göre gelir) */
const order = [
  "derinlemesine-temizlik-ve-duzenleme-evinize-yeni-bir-nefes",
  "doga-dostu-temizlik-urunleri-ile-temizlige-yeni-bir-bakis-sagliginizi-ve-gelecegimizi-koruyan-cevreci-secimler",
  "tasinmadan-once-ev-temizligi-hizmetleri-yeni-evinize-tertemiz-bir-baslangic-yapin",
  "eksizsiz-daire-temizligi-rehberi-piril-piril-bir-yasam-alani-icin-adim-adim-kilavuz",
  "kotu-kokan-koltuk-nasil-temizlenir-etkili-ve-kalici-cozumler",
  "bir-daireyi-derinlemesine-temizlemek-ne-kadar-surer",
  "doga-dostu-hali-temizligi-en-kapsamli-rehber",
  "temiz-ve-saglikli-bir-evin-faydalari-nelerdir",
];

const sorted = [...posts].sort(
  (a, b) =>
    (order.indexOf(a.slug) === -1 ? 99 : order.indexOf(a.slug)) -
    (order.indexOf(b.slug) === -1 ? 99 : order.indexOf(b.slug)),
);

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, image: postImages[params.slug] ?? null };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Sayfa bulunamadı" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    const description =
      post.description ||
      (post.blocks.find((b) => b.t === "p")?.v ?? "").replace(/<[^>]+>/g, "").slice(0, 155) ||
      post.title;
    return {
      meta: [
        { title: post.metaTitle || `${post.title} | ${site.name}` },
        { name: "description", content: description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/${params.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name },
          }),
        },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post, image } = Route.useLoaderData();
  const [openComments, setOpenComments] = useState(false);

  /** İlk iki blok kategori etiketi ve H1; başlık ayrıca render edildiği için atlanır */
  const body = post.blocks.filter((b, i) => !(i === 0 && b.t === "ul") && b.t !== "h1");

  const idx = sorted.findIndex((p) => p.slug === post.slug);
  const related = [...sorted.slice(idx + 1), ...sorted.slice(0, Math.max(idx, 0))]
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Başlık */}
        <section className="container-site">
          <div className="mx-auto max-w-4xl px-1 pb-8 pt-10 text-center md:pb-12 md:pt-16">
            <p className="eyebrow">{post.category}</p>
            <h1 className="mt-4 text-[1.75rem] leading-tight md:text-[2.75rem] md:leading-[1.2]">
              {post.title}
            </h1>
          </div>
        </section>

        {/* Öne çıkan görsel */}
        {image && (
          <section className="container-site">
            <img
              src={image}
              alt={post.title}
              className="h-56 w-full rounded-[1.5rem] object-cover sm:h-80 md:h-[520px] md:rounded-[2rem]"
            />
          </section>
        )}

        {/* İçerik */}
        <section className="container-site">
          <article className="mx-auto max-w-[920px] py-12 md:py-16">
            <Blocks blocks={body} />
          </article>
        </section>

        {/* Yorumlar açılır bölümü */}
        <section className="container-site pb-14 md:pb-20">
          <div className="mx-auto max-w-[920px]">
            <h2 className="text-center text-xl md:text-2xl">✍️ Siz Ne Düşünüyorsunuz?</h2>
            <div className="mx-auto mt-6 h-px w-full max-w-[920px] bg-border" />
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <button
                type="button"
                onClick={() => setOpenComments((v) => !v)}
                aria-expanded={openComments}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-medium md:px-7 md:py-5"
              >
                Yorumları Gör / Yorum Yap
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pale text-primary">
                  {openComments ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              {openComments && (
                <div className="border-t border-border px-5 py-6 text-foreground/75 md:px-7">
                  <p>
                    Bu yazı hakkında görüşlerinizi bizimle paylaşmak ister misiniz? Bize{" "}
                    <a href={site.phoneHref} className="text-primary underline">
                      {site.phone}
                    </a>{" "}
                    numarasından ya da{" "}
                    <Link to="/iletisim" className="text-primary underline">
                      iletişim sayfamızdan
                    </Link>{" "}
                    ulaşabilirsiniz.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* İlgili yazılar */}
        <section className="container-site pb-14 md:pb-20">
          <h2 className="text-center text-2xl md:text-[2.1rem]">
            Temizlik Uzmanlarından Daha Fazla Püf Noktası
          </h2>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <article key={p.slug}>
                {postImages[p.slug] && (
                  <Link
                    to="/$slug"
                    params={{ slug: p.slug }}
                    className="block overflow-hidden rounded-[1.5rem]"
                  >
                    <img
                      src={postImages[p.slug]}
                      alt={p.title}
                      loading="lazy"
                      className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>
                )}
                <span className="eyebrow mt-5 block">{p.category}</span>
                <h3 className="mt-2 text-lg leading-snug md:text-[1.3rem]">
                  <Link to="/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                    {p.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
