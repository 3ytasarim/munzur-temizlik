import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
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

const labelCls = "mb-2 block font-display text-[0.85rem] font-medium text-foreground/80";
const fieldCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-primary";

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
    <div>
      <label className={labelCls}>{label}</label>
      <select
        className={`${fieldCls} disabled:opacity-60`}
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
    </div>
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
    <div>
      <label className={labelCls}>{label}</label>
      <input
        className={fieldCls}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Steps({ step }: { step: number }) {
  return (
    <div className="my-7 flex items-center">
      {[1, 2, 3].map((n) => (
        <div key={n} className={n === 1 ? "flex items-center" : "flex flex-1 items-center"}>
          {n > 1 && (
            <span
              className={`h-[3px] flex-1 rounded-full ${step >= n ? "bg-[#2f8f00]" : "bg-white/70"}`}
            />
          )}
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${
              step >= n ? "bg-[#2f8f00] text-white" : "bg-white text-foreground/50"
            }`}
          >
            {n}
          </span>
        </div>
      ))}
    </div>
  );
}

const plain = (v: string) => v;

export function QuoteWizard({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
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

  const districtOptions = useMemo(
    () => getDistricts(f.province).map((d) => ({ value: d.slug, label: d.name })),
    [f.province],
  );
  const neighborhoodOptions = useMemo(
    () =>
      getNeighborhoods(f.province, f.district).map((n) => ({ value: n, label: n })),
    [f.province, f.district],
  );

  if (sent) {
    return (
      <div className="px-6 py-14 text-center md:px-12">
        <CheckCircle2 className="mx-auto h-14 w-14 text-[#2f8f00]" />
        <h2 className="mt-4 font-display text-2xl">Talebiniz alındı</h2>
        <p className="mt-2 text-foreground/70">
          En kısa sürede sizinle iletişime geçeceğiz. Acil talepleriniz için{" "}
          <a href={site.phoneHref} className="font-medium text-[#2f8f00]">
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
      className="px-5 py-8 md:px-10 md:py-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h2 className="font-display text-[1.5rem] leading-tight md:text-[2rem]">
        Ücretsiz Teklif Alın ve Temizlik Tarihinizi Belirleyin
      </h2>
      <Steps step={step} />

      {step === 1 && (
        <div className="space-y-5">
          <h3 className="font-display text-lg font-medium">Rezervasyon Bilgileriniz</h3>
          <div className="grid gap-5 md:grid-cols-2">
            <Select
              label="Hizmetlerimiz"
              placeholder="Size en uygun hizmeti seçin"
              value={f.service}
              onChange={(v) => set("service", v)}
              options={quoteServices.map((s) => ({ value: s, label: s }))}
            />
            <div>
              <label className={labelCls}>Ekstra Ev İçi Hizmetlerimiz</label>
              <select
                multiple
                size={5}
                className={`${fieldCls} px-3 py-2`}
                value={f.extras}
                onChange={(e) =>
                  set(
                    "extras",
                    Array.from(e.target.selectedOptions).map((o) => plain(o.value)),
                  )
                }
              >
                {extraServices.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Select
              label="Oda Sayısı"
              placeholder="Lütfen Seçiniz"
              value={f.rooms}
              onChange={(v) => set("rooms", v)}
              options={counts.map((c) => ({ value: c, label: c }))}
            />
            <Select
              label="Salon Sayısı"
              placeholder="Lütfen Seçiniz"
              value={f.livingRooms}
              onChange={(v) => set("livingRooms", v)}
              options={counts.map((c) => ({ value: c, label: c }))}
            />
            <Select
              label="Banyo"
              placeholder="Lütfen Seçiniz"
              value={f.bathrooms}
              onChange={(v) => set("bathrooms", v)}
              options={counts.map((c) => ({ value: c, label: c }))}
            />
            <Select
              label="Temizlik Sıklığı"
              placeholder="Seçiniz"
              value={f.frequency}
              onChange={(v) => set("frequency", v)}
              options={frequencies.map((c) => ({ value: c, label: c }))}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Input label="Metrekare" value={f.size} onChange={(v) => set("size", v)} />
            <Input
              label="Tarih"
              type="date"
              value={f.date}
              onChange={(v) => set("date", v)}
            />
            <Input
              label="Zaman Seçiniz"
              type="time"
              value={f.time}
              onChange={(v) => set("time", v)}
            />
          </div>
          <div className="pt-2">
            <button type="button" className="btn-yellow" onClick={() => setStep(2)}>
              Devam
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <h3 className="font-display text-lg font-medium">İletişim Bilgileriniz</h3>
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Adınız Soyadınız"
              value={f.name}
              onChange={(v) => set("name", v)}
            />
            <Input label="Telefon" type="tel" value={f.phone} onChange={(v) => set("phone", v)} />
            <Input
              label="Email adresi"
              type="email"
              value={f.email}
              onChange={(v) => set("email", v)}
            />
            <Input
              label="Adres Bilgileri"
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
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" className="btn-outline-dark" onClick={() => setStep(1)}>
              Geri Dön
            </button>
            <button type="button" className="btn-yellow" onClick={() => setStep(3)}>
              Devam
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
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
              value={f.pets}
              onChange={(v) => set("pets", v)}
            />
          </div>
          <div>
            <label className={labelCls}>Ek bilgi</label>
            <textarea
              rows={4}
              placeholder="Buraya yazınız..."
              className={fieldCls}
              value={f.note}
              onChange={(e) => set("note", e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" className="btn-outline-dark" onClick={() => setStep(2)}>
              Geri Dön
            </button>
            <button type="submit" className="btn-yellow">
              Formu Gönder
            </button>
          </div>
        </div>
      )}
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
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 p-3 sm:p-6"
      onClick={closeQuoteModal}
      role="dialog"
      aria-modal="true"
      aria-label="Ücretsiz teklif formu"
    >
      <div
        className="relative my-4 w-full max-w-3xl rounded-3xl bg-pale shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeQuoteModal}
          aria-label="Kapat"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
        >
          <X className="h-5 w-5" />
        </button>
        <QuoteWizard onClose={closeQuoteModal} />
      </div>
    </div>
  );
}
