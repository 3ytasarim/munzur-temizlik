import { createFileRoute } from "@tanstack/react-router";

import { normalizeQuote } from "@/lib/quote-types";

export const Route = createFileRoute("/api/public/quote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
        }

        const data = normalizeQuote(payload);
        const requiredValues = [
          data.service,
          data.rooms,
          data.livingRooms,
          data.bathrooms,
          data.frequency,
          data.size,
          data.date,
          data.time,
          data.name,
          data.phone,
          data.email,
          data.address,
          data.province,
          data.district,
          data.neighborhood,
          data.park,
          data.flexible,
          data.entry,
          data.pets,
          data.note,
        ];
        if (requiredValues.some((value) => !value.trim())) {
          return Response.json(
            { ok: false, error: "Lütfen tüm zorunlu alanları doldurun." },
            { status: 400 },
          );
        }

        try {
          const { sendQuoteMail } = await import("@/lib/quote-mail.server");
          await sendQuoteMail(data);
          return Response.json({ ok: true });
        } catch (error) {
          console.error("quote mail error", error);
          return Response.json(
            {
              ok: false,
              error: "Mail gönderilemedi. Lütfen telefonla ulaşın.",
              detail: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
