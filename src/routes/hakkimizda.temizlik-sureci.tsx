import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImageCtaBand, Notch } from "@/components/NotchBand";
import { getPage } from "@/data/content";
import { images } from "@/data/site";
import { openQuoteModal } from "@/lib/quote-modal";
import iconCalendar from "@/assets/images/icon-calendar.svg";
import imgBanyo from "@/assets/images/pexels-karolina-grabowska-4239109.jpg";
import imgYatak from "@/assets/images/pexels-liliana-drew-9462616.jpg";
import imgMutfak from "@/assets/images/pexels-liliana-drew-9462307.jpg";
import imgSalon from "@/assets/images/pexels-shvets-production-7513087.jpg";
import bandImg from "@/assets/images/pexels-karolina-grabowska-4239032-scaled.jpg";

const page = getPage("hakkimizda__temizlik-sureci");
const title = page.title || "Temizlik Sürecimiz | Munzur Temizlik";
const description =
  page.description ||
  "Munzur Temizlik'in banyo, mutfak, yatak odası ve yaşam alanlarını kapsayan detaylı temizlik süreci adım adım.";

export const Route = createFileRoute("/hakkimizda/temizlik-sureci")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/hakkimizda/temizlik-sureci" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/hakkimizda/temizlik-sureci" }],
  }),
  component: ProcessPage,
});

const tabs = [
  {
    key: "banyo",
    tab: "Banyo Temizliği",
    title: "Banyo Temizliği",
    image: imgBanyo,
    lead: "Munzur Temizlik olarak banyonuzu baştan aşağıya detaylı şekilde temizliyoruz.",
    paragraphs: [
      "Köşe bucak temizlikten, zeminlerin silinmesine ve tozların alınmasına kadar her adımda hijyen önceliğimizdir.",
      "Lavabo, klozet, duşakabin gibi bakteri barındırabilecek alanlarda özel ürünler kullanılır. Havluluklar, pencere pervazları, dolap kapakları, ışıklar ve priz kenarları dâhil tüm yüzeyler temizlenir ve dezenfekte edilir.",
    ],
    items: [
      "Lavabo ve duşların fırçalanması, durulanması",
      "Birikmiş sabun kalıntılarının temizlenmesi",
      "Klozetin iç ve dış yüzeylerinin dezenfekte edilmesi",
      "Aydınlatma üniteleri ve armatürlerin temizliği",
    ],
  },
  {
    key: "yatak",
    tab: "Yatak Odası Temizliği",
    title: "Yatak Odası Temizliği",
    image: imgYatak,
    lead: "Yatak odaları dinlenme alanlarımızdır, bu nedenle hijyen ve ferahlık burada büyük önem taşır.",
    paragraphs: [
      "Munzur Temizlik olarak yatak odalarınızı detaylı şekilde temizleyerek toz, alerjen ve kir birikimlerini ortadan kaldırıyoruz.",
      "Mobilyaların çevresi ve altı, dolap yüzeyleri, priz ve kenar köşelere kadar ulaşarak eksiksiz temizlik sağlıyoruz.",
    ],
    items: [
      "Yatakların toplanması ve yatak başlıklarının silinmesi",
      "Komodin, dolap ve şifonyer yüzeylerinin tozunun alınması",
      "Yerlerin süpürülmesi ve silinmesi",
      "Perdelerin, pencere pervazlarının ve priz kenarlarının temizliği",
      "Aydınlatma armatürleri ve lambaların tozunun alınması",
    ],
  },
  {
    key: "mutfak",
    tab: "Mutfak Temizliği",
    title: "Mutfak Temizliği",
    image: imgMutfak,
    lead: "Mutfaklar sadece yemek yapılan alanlar değil, aynı zamanda hijyenin en önemli olduğu yerlerdir.",
    paragraphs: [
      "Munzur Temizlik olarak mutfağınızda yağ, leke ve bakterilere karşı kapsamlı bir temizlik sağlıyoruz. Tezgâhlardan dolaplara, ocaktan beyaz eşyalara kadar her alan titizlikle temizlenir. Gıda güvenliği açısından kullanılan temizlik ürünlerimiz insan sağlığına uygun ve çevre dostudur.",
    ],
    items: [
      "Tezgâh, ocak ve lavabo yüzeylerinin silinmesi ve dezenfekte edilmesi",
      "Mutfak dolaplarının dış yüzeylerinin temizliği",
      "Mikrodalga, fırın dışı ve buzdolabı dış yüzeylerinin silinmesi",
      "Zeminlerin süpürülüp silinmesi",
      "Çöp kutusunun temizliği ve çöpün atılması",
      "Lamba, priz kenarı ve fayans üstü tozlarının alınması",
    ],
  },
  {
    key: "salon",
    tab: "Salon Temizliği",
    title: "Salon Temizliği",
    image: imgSalon,
    lead: "Ailenizle vakit geçirdiğiniz, misafirlerinizi ağırladığınız salonlarınız da en az mutfağınız kadar hijyenik olmalı.",
    paragraphs: [
      "Munzur Temizlik olarak salon ve oturma odalarında biriken toz, kir ve evcil hayvan tüylerine karşı etkili ve detaylı bir temizlik uyguluyoruz.",
      "Mobilyaların altı, dekoratif yüzeyler ve ulaşılması zor alanlar dâhil olmak üzere tüm detaylara önem veriyoruz.",
    ],
    items: [
      "Koltuk, masa, TV ünitesi gibi yüzeylerin tozunun alınması",
      "Elektronik eşyaların yüzey temizliği (televizyon, uzaktan kumanda, vb.)",
      "Zeminlerin süpürülmesi ve silinmesi",
      "Halıların süpürülmesi (talebe göre)",
      "Priz, perde kornişi ve pencere pervazı tozlarının temizliği",
      "Aydınlatma armatürlerinin silinmesi",
    ],
  },
];

const tips = [
  "Yemek masanızı sürekli kurulu tutun. Böylece anahtar, mektup veya evrak gibi eşyaların burada birikmesini önlersiniz.",
  "Yoğun kullanılan alanlarda paspas ya da kilim kullanın. Bu sayede dışarıdan gelen kirin evin içine yayılması engellenir.",
  "Eşyalarınız için belirli alanlar oluşturun. Askılıklar, kutular ve saklama sepetleriyle evinizi organize edin.",
  "Temizlik malzemelerini tek bir yerde tutmak yerine dağıtın. Böylece küçük temizlik işleri daha kolay yapılır.",
  "Her gün bir odada küçük bir temizlik yapın. Örneğin bir gün banyodaki aynayı silmek, bir gün mutfak zeminini süpürmek gibi.",
];

function Eyebrow({ text }: { text: string }) {
  return (
    <p className="eyebrow inline-flex items-start gap-1 text-[0.78rem] uppercase tracking-[0.16em]">
      {text}
      <img src={images.leaf2} alt="" aria-hidden="true" className="mt-[-2px] h-3 w-auto" />
    </p>
  );
}

function ProcessPage() {
  const [active, setActive] = useState(0);
  const current = tabs[active]!;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="px-3 pt-3 md:px-5">
          <div className="rounded-[2rem] bg-[#F4F8EF] px-6 py-16 text-center md:rounded-[2.5rem] md:px-14 md:py-24">
            <Eyebrow text="Temizlik Sürecimiz" />
            <h1 className="mx-auto mt-3 max-w-4xl text-[2.1rem] leading-tight md:text-[3.3rem]">
              Bizimle temizlik, konforun ta kendisi.
            </h1>
            <div className="relative mx-auto mt-10 h-28 w-40">
              <img
                src={images.leaf1}
                alt=""
                aria-hidden="true"
                className="absolute left-0 top-0 w-20 -rotate-12"
              />
              <img
                src={images.leaf3}
                alt=""
                aria-hidden="true"
                className="absolute right-2 top-2 w-10"
              />
              <img
                src={images.leaf2}
                alt=""
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 w-16 -translate-x-1/2"
              />
            </div>
            <p className="mx-auto mt-10 max-w-2xl text-[1.05rem] leading-relaxed">
              <strong className="font-semibold">Munzur Temizlik</strong> olarak, hayatınız ne kadar
              yoğun olursa olsun temiz ve huzurlu bir eve dönmenizi sağlıyoruz.
              <br />
              Bizimle temizlik, artık bir yük değil; konforun ta kendisi.
            </p>
          </div>
        </section>

        {/* Oda oda temizlik süreci */}
        <section className="px-3 pt-10 md:px-5 md:pt-16">
          <div className="relative rounded-[2rem] bg-[#F4F8EF] px-6 pb-24 pt-14 md:rounded-[2.5rem] md:px-14 md:pb-28 md:pt-20">
            <div className="text-center">
              <Eyebrow text="Oda Oda Temizlik Süreci" />
              <h2 className="mt-2 text-[1.8rem] leading-tight md:text-[2.7rem]">
                Tüm Alanlara Yönelik Kapsamlı Temizlik Hizmeti
              </h2>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {tabs.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`rounded-full px-6 py-3 font-display text-[0.95rem] transition-colors ${
                    i === active
                      ? "border border-primary bg-[#E8F3D8] text-foreground"
                      : "bg-white text-foreground hover:bg-[#EEF5E4]"
                  }`}
                >
                  {t.tab}
                </button>
              ))}
            </div>

            <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-[1.6rem] leading-snug md:text-[1.9rem]">{current.title}</h3>
                <p className="mt-5 font-medium leading-relaxed">{current.lead}</p>
                {current.paragraphs.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-foreground/70">
                    {p}
                  </p>
                ))}
                <ul className="mt-7 space-y-4">
                  {current.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 font-medium">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-[1.8rem]">
                <img
                  src={current.image}
                  alt={current.title}
                  loading="lazy"
                  className="aspect-[4/3.2] w-full object-cover"
                />
              </div>
            </div>

            {/* alt kıvrımlı buton */}
            <div className="absolute inset-x-0 bottom-0 h-0">
              <Notch color="#F4F8EF" className="top-auto bottom-[-72px]">
                <button type="button" onClick={openQuoteModal} className="btn-yellow">
                  Ücretsiz Teklif Al
                </button>
              </Notch>
            </div>
          </div>
        </section>

        {/* Temiz bir alan */}
        <section className="container-site pt-32 md:pt-40">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow text="💚 Size Nasıl Yardımcı Oluruz?" />
              <h2 className="mt-2 text-[1.9rem] leading-tight md:text-[2.6rem]">
                Temiz Bir Alan
                <br />
                Hayatınızı Nasıl Etkiler?
              </h2>
            </div>
            <p className="leading-relaxed text-foreground/70">
              Ev temizliği hizmeti almak, zamanınızı size geri kazandırmanın harika bir yoludur.
              Günün sonunda temiz, düzenli ve ferah kokan bir eve dönmenin verdiği huzurun yanında;
              temizlik hizmeti sayesinde diğer önemli işlerinize daha fazla odaklanabilirsiniz.
              Üstelik bununla da kalmaz – ev temizliğinin pek çok fiziksel ve zihinsel faydası da
              vardır.
            </p>
          </div>
        </section>

        <section className="mt-14 md:mt-20">
          <ImageCtaBand image={bandImg} alt="Profesyonel temizlik ekibi">
            <Link to="/iletisim" className="btn-yellow">
              Bize Ulaşın
            </Link>
          </ImageCtaBand>
        </section>

        {/* İpuçları */}
        <section className="container-site py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow text="İpuçları" />
              <h2 className="mt-2 max-w-md text-[1.9rem] leading-tight md:text-[2.6rem]">
                Evinizi Her Zaman En İyi Şekilde Korumanın Yolları
              </h2>
              <div className="mt-12">
                <img src={iconCalendar} alt="" aria-hidden="true" className="h-10 w-10" />
                <p className="mt-5 max-w-[14rem] text-[1.1rem] leading-snug">
                  Munzur Temizlik Öneriyor: Haftalık Temizlik
                </p>
                <button type="button" onClick={openQuoteModal} className="btn-yellow mt-7">
                  Ücretsiz Teklif Alın
                </button>
              </div>
            </div>
            <ul className="space-y-5">
              {tips.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 rounded-[1.4rem] bg-[#F4F8EF] px-6 py-6 leading-relaxed"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
