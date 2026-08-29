export type QuoteResult = { ok: boolean; error?: string };

export async function postQuote(data: Record<string, unknown>): Promise<QuoteResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch("/api/public/quote", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    const json = (await res.json().catch(() => null)) as QuoteResult | null;
    if (json) return json;
    return { ok: false, error: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin." };
  } catch {
    return { ok: false, error: "Bağlantı hatası. Lütfen tekrar deneyin." };
  } finally {
    clearTimeout(timer);
  }
}
