import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { quoteServices, site } from "@/data/site";
import { provinces, getDistricts, getNeighborhoods } from "@/data/locations";
import { closeQuoteModal, useQuoteModalOpen } from "@/lib/quote-modal";

const extraServices = [
  "Buzdolabı ve derin dondurucu iç temizliği (boş veya dolu)",
  "Mutfak dolaplarının dış yüzey temizliği",
  "İç ve Dış cam temizliği",
  "Fırın içi temizliği (tekli & çiftli fırınlar)",
  "Balkon / teras temizliği",
  "Ütü hizmeti",
];

const counts = ["1", "2", "3", "4", "5", "6+"];
const frequencies = ["Tek seferlik", "Haftada bir", "İki haftada bir", "Ayda bir"];
const parkOptions = ["Site otoparkı", "Sokak / cadde", "Kapalı otopark", "Park yeri yok"];
const flexOptions = ["Evet, esneğim", "Hayır, belirttiğim tarih", "Kısmen esneğim"];
const entryOptions = ["Evde olacağım", "Kapıcıdan anahtar", "Komşudan anahtar", "Diğer"];

const stepMeta = [
  { title: "Rezervasyon", desc: "Hizmet ve ev detayları", icon: ClipboardList },
  { title: "İletişim", desc: "Size nasıl ulaşalım?", icon: Phone },
  { title: "Detaylar", desc: "Giriş, park ve notlar", icon: MapPin },
];

const labelCls =
  "mb-2 block font-display text-[0.78rem] font-medium uppercase tracking-[0.06em] text-foreground/55";
const fieldCls =
  "w-full rounded-2xl border border-border/70 bg-background px-4 py-3.5 text-[0.95rem] text-foreground shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none transition-all placeholder:text-foreground/35 focus:border-primary focus:ring-4 focus:ring-primary/12";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <Field label={label}>
      <div className="relative">
        <select
          className={`${fieldCls} appearance-none pr-10 disabled:cursor-not-allowed disabled:bg-muted/60 disabled:opacity-70`}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40">
          ▾
        </span>
      </div>
    </Field>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <input
        className={fieldCls}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

function PillGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <Field label={label}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(active ? "" : o)}
              className={`rounded-full border px-4 py-2 font-display text-[0.85rem] transition-all ${
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_6px_16px_-6px_var(--color-primary)]"
                  : "border-border/70 bg-background text-foreground/70 hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </Field>
  );
}

function Progress({ step }: { step: number }) {
  const meta = stepMeta[step - 1] ?? stepMeta[0]!;
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="font-display text-[0.78rem] uppercase tracking-[0.14em] text-foreground/45">
            Adım {step} / 3
          </p>
          <h3 className="mt-1 font-display text-lg font-medium">{meta.title}</h3>
        </div>
        <p className="hidden text-sm text-foreground/55 sm:block">{meta.desc}</p>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function QuoteWizard({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [f, setF] = useState({
    service: "",
    extras: [] as string[],
    rooms: "",
    livingRooms: "",
    bathrooms: "",
    frequency: "",
    size: "",
    date: "",
    time: "08:00",
    name: "",
    phone: "",
    email: "",
    address: "",
    province: "istanbul",
    district: "",
    neighborhood: "",
    park: "",
    flexible: "",
    entry: "",
    pets: "",
    note: "",
  });

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) =>
    setF((prev) => ({ ...prev, [k]: v }));

  const toggleExtra = (s: string) =>
    setF((prev) => ({
      ...prev,
      extras: prev.extras.includes(s)
        ? prev.extras.filter((x) => x !== s)
        : [...prev.extras, s],
    }));

  const districtOptions = useMemo(
    () => getDistricts(f.province).map((d) => ({ value: d.slug, label: d.name })),
    [f.province],
  );
  const neighborhoodOptions = useMemo(
    () => getNeighborhoods(f.province, f.district).map((n) => ({ value: n, label: n })),
    [f.province, f.district],
  );

  if (sent) {
    return (
      <div className="px-6 py-16 text-center md:px-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mt-5 font-display text-2xl">Talebiniz alındı</h2>
        <p className="mx-auto mt-2 max-w-md text-foreground/65">
          Ekibimiz en kısa sürede sizinle iletişime geçecek. Acil talepleriniz için{" "}
          <a href={site.phoneHref} className="font-medium text-primary">
            {site.phone}
          </a>
        </p>
        {onClose && (
          <button type="button" onClick={onClose} className="btn-green mt-8">
            Kapat
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      className="flex min-h-full flex-col lg:flex-row"
      onSubmit={async (e) => {
        e.preventDefault();
        if (sending) return;
        setError("");
        setSending(true);
        try {
          const res = await submitQuote({ data: f });
          if (res.ok) setSent(true);
          else setError(res.error);
        } catch {
          setError("Bağlantı hatası. Lütfen tekrar deneyin.");
        } finally {
          setSending(false);
        }
      }}
    >

      {/* Aside */}
      <aside className="relative shrink-0 overflow-hidden bg-primary px-7 py-8 text-primary-foreground lg:w-[300px] lg:px-8 lg:py-10">
        <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-primary-foreground/10" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-primary-foreground/10" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 font-display text-[0.72rem] uppercase tracking-[0.12em]">
            <Sparkles className="h-3.5 w-3.5" /> Ücretsiz
          </span>
          <h2 className="mt-4 font-display text-[1.6rem] leading-[1.15] lg:text-[1.75rem]">
            Teklifinizi alın, tarihinizi belirleyin
          </h2>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-primary-foreground/80">
            3 kısa adımda ihtiyacınızı anlatın, size özel fiyatı hazırlayalım.
          </p>

          <ol className="mt-8 hidden space-y-4 lg:block">
            {stepMeta.map((s, i) => {
              const n = i + 1;
              const active = step === n;
              const done = step > n;
              const Icon = s.icon;
              return (
                <li key={s.title} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      done || active
                        ? "bg-primary-foreground text-primary"
                        : "bg-primary-foreground/15 text-primary-foreground/70"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-4.5 w-4.5" /> : <Icon className="h-4.5 w-4.5" />}
                  </span>
                  <span>
                    <span
                      className={`block font-display text-[0.95rem] ${active ? "" : "text-primary-foreground/75"}`}
                    >
                      {s.title}
                    </span>
                    <span className="block text-[0.8rem] text-primary-foreground/60">{s.desc}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 hidden items-center gap-2 rounded-2xl bg-primary-foreground/10 p-3 text-[0.82rem] lg:flex">
            <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
            Bilgileriniz KVKK kapsamında güvende.
          </div>
        </div>
      </aside>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-border/60 px-5 py-5 md:px-8">
          <Progress step={step} />
        </div>

        <div className="flex-1 space-y-6 px-5 py-6 md:px-8">
          {step === 1 && (
            <>
              <Select
                label="Hizmetlerimiz"
                placeholder="Size en uygun hizmeti seçin"
                value={f.service}
                onChange={(v) => set("service", v)}
                options={quoteServices.map((s) => ({ value: s, label: s }))}
              />

              <Field label="Ekstra Ev İçi Hizmetlerimiz">
                <div className="flex flex-wrap gap-2">
                  {extraServices.map((s) => {
                    const active = f.extras.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleExtra(s)}
                        className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-left text-[0.85rem] transition-all ${
                          active
                            ? "border-primary bg-accent text-foreground"
                            : "border-border/70 bg-background text-foreground/70 hover:border-primary/50"
                        }`}
                      >
                        <span
                          className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                            active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                          }`}
                        >
                          {active && <CheckCircle2 className="h-3 w-3" />}
                        </span>
                        {s}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <PillGroup
                  label="Oda Sayısı"
                  value={f.rooms}
                  onChange={(v) => set("rooms", v)}
                  options={counts}
                />
                <PillGroup
                  label="Salon Sayısı"
                  value={f.livingRooms}
                  onChange={(v) => set("livingRooms", v)}
                  options={counts}
                />
                <PillGroup
                  label="Banyo"
                  value={f.bathrooms}
                  onChange={(v) => set("bathrooms", v)}
                  options={counts}
                />
                <PillGroup
                  label="Temizlik Sıklığı"
                  value={f.frequency}
                  onChange={(v) => set("frequency", v)}
                  options={frequencies}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <Input
                  label="Metrekare"
                  placeholder="Örn. 120"
                  value={f.size}
                  onChange={(v) => set("size", v)}
                />
                <Input label="Tarih" type="date" value={f.date} onChange={(v) => set("date", v)} />
                <Input
                  label="Saat"
                  type="time"
                  value={f.time}
                  onChange={(v) => set("time", v)}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Adınız Soyadınız"
                  placeholder="Ad Soyad"
                  value={f.name}
                  onChange={(v) => set("name", v)}
                />
                <Input
                  label="Telefon"
                  type="tel"
                  placeholder="05xx xxx xx xx"
                  value={f.phone}
                  onChange={(v) => set("phone", v)}
                />
                <Input
                  label="E-posta"
                  type="email"
                  placeholder="ornek@mail.com"
                  value={f.email}
                  onChange={(v) => set("email", v)}
                />
                <Input
                  label="Adres Bilgileri"
                  placeholder="Sokak, bina, daire"
                  value={f.address}
                  onChange={(v) => set("address", v)}
                />
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <Select
                  label="İl"
                  placeholder="İl Seçiniz"
                  value={f.province}
                  onChange={(v) => {
                    set("province", v);
                    set("district", "");
                    set("neighborhood", "");
                  }}
                  options={provinces.map((p) => ({ value: p.slug, label: p.name }))}
                />
                <Select
                  label="İlçe"
                  placeholder="İlçe Seçiniz"
                  value={f.district}
                  disabled={!f.province}
                  onChange={(v) => {
                    set("district", v);
                    set("neighborhood", "");
                  }}
                  options={districtOptions}
                />
                <Select
                  label="Mahalle"
                  placeholder="Mahalle Seçiniz"
                  value={f.neighborhood}
                  disabled={!f.district}
                  onChange={(v) => set("neighborhood", v)}
                  options={neighborhoodOptions}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <Select
                  label="Temizlik Ekibi Nerede Park Edebilir?"
                  placeholder="Lütfen Seçin"
                  value={f.park}
                  onChange={(v) => set("park", v)}
                  options={parkOptions.map((o) => ({ value: o, label: o }))}
                />
                <Select
                  label="Tarih ve saat konusunda esnek misiniz?"
                  placeholder="Lütfen Seçin"
                  value={f.flexible}
                  onChange={(v) => set("flexible", v)}
                  options={flexOptions.map((o) => ({ value: o, label: o }))}
                />
                <Select
                  label="Temizlik ekibi eve nasıl girecek?"
                  placeholder="Lütfen Seçin"
                  value={f.entry}
                  onChange={(v) => set("entry", v)}
                  options={entryOptions.map((o) => ({ value: o, label: o }))}
                />
                <Input
                  label="Evcil hayvanınız var mı?"
                  placeholder="Örn. 1 kedi"
                  value={f.pets}
                  onChange={(v) => set("pets", v)}
                />
              </div>
              <Field label="Ek bilgi">
                <textarea
                  rows={4}
                  placeholder="Eklemek istedikleriniz..."
                  className={fieldCls}
                  value={f.note}
                  onChange={(e) => set("note", e.target.value)}
                />
              </Field>
              <div className="flex items-start gap-2 rounded-2xl bg-accent/60 p-4 text-[0.85rem] text-foreground/70">
                <CalendarDays className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                Formu gönderdikten sonra ekibimiz uygun tarihleri teyit etmek için sizi arayacak.
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-border/60 bg-background/95 px-5 py-4 backdrop-blur md:px-8">
          {step > 1 ? (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-display text-[0.9rem] text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft className="h-4 w-4" /> Geri
            </button>
          ) : (
            <span className="hidden text-[0.82rem] text-foreground/50 sm:block">
              Ortalama süre: 1 dakika
            </span>
          )}
          {step < 3 ? (
            <button type="button" className="btn-green" onClick={() => setStep(step + 1)}>
              Devam <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="submit" className="btn-yellow">
              Formu Gönder <Send className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export function QuoteModal() {
  const open = useQuoteModalOpen();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeQuoteModal();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-foreground/50 p-0 backdrop-blur-sm sm:p-6"
      onClick={closeQuoteModal}
      role="dialog"
      aria-modal="true"
      aria-label="Ücretsiz teklif formu"
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden bg-background shadow-[0_30px_80px_-20px_rgba(16,24,40,0.45)] sm:my-4 sm:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeQuoteModal}
          aria-label="Kapat"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <X className="h-4.5 w-4.5" />
        </button>
        <QuoteWizard onClose={closeQuoteModal} />
      </div>
    </div>
  );
}
