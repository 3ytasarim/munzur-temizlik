import type { QuoteSubmission } from "./quote-types";
import { buildQuotePdf, quotePdfFileName } from "./quote-pdf.server";

const BRAND_GREEN = "#3CA200";
const BRAND_YELLOW = "#F2D701";

function esc(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Row = { label: string; value: string };

function section(title: string, rows: Row[]) {
  const body = rows
    .filter((r) => r.value && r.value.trim() !== "")
    .map(
      (r, i) => `
      <tr style="background:${i % 2 === 0 ? "#ffffff" : "#F7FAF3"};">
        <td style="padding:11px 16px;border-bottom:1px solid #E6EBE0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#5B6656;width:42%;">${esc(r.label)}</td>
        <td style="padding:11px 16px;border-bottom:1px solid #E6EBE0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#16240F;font-weight:bold;">${esc(r.value).replace(/\n/g, "<br/>")}</td>
      </tr>`,
    )
    .join("");
  if (!body) return "";
  return `
  <tr><td style="padding:22px 24px 0 24px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${BRAND_GREEN};font-weight:bold;padding-bottom:8px;">${esc(title)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E6EBE0;border-radius:10px;border-collapse:separate;overflow:hidden;">
      ${body}
    </table>
  </td></tr>`;
}

function formatTrDate(v: string) {
  // Form date input gives YYYY-MM-DD; convert to TR format DD.MM.YYYY
  const [y, m, d] = v.split("-");
  if (y && m && d) return `${d}.${m}.${y}`;
  return v;
}

function formatTrDateTime(date: Date) {
  const s = new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  return s;
}

export function buildQuoteEmail(d: QuoteSubmission) {
  const now = formatTrDateTime(new Date());

  const html = `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:24px 12px;background:#F4F6F0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 28px rgba(16,24,40,.08);">
      <tr><td style="background:${BRAND_GREEN};padding:26px 24px;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:#ffffff;">Munzur Temizlik</div>
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#EAF7DC;padding-top:4px;">Yeni Teklif Talebi &middot; ${esc(now)}</div>
        <div style="height:4px;width:64px;background:${BRAND_YELLOW};margin-top:14px;border-radius:4px;"></div>
      </td></tr>

      ${section("Müşteri Bilgileri", [
        { label: "Ad Soyad", value: d.name },
        { label: "Telefon", value: d.phone },
        { label: "E-posta", value: d.email },
        { label: "Adres", value: d.address },
        { label: "İl / İlçe / Mahalle", value: [d.province, d.district, d.neighborhood].filter(Boolean).join(" / ") },
      ])}

      ${section("Hizmet Detayları", [
        { label: "Hizmet", value: d.service },
        { label: "Ekstra Hizmetler", value: d.extras.join("\n") },
        { label: "Oda Sayısı", value: d.rooms },
        { label: "Salon Sayısı", value: d.livingRooms },
        { label: "Banyo Sayısı", value: d.bathrooms },
        { label: "Temizlik Sıklığı", value: d.frequency },
        { label: "Metrekare", value: d.size ? `${d.size} m²` : "" },
        { label: "Tarih", value: d.date ? formatTrDate(d.date) : "" },
        { label: "Saat", value: d.time },
      ])}

      ${section("Ek Bilgiler", [
        { label: "Park Yeri", value: d.park },
        { label: "Tarih/Saat Esnekliği", value: d.flexible },
        { label: "Eve Giriş", value: d.entry },
        { label: "Evcil Hayvan", value: d.pets },
        { label: "Not", value: d.note },
      ])}

      <tr><td style="padding:24px;">
        <div style="background:#E8F5D3;border-radius:12px;padding:16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#2F4420;">
          Bu talep munzurtemizlik.com teklif formu üzerinden gönderilmiştir.
        </div>
      </td></tr>
      <tr><td style="background:#16240F;padding:16px 24px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#B9C7AC;">
        Munzur Temizlik &middot; İstanbul Profesyonel Temizlik Hizmeti
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  const text = [
    `Yeni Teklif Talebi - ${now}`,
    `Ad Soyad: ${d.name}`,
    `Telefon: ${d.phone}`,
    `E-posta: ${d.email}`,
    `Adres: ${d.address}`,
    `Konum: ${[d.province, d.district, d.neighborhood].filter(Boolean).join(" / ")}`,
    `Hizmet: ${d.service}`,
    `Ekstralar: ${d.extras.join(", ")}`,
    `Oda/Salon/Banyo: ${d.rooms} / ${d.livingRooms} / ${d.bathrooms}`,
    `Sıklık: ${d.frequency}`,
    `Metrekare: ${d.size}`,
    `Tarih/Saat: ${d.date ? formatTrDate(d.date) : ""} ${d.time}`,
    `Park: ${d.park}`,
    `Esneklik: ${d.flexible}`,
    `Giriş: ${d.entry}`,
    `Evcil hayvan: ${d.pets}`,
    `Not: ${d.note}`,
  ].join("\n");

  const subject = `Yeni Teklif Talebi — ${d.name || "İsimsiz"}${d.service ? ` (${d.service})` : ""}`;

  return { subject, html, text };
}

export async function sendQuoteMail(d: QuoteSubmission) {
  const user = process.env["GMAIL_USER"];
  const pass = process.env["GMAIL_APP_PASSWORD"];
  const to = process.env["QUOTE_MAIL_TO"] || user;
  if (!user || !pass) throw new Error("Mail ayarları eksik (GMAIL_USER / GMAIL_APP_PASSWORD).");

  const { subject, html, text } = buildQuoteEmail(d);
  const pdfBytes = await buildQuotePdf(d);
  const nodemailer = (await import("nodemailer")).default;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user, pass: pass.replace(/\s+/g, "") },
  });

  await transporter.sendMail({
    from: `"Munzur Temizlik" <${user}>`,
    to,
    replyTo: d.email || undefined,
    subject,
    text,
    html,
    attachments: [
      {
        filename: quotePdfFileName(d),
        content: Buffer.from(pdfBytes),
        contentType: "application/pdf",
      },
    ],
  });
}
