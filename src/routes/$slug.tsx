import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Blocks } from "@/components/Blocks";
import { CtaBand } from "@/components/Sections";
import { getPost, posts } from "@/data/content";
import { postImages, site } from "@/data/site";

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
      post.description || post.blocks.find((b) => b.t === "p")?.v.slice(0, 155) || post.title;
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
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <section className="bg-soft">
          <div className="container-site max-w-3xl py-14 text-center md:py-20">
            <p className="eyebrow mb-3">{post.category}</p>
            <h1 className="text-3xl leading-tight md:text-4xl">{post.title}</h1>
          </div>
        </section>

        {image && (
          <div className="container-site -mt-6 md:-mt-10">
            <img
              src={image}
              alt={post.title}
              className="h-64 w-full rounded-4xl object-cover md:h-[420px]"
            />
          </div>
        )}

        <article className="container-site max-w-3xl py-14 md:py-16">
          <Blocks blocks={post.blocks} />
        </article>

        <section className="container-site pb-8">
          <h2 className="mb-6 text-2xl">Diğer Yazılar</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/$slug"
                params={{ slug: p.slug }}
                className="rounded-3xl border border-border p-6 transition-colors hover:border-primary"
              >
                <h3 className="text-base leading-snug">{p.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
