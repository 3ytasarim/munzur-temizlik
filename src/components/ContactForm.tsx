import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitQuote } from "@/lib/quote.functions";
import { emptyQuote } from "@/lib/quote-types";
import { images } from "@/data/site";

export function ContactFormSection() {
  const send = useServerFn(submitQuote);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setState("error");
      setError("Lütfen ad soyad ve telefon bilgisi girin.");
      return;
    }
    setState("loading");
    setError("");
    const res = await send({
      data: {
        ...emptyQuote,
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.subject || "İletişim Formu",
        note: `Kaynak: İletişim sayfası formu\nKonu: ${form.subject || "-"}\nMesaj: ${form.message || "-"}`,
      },
    });
    if (res.ok) {
      setState("ok");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } else {
      setState("error");
      setError(res.error ?? "Mesaj gönderilemedi.");
    }
  }

  return (
    <section className="container-site pb-20 md:pb-28">
      <div className="grid gap-6 lg:grid-cols-2">
        <div
          className="rounded-[2rem] p-8 md:p-12"
          style={{ background: "linear-gradient(150deg, #F7E23A 0%, #F2F0AE 45%, #DCEFC0 100%)" }}
        >
          <p className="eyebrow flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.16em]">
            İletişim Formu
            <img src={images.leaf1} alt="" aria-hidden="true" className="h-3.5 w-auto" />
          </p>
          <h2 className="mt-3 text-3xl leading-tight md:text-[2.4rem]">Sorularınız için Bize Ulaşın</h2>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Adınız Soyadınız">
                <input className="cf-input" value={form.name} onChange={set("name")} />
              </Field>
              <Field label="Email Adresiniz">
                <input type="email" className="cf-input" value={form.email} onChange={set("email")} />
              </Field>
              <Field label="Telefon">
                <input className="cf-input" value={form.phone} onChange={set("phone")} />
              </Field>
              <Field label="Konu">
                <input className="cf-input" value={form.subject} onChange={set("subject")} />
              </Field>
            </div>
            <Field label="Size nasıl yardımcı olabiliriz?">
              <textarea rows={4} className="cf-input" value={form.message} onChange={set("message")} />
            </Field>

            {state === "error" && <p className="text-sm text-red-700">{error}</p>}
            {state === "ok" && (
              <p className="text-sm font-medium text-primary">
                Mesajınız iletildi. En kısa sürede size dönüş yapacağız.
              </p>
            )}

            <button type="submit" disabled={state === "loading"} className="btn-dark disabled:opacity-70">
              {state === "loading" ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>
        </div>

        <div className="min-h-[320px] overflow-hidden rounded-[2rem]">
          <img
            src={images.aboutTeam}
            alt="Munzur Temizlik ekibi ofis temizliği yaparken"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-foreground/80">{label}</span>
      {children}
    </label>
  );
}
