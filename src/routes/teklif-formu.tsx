import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/Sections";
import { quoteServices, site } from "@/data/site";

export const Route = createFileRoute("/teklif-formu")({
  head: () => ({
    meta: [
      { title: `Teklif Formu - ${site.titleSuffix}` },
      {
        name: "description",
        content:
          "Munzur Temizlik teklif formunu doldurun, ev veya ofis temizliğiniz için ücretsiz ve hızlı fiyat teklifi alın.",
      },
      { property: "og:title", content: `Teklif Formu - ${site.titleSuffix}` },
      {
        property: "og:description",
        content: "Ücretsiz temizlik teklifi almak için formu doldurun.",
      },
      { property: "og:url", content: "/teklif-formu" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/teklif-formu" }],
  }),
  component: QuotePage,
});

function QuotePage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Ücretsiz Teklif"
          title="Teklif Formu"
          text="Aşağıdaki formu doldurun; ekibimiz en kısa sürede size özel fiyat teklifi ile dönüş yapsın."
        />

        <section className="container-site py-16 md:py-24">
          <div className="mx-auto max-w-3xl rounded-4xl border border-border p-6 md:p-10">
            {sent ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
                <h2 className="mt-4 text-2xl">Talebiniz alındı</h2>
                <p className="mt-2">
                  En kısa sürede sizinle iletişime geçeceğiz. Acil talepleriniz için{" "}
                  <a href={site.phoneHref} className="font-medium text-primary">
                    {site.phone}
                  </a>
                </p>
              </div>
            ) : (
              <form
                className="grid gap-5 md:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <Field label="Ad Soyad" name="name" required />
                <Field label="Telefon" name="phone" type="tel" required />
                <Field label="E-posta" name="email" type="email" />
                <Field label="İlçe" name="district" />
                <div className="md:col-span-2">
                  <label
                    htmlFor="service"
                    className="mb-2 block font-display text-sm font-medium text-foreground"
                  >
                    Hizmet Türü
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
                  >
                    {quoteServices.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <Field label="Metrekare" name="size" />
                <Field label="Tercih Edilen Tarih" name="date" type="date" />
                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="mb-2 block font-display text-sm font-medium text-foreground"
                  >
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="btn-green w-full md:w-auto">
                    Teklif İste
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-display text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
      />
    </div>
  );
}
