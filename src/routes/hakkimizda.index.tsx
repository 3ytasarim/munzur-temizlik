import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { images, site } from "@/data/site";
import { getPage } from "@/data/content";
import icon1 from "@/assets/images/about-icon-1.svg";
import icon2 from "@/assets/images/about-icon-2.svg";
import icon3 from "@/assets/images/about-icon-3.svg";
import icon4 from "@/assets/images/about-icon-4.svg";
import leafSingle from "@/assets/images/leaf-green.svg";

const page = getPage("hakkimizda");

const cards = [
  {
    icon: icon1,
    title: "Güvenilir Temizlik Ekibi",
    text: "Munzur Temizlik, işini bilen, güvenilir ve titiz çalışanlardan oluşan bir ekibe sahiptir. Eviniz, ofisiniz ya da iş yeriniz emin ellerde.",
  },
  {
    icon: icon2,
    title: "Çevre Dostu Temizlik Ürünleri",
    text: "Çevreye duyarlı temizlik anlayışımızla doğa dostu ürünler kullanarak hem sağlığınızı hem de gezegenimizi koruyoruz.",
  },
  {
    icon: icon3,
    title: "Kurumsal Temizlikte Uzmanlık",
    text: "Kurumsal alanlarda temizlik fark yaratır. Munzur Temizlik olarak ofislerden fabrikalara kadar geniş çaplı çözümler sunuyoruz.",
  },
  {
    icon: icon4,
    title: "Müşteri Memnuniyeti Odaklı Hizmet",
    text: "Her işin sonunda sizin memnuniyetiniz bizim başarımızdır. Munzur Temizlik, güler yüzlü hizmet ve titiz işçiliği ile yanınızda.",
  },
];

const timeline = [
  {
    title: "Güvenle Başladık",
    text: "Munzur Temizlik olarak ilk günden beri tüm müşterilerimize karşı şeffaf ve güvenilir bir hizmet sunduk. Amacımız, temizlik hizmeti alırken insanların içlerinin rahat olmasıydı – hâlâ da öyle.",
  },
  {
    title: "Saygı Kültürümüzü Oluşturduk",
    text: "Müşterilerimizin yaşam alanlarına, eşyalarına ve zamanına saygı gösteriyoruz. Temizlik sadece fiziksel değil; aynı zamanda insani bir temastır. Saygı, işimizin temelidir.",
  },
  {
    title: "Profesyonel Ekiple Güçlendik",
    text: "Ekibimizi özenle seçtik, düzenli eğitimlerle yetkinliklerini artırdık. Profesyonel temizlik hizmeti, deneyimle birleştiğinde kusursuz sonuçlar doğurur. Her üyemiz işinde uzmandır.",
  },
  {
    title: "Sürdürülebilir Gelecek İçin Çalışıyoruz",
    text: "Ekolojik temizlik ürünleriyle çevreyi koruyor, karbon ayak izimizi azaltıyoruz. Munzur Temizlik sadece bugün değil, yarın için de temizlik yapar.",
  },
];

const description =
  page.description ||
  "Munzur Temizlik; İstanbul genelinde ev, ofis ve iş yerleri için profesyonel temizlik hizmeti sunan deneyimli bir temizlik şirketidir.";

export const Route = createFileRoute("/hakkimizda/")({
  head: () => ({
    meta: [
      { title: page.title || `Hakkımızda - ${site.titleSuffix}` },
      { name: "description", content: description },
      { property: "og:title", content: page.title || `Hakkımızda - ${site.titleSuffix}` },
      { property: "og:description", content: description },
      { property: "og:url", content: "/hakkimizda" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/hakkimizda" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="px-3 pt-3 md:px-5">
          <div
            className="rounded-[2rem] px-6 pb-10 pt-20 text-center md:rounded-[2.5rem] md:px-14 md:pb-16 md:pt-40"
            style={{ background: "linear-gradient(180deg, #F3F8EC 0%, #FFFFFF 100%)" }}
          >
            <p className="eyebrow inline-flex items-start gap-1 text-[0.78rem] uppercase tracking-[0.16em]">
              Hakkımızda
              <img src={images.leaf2} alt="" aria-hidden="true" className="mt-[-2px] h-3 w-auto" />
            </p>
            <h1 className="mx-auto mt-3 max-w-5xl text-3xl leading-[1.12] md:text-[3.3rem]">
              Boğaz Köprüsü gibi, biz de Avrupa’dan Anadolu’ya temizlikte köprü kuruyoruz.
            </h1>
          </div>
        </section>

        {/* Banner image */}
        <section className="container-site relative -mt-4 md:-mt-10">
          <img
            src={images.aboutBanner}
            alt="İstanbul Boğaz Köprüsü gece görünümü"
            className="w-full rounded-[1.5rem] object-cover md:rounded-[2rem]"
          />
          <img
            src={images.leaf1}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 left-1/2 hidden w-28 -translate-x-1/2 md:block"
          />
        </section>

        {/* Misyonumuz */}
        <section className="container-site pt-20 text-center md:pt-32">
          <h2 className="text-[2rem] leading-tight md:text-[2.6rem]">Misyonumuz</h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[1.05rem] leading-relaxed text-foreground/80">
            Munzur Temizlik olarak misyonumuz; bireysel ve kurumsal müşterilerimize hijyenik,
            sağlıklı ve sürdürülebilir temizlik çözümleri sunarak yaşam alanlarını ferah, güvenli ve
            konforlu hale getirmektir. Alanında uzman ekibimizle, en yüksek temizlik standartlarını
            en uygun fiyatlarla sunuyoruz.
          </p>
        </section>

        {/* Value cards */}
        <section className="container-site pt-12 md:pt-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <div key={c.title} className="rounded-[1.8rem] bg-[#E8F3D8] p-7">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                  <img src={c.icon} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
                </span>
                <h3 className="mt-6 text-[1.35rem] font-medium leading-snug">{c.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/75">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Neden Munzur Temizlik? */}
        <section className="relative overflow-hidden bg-[#F7FAF3] py-20 md:py-28">
          <img
            src={leafSingle}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[12%] top-24 hidden w-36 opacity-70 md:block"
          />
          <img
            src={leafSingle}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[16%] top-8 hidden w-20 rotate-12 opacity-70 md:block"
          />

          <div className="container-site relative text-center">
            <p className="eyebrow inline-flex items-start gap-1 text-[0.78rem] uppercase tracking-[0.16em]">
              Neden Munzur Temizlik?
              <img src={images.leaf2} alt="" aria-hidden="true" className="mt-[-2px] h-3 w-auto" />
            </p>
            <h2 className="mt-2 text-[2rem] leading-tight md:text-[2.6rem]">
              Temizlikte Şeffaflık ve Güven
            </h2>
          </div>

          {/* Timeline */}
          <div className="container-site relative mt-16">
            <img
              src={images.leaf2}
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 top-[-46px] hidden w-12 -translate-x-1/2 md:block"
            />
            <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#D6E2C6] md:block" />
            <ol className="relative space-y-8 md:space-y-0">
              {timeline.map((item, i) => (
                <li key={item.title} className="relative md:grid md:grid-cols-2 md:gap-16">
                  <span className="absolute left-1/2 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-primary bg-white md:block" />
                  <div
                    className={
                      i % 2 === 0
                        ? "md:col-start-1 md:pb-16 md:pr-4"
                        : "md:col-start-2 md:pb-16 md:pl-4 md:pt-28"
                    }
                  >
                    <div className="rounded-[1.5rem] bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                      <h3 className="text-[1.4rem] font-medium leading-snug">{item.title}</h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/75">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Alt görsel bandı + kıvrımlı "Bize Ulaşın" butonu */}
        <ImageCtaBand image={aboutCtaBanner} alt="Munzur Temizlik ekibi" notchColor="#F7FAF3">
          <Link to="/iletisim" className="btn-yellow">
            Bize Ulaşın
          </Link>
        </ImageCtaBand>

      </main>
      <Footer />
    </>
  );
}
