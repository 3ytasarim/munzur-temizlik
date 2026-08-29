import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { submitQuote } from "@/lib/quote.functions";
import { images, quoteServices, site, testimonials } from "@/data/site";
import { openQuoteModal } from "@/lib/quote-modal";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-soft">
      <img
        src={images.leafs}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 h-full opacity-40"
      />
      <div className="container-site relative grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2">
        <div>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-3xl leading-tight md:text-5xl">{title}</h1>
          {text && <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed">{text}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={openQuoteModal} className="btn-yellow">
              Ücretsiz Teklif Al
            </button>
            <a href={site.phoneHref} className="btn-outline-dark">
              {site.phone}
            </a>
          </div>
        </div>
        {image && (
          <div className="overflow-hidden rounded-4xl">
            <img src={image} alt={title} className="h-72 w-full object-cover md:h-96" />
          </div>
        )}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="container-site py-16 md:py-24">
      <div className="grid overflow-hidden rounded-4xl bg-pale lg:grid-cols-2">
        <div className="p-8 md:p-14">
          <p className="eyebrow mb-3">Hemen Başlayın</p>
          <h2 className="text-2xl md:text-4xl">
            Tertemiz bir yaşam alanı bir tık uzağınızda
          </h2>
          <p className="mt-4 max-w-lg text-[1.02rem] leading-relaxed">
            İhtiyacınızı bize iletin, size özel temizlik planınızı ve fiyatınızı hemen hazırlayalım.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={openQuoteModal} className="btn-green">
              Teklif Formu
            </button>
            <a href={site.whatsapp} className="btn-outline-dark" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="min-h-64">
          <img
            src={images.ctaImg}
            alt="Profesyonel temizlik ekibi"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="container-site">
        <p className="eyebrow mb-3 text-center">Müşteri Yorumları</p>
        <h2 className="mx-auto max-w-2xl text-center text-2xl md:text-4xl">
          Müşterilerimiz Bizim Hakkımızda Ne Diyor?
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-4xl bg-background p-8">
              <blockquote className="text-[1.02rem] leading-relaxed">“{t.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <span>
                  <span className="block font-display font-medium text-foreground">{t.name}</span>
                  <span className="block text-sm">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}


export function QuoteSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const result = await postQuote({
      name: String(fd.get("hq-name") ?? ""),
      email: String(fd.get("hq-email") ?? ""),
      phone: String(fd.get("hq-phone") ?? ""),
      size: String(fd.get("hq-size") ?? ""),
      service: String(fd.get("hq-service") ?? ""),
      note: "Kaynak: Anasayfa hızlı teklif formu",
    });
    setSending(false);
    if (result.ok) setSent(true);
    else setError(result.error ?? "Bir hata oluştu. Lütfen tekrar deneyin.");
  }


  return (
    <section className="container-site py-14 md:py-20">
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* Form card */}
        <div
          className="rounded-[2.5rem] p-8 md:p-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(242,215,1,0.95) 0%, rgba(232,245,211,0.95) 60%, rgba(232,245,211,0.95) 100%)",
          }}
        >
          <p className="eyebrow mb-3 text-[0.75rem]">Ücretsiz Fiyat Teklifi Alın</p>
          <h2 className="max-w-md text-2xl leading-snug md:text-3xl">
            Temizlik hizmetiniz için hemen fiyat alın, süreci başlatın.
          </h2>

          {sent ? (
            <div className="mt-8 rounded-3xl bg-white/80 p-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl">Talebiniz alındı</h3>
              <p className="mt-2 text-sm">
                En kısa sürede sizinle iletişime geçeceğiz.
              </p>
            </div>
          ) : (
            <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
              <QuoteField label="Adınız Soyadınız" name="hq-name" required />
              <QuoteField label="Email Adresiniz" name="hq-email" type="email" />
              <QuoteField label="Telefon" name="hq-phone" type="tel" required />
              <QuoteField label="Toplam metrekare" name="hq-size" />
              <div className="md:col-span-2">
                <label
                  htmlFor="hq-service"
                  className="mb-2 block font-display text-sm font-medium text-foreground"
                >
                  Bir hizmet seçin
                </label>
                <select
                  id="hq-service"
                  name="hq-service"
                  defaultValue=""
                  className="w-full rounded-2xl border-0 bg-white px-4 py-3 font-display text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>
                    Seç
                  </option>
                  {quoteServices.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 flex items-start gap-3">
                <input
                  id="hq-kvkk"
                  name="hq-kvkk"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-0 text-primary focus:ring-primary"
                />
                <label htmlFor="hq-kvkk" className="text-xs leading-relaxed text-foreground/80">
                  Bu formu göndererek, kişisel verilerinizin Genel Veri Koruma Yönetmeliği ve
                  Gizlilik Politikamıza uygun olarak işlenmesini kabul etmiş olursunuz.
                </label>
              </div>
              {error && (
                <div className="md:col-span-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 font-display text-sm font-medium text-white transition-colors hover:bg-foreground/90 disabled:opacity-60"
                >
                  {sending ? "Gönderiliyor…" : "Formu Gönder"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Image + satisfaction card */}
        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-soft">
            <img
              src={images.aboutTeam}
              alt="Profesyonel temizlik ekibi"
              loading="lazy"
              className="h-80 w-full object-cover md:h-[420px]"
            />
          </div>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-soft p-8 md:p-10">
            <img
              src={images.leaf1}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 -right-4 w-32 opacity-80 sm:-bottom-6 sm:-right-6 sm:w-40"
            />
            <div className="relative flex flex-col items-start gap-4 sm:flex-row">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-lg">%100 Memnuniyet Odaklı Hizmet</h3>
                <p className="mt-2 text-sm leading-relaxed">
                  Sizin memnuniyetiniz bizim için en büyük önceliktir.{" "}
                  <strong className="text-foreground">Munzur Temizlik</strong> olarak tüm
                  hizmetlerimizde yüksek kalite ve müşteri mutluluğu için titizlikle çalışıyoruz.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function QuoteField({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-display text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border-0 bg-white px-4 py-3 font-display text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
