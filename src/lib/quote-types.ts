export type QuoteSubmission = {
  service: string;
  extras: string[];
  rooms: string;
  livingRooms: string;
  bathrooms: string;
  frequency: string;
  size: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  district: string;
  neighborhood: string;
  park: string;
  flexible: string;
  entry: string;
  pets: string;
  note: string;
};

export const emptyQuote: QuoteSubmission = {
  service: "",
  extras: [],
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
  province: "",
  district: "",
  neighborhood: "",
  park: "",
  flexible: "",
  entry: "",
  pets: "",
  note: "",
};

export function normalizeQuote(input: unknown): QuoteSubmission {
  const o = (input ?? {}) as Record<string, unknown>;
  const s = (k: keyof QuoteSubmission) => String(o[k] ?? "").slice(0, 2000);
  return {
    ...emptyQuote,
    service: s("service"),
    extras: Array.isArray(o["extras"]) ? (o["extras"] as unknown[]).map((x) => String(x).slice(0, 200)).slice(0, 30) : [],
    rooms: s("rooms"),
    livingRooms: s("livingRooms"),
    bathrooms: s("bathrooms"),
    frequency: s("frequency"),
    size: s("size"),
    date: s("date"),
    time: s("time"),
    name: s("name"),
    phone: s("phone"),
    email: s("email"),
    address: s("address"),
    province: s("province"),
    district: s("district"),
    neighborhood: s("neighborhood"),
    park: s("park"),
    flexible: s("flexible"),
    entry: s("entry"),
    pets: s("pets"),
    note: s("note"),
  };
}
