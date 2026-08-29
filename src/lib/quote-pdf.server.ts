import type { QuoteSubmission } from "./quote-types";
import { FONT_REGULAR_B64, FONT_BOLD_B64, LOGO_B64 } from "./pdf-assets.server";

function b64ToBytes(b64: string) {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

type Row = { label: string; value: string };
type Section = { title: string; rows: Row[] };

function formatTrDate(v: string) {
  const [y, m, d] = v.split("-");
  if (y && m && d) return `${d}.${m}.${y}`;
  return v;
}

function formatTrDateTime(date: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function quoteSections(d: QuoteSubmission): Section[] {
  return [
    {
      title: "MÜŞTERİ BİLGİLERİ",
      rows: [
        { label: "Ad Soyad", value: d.name },
        { label: "Telefon", value: d.phone },
        { label: "E-posta", value: d.email },
        { label: "Adres", value: d.address },
        {
          label: "İl / İlçe / Mahalle",
          value: [d.province, d.district, d.neighborhood].filter(Boolean).join(" / "),
        },
      ],
    },
    {
      title: "HİZMET DETAYLARI",
      rows: [
        { label: "Hizmet", value: d.service },
        { label: "Ekstra Hizmetler", value: d.extras.join(", ") },
        { label: "Oda Sayısı", value: d.rooms },
        { label: "Salon Sayısı", value: d.livingRooms },
        { label: "Banyo Sayısı", value: d.bathrooms },
        { label: "Temizlik Sıklığı", value: d.frequency },
        { label: "Metrekare", value: d.size ? `${d.size} m²` : "" },
        { label: "Tarih", value: d.date ? formatTrDate(d.date) : "" },
        { label: "Saat", value: d.time },
      ],
    },
    {
      title: "EK BİLGİLER",
      rows: [
        { label: "Park Yeri", value: d.park },
        { label: "Tarih/Saat Esnekliği", value: d.flexible },
        { label: "Eve Giriş", value: d.entry },
        { label: "Evcil Hayvan", value: d.pets },
        { label: "Not", value: d.note },
      ],
    },
  ];
}

export async function buildQuotePdf(d: QuoteSubmission): Promise<Uint8Array> {
  const { PDFDocument, rgb } = await import("pdf-lib");
  const fontkit = (await import("@pdf-lib/fontkit")).default;

  const green = rgb(0.235, 0.635, 0.0);
  const dark = rgb(0.086, 0.141, 0.059);
  const muted = rgb(0.357, 0.4, 0.337);
  const line = rgb(0.902, 0.922, 0.878);
  const zebra = rgb(0.969, 0.98, 0.953);
  const yellow = rgb(0.949, 0.843, 0.004);

  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const regular = await pdf.embedFont(b64ToBytes(FONT_REGULAR_B64), { subset: false });
  const bold = await pdf.embedFont(b64ToBytes(FONT_BOLD_B64), { subset: false });
  const logo = await pdf.embedPng(b64ToBytes(LOGO_B64));

  pdf.setTitle("Munzur Temizlik - Teklif Talebi");
  pdf.setAuthor("Munzur Temizlik");
  pdf.setSubject("Teklif Talep Formu");

  const W = 595.28;
  const H = 841.89;
  const M = 44;
  const contentW = W - M * 2;

  let page = pdf.addPage([W, H]);
  let y = H;

  const drawHeader = () => {
    page.drawRectangle({ x: 0, y: H - 104, width: W, height: 104, color: green });
    const logoW = 132;
    const logoH = (logo.height / logo.width) * logoW;
    page.drawRectangle({
      x: M,
      y: H - 52 - logoH / 2 - 10,
      width: logoW + 20,
      height: logoH + 20,
      color: rgb(1, 1, 1),
      opacity: 0.95,
    });
    page.drawImage(logo, { x: M + 10, y: H - 52 - logoH / 2, width: logoW, height: logoH });
    page.drawText("TEKLİF TALEP FORMU", {
      x: W - M - bold.widthOfTextAtSize("TEKLİF TALEP FORMU", 15),
      y: H - 52,
      size: 15,
      font: bold,
      color: rgb(1, 1, 1),
    });
    const sub = `Oluşturma: ${formatTrDateTime(new Date())}`;
    page.drawText(sub, {
      x: W - M - regular.widthOfTextAtSize(sub, 9.5),
      y: H - 68,
      size: 9.5,
      font: regular,
      color: rgb(0.92, 0.97, 0.86),
    });
    page.drawRectangle({ x: 0, y: H - 108, width: W, height: 4, color: yellow });
    y = H - 140;
  };

  const drawFooter = () => {
    page.drawRectangle({ x: 0, y: 0, width: W, height: 40, color: dark });
    page.drawText("Munzur Temizlik · İstanbul Profesyonel Temizlik Hizmeti · munzurtemizlik.com", {
      x: M,
      y: 16,
      size: 8.5,
      font: regular,
      color: rgb(0.73, 0.78, 0.67),
    });
  };

  drawHeader();
  drawFooter();

  const ensureSpace = (needed: number) => {
    if (y - needed < 64) {
      page = pdf.addPage([W, H]);
      drawHeader();
      drawFooter();
    }
  };

  const wrap = (text: string, size: number, maxW: number) => {
    const out: string[] = [];
    for (const paragraph of text.split("\n")) {
      let current = "";
      for (const word of paragraph.split(/\s+/)) {
        const candidate = current ? `${current} ${word}` : word;
        if (regular.widthOfTextAtSize(candidate, size) > maxW && current) {
          out.push(current);
          current = word;
        } else {
          current = candidate;
        }
      }
      out.push(current);
    }
    return out;
  };

  for (const sec of quoteSections(d)) {
    const rows = sec.rows.filter((r) => r.value && r.value.trim() !== "");
    if (!rows.length) continue;

    ensureSpace(70);
    page.drawText(sec.title, { x: M, y, size: 10, font: bold, color: green });
    y -= 8;
    page.drawRectangle({ x: M, y: y - 4, width: 42, height: 2.5, color: yellow });
    y -= 20;

    let index = 0;
    for (const r of rows) {
      const valueLines = wrap(r.value, 10.5, contentW * 0.56 - 24);
      const rowH = Math.max(26, 12 + valueLines.length * 14);
      ensureSpace(rowH + 10);

      if (index % 2 === 1) {
        page.drawRectangle({ x: M, y: y - rowH + 12, width: contentW, height: rowH, color: zebra });
      }
      page.drawText(r.label, {
        x: M + 12,
        y: y,
        size: 9.5,
        font: regular,
        color: muted,
      });
      valueLines.forEach((ln, i) => {
        page.drawText(ln, {
          x: M + contentW * 0.44,
          y: y - i * 14,
          size: 10.5,
          font: bold,
          color: dark,
        });
      });
      page.drawLine({
        start: { x: M, y: y - rowH + 12 },
        end: { x: M + contentW, y: y - rowH + 12 },
        thickness: 0.7,
        color: line,
      });
      y -= rowH;
      index++;
    }
    y -= 22;
  }

  ensureSpace(60);
  page.drawRectangle({
    x: M,
    y: y - 34,
    width: contentW,
    height: 46,
    color: rgb(0.91, 0.96, 0.83),
  });
  page.drawText("Bu talep munzurtemizlik.com teklif formu üzerinden gönderilmiştir.", {
    x: M + 14,
    y: y - 6,
    size: 9.5,
    font: regular,
    color: rgb(0.184, 0.267, 0.125),
  });
  page.drawText("En kısa sürede sizinle iletişime geçeceğiz.", {
    x: M + 14,
    y: y - 22,
    size: 9.5,
    font: regular,
    color: rgb(0.184, 0.267, 0.125),
  });

  return await pdf.save();
}

export function quotePdfFileName(d: QuoteSubmission) {
  const safe = (d.name || "teklif")
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const now = new Date().toISOString().slice(0, 10);
  return `MunzurTemizlik-Teklif-${safe || "form"}-${now}.pdf`;
}
