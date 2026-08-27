import { createServerFn } from "@tanstack/react-start";

import { normalizeQuote } from "./quote-types";

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => normalizeQuote(input))
  .handler(async ({ data }) => {
    if (!data.name.trim() || !data.phone.trim()) {
      return { ok: false as const, error: "Ad Soyad ve Telefon zorunludur." };
    }
    try {
      const { sendQuoteMail } = await import("./quote-mail.server");
      await sendQuoteMail(data);
      return { ok: true as const };
    } catch (error) {
      console.error("quote mail error", error);
      return { ok: false as const, error: "Mail gönderilemedi. Lütfen telefonla ulaşın." };
    }
  });
