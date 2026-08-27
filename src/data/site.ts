import logo from "@/assets/images/Munzur_Temizlik.png";
import logoAlt from "@/assets/images/cropped-Munzur-Temizlik-Logo-3.png";
import heroImg from "@/assets/images/gettyimages-1417833200-edit-scaled.jpg";
import aboutTeam from "@/assets/images/professional-cleaning-service-people-working-together-office.jpg";
import aboutBanner from "@/assets/images/Hakkinda_Banner.jpg";
import ctaImg from "@/assets/images/GettyImages-931846460.jpg";
import womanIndoors from "@/assets/images/medium-shot-woman-cleaning-indoors.jpg";
import lilianaDrew from "@/assets/images/pexels-liliana-drew-9462191.jpg";
import karolina from "@/assets/images/pexels-karolina-grabowska-4239109.jpg";
import svcEv from "@/assets/images/GettyImages-1456829834.jpg";
import svcOfis from "@/assets/images/GettyImages-1350786822-1.jpg";
import svcDetayli from "@/assets/images/GettyImages-1724689200.jpg";
import svcTasinma from "@/assets/images/GettyImages-1226346559-1.jpg";
import svcInsaat from "@/assets/images/pexels-tima-miroshnichenko-6195130.jpg";
import svcDerin from "@/assets/images/pexels-tima-miroshnichenko-6196237.jpg";
import serviceSide from "@/assets/images/pexels-jonathanborba-28576639.png";
import leafs from "@/assets/images/leafs.svg";
import leaf1 from "@/assets/images/growth-close-up-environmental-lush-natural.png";
import leaf2 from "@/assets/images/growth-close-up-environmental-lush-natural-copy.png";
import leaf3 from "@/assets/images/growth-close-up-environmental-lush-natural-copy-2.png";
import footerLeaf1 from "@/assets/images/footer-leafs-1.png";
import footerLeaf2 from "@/assets/images/footer-leafs-2.png";
import avatarElif from "@/assets/images/pexels-shkrabaanthony-7345413.jpg";
import avatarMehmet from "@/assets/images/Mehmet_Demir.jpg";
import avatarAyse from "@/assets/images/Ayse_Demir.jpg";
import avatarBurak from "@/assets/images/Burak-Koc.jpg";
import postDerin from "@/assets/images/GettyImages-1417038143.jpg";
import postDoga from "@/assets/images/GettyImages-1357162123.jpg";
import postTasinma from "@/assets/images/GettyImages-1714910979.jpg";
import postHali from "@/assets/images/Carpet-Cleaning-1.jpg";
import postDaire from "@/assets/images/GettyImages-2166928738.jpg";
import postKoltuk from "@/assets/images/pexels-designecologist-1248583-1.jpg";
import postEv from "@/assets/images/pexels-dropshado-2251247-1.jpg";
import postSure from "@/assets/images/pexels-martin-lang-1604991777-27460916-1.jpg";

export const images = {
  logo,
  logoAlt,
  heroImg,
  aboutTeam,
  aboutBanner,
  ctaImg,
  womanIndoors,
  lilianaDrew,
  karolina,
  serviceSide,
  leafs,
  leaf1,
  leaf2,
  leaf3,
  footerLeaf1,
  footerLeaf2,
};

export const site = {
  name: "Munzur Temizlik",
  phone: "+90 (532) 721 72 62",
  phoneHref: "tel:+905327217262",
  whatsapp: "https://wa.me/905327217262",
  email: "info@munzurtemizlik.com",
  address:
    "Postane Mahallesi Cumhuriyet Caddesi Tuzla Port Tuzla - İSTANBUL",
  hours: [
    { day: "Pzt – Cum:", value: "09.00 – 17.00" },
    { day: "Cumartesi:", value: "09.00 – 17.00" },
    { day: "Pazar:", value: "09.00 – 17.00" },
  ],
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
  titleSuffix: "İstanbul Profesyonel Temizlik Hizmeti | Munzur Temizlik",
};

export type ServiceMeta = {
  slug: string;
  name: string;
  shortName: string;
  image: string;
};

export const serviceMeta: ServiceMeta[] = [
  {
    slug: "ev-temizligi",
    name: "Ev Temizliği",
    shortName: "Ev Temizliği",
    image: svcEv,
  },
  {
    slug: "ofis-temizligi",
    name: "Ofis Temizliği",
    shortName: "Ofis Temizliği",
    image: svcOfis,
  },
  {
    slug: "detayli-temizlik",
    name: "Detaylı Temizlik",
    shortName: "Detaylı Temizlik",
    image: svcDetayli,
  },
  {
    slug: "tasinma-oncesi-sonrasi-temizlik",
    name: "Taşınma Öncesi & Sonrası Temizlik",
    shortName: "Taşınma Öncesi / Sonrası Temizlik",
    image: svcTasinma,
  },
  {
    slug: "insaat-sonrasi-temizlik",
    name: "İnşaat Sonrası Temizlik",
    shortName: "İnşaat Sonrası Temizlik",
    image: svcInsaat,
  },
  {
    slug: "derinlemesine-temizlik",
    name: "Derinlemesine Temizlik",
    shortName: "Derinlemesine Temizlik",
    image: svcDerin,
  },
];

export const postImages: Record<string, string> = {
  "derinlemesine-temizlik-ve-duzenleme-evinize-yeni-bir-nefes": postDerin,
  "doga-dostu-temizlik-urunleri-ile-temizlige-yeni-bir-bakis-sagliginizi-ve-gelecegimizi-koruyan-cevreci-secimler":
    postDoga,
  "tasinmadan-once-ev-temizligi-hizmetleri-yeni-evinize-tertemiz-bir-baslangic-yapin":
    postTasinma,
  "doga-dostu-hali-temizligi-en-kapsamli-rehber": postHali,
  "eksizsiz-daire-temizligi-rehberi-piril-piril-bir-yasam-alani-icin-adim-adim-kilavuz":
    postDaire,
  "kotu-kokan-koltuk-nasil-temizlenir-etkili-ve-kalici-cozumler": postKoltuk,
  "temiz-ve-saglikli-bir-evin-faydalari-nelerdir": postEv,
  "bir-daireyi-derinlemesine-temizlemek-ne-kadar-surer": postSure,
};

export const quoteServices = [
  "Ev temizliği",
  "Villa Temizliği",
  "Yat Temizliği",
  "Ofis temizliği",
  "Detaylı Temizlik",
  "Taşıma Öncesi ve Sonrası Temizlik",
  "İnşaat Sonrası Temizlik",
  "Tadilat ve Onarım",
];

export const testimonials = [
  {
    text: "Beklentimin çok üstünde bir hizmetti. Tam zamanında geldiler ve tüm detaylara özen gösterdiler. Evin her köşesi adeta parladı. Ellerinize sağlık!",
    name: "Elif Yılmaz",
    role: "Müşteri",
    avatar: avatarElif,
  },
  {
    text: "Ofis temizliği için ilk kez çalıştık ama kesinlikle kalıcı müşterileri olacağız. Hem güler yüzlü ekip hem de tertemiz bir ortam bıraktılar. Teşekkür ederiz Munzur Temizlik!",
    name: "Mehmet Arslan",
    role: "Müşteri",
    avatar: avatarMehmet,
  },
  {
    text: "Taşınma öncesi temizlik için destek aldık, yeni kiracıya evi içimiz rahat bir şekilde teslim ettik. Her şey pırıl pırıldı. Çok memnun kaldık, tekrar görüşeceğiz.",
    name: "Ayşe Demir",
    role: "Müşteri",
    avatar: avatarAyse,
  },
  {
    text: "Derin temizlik hizmeti aldık, koltuklardan mutfağa kadar harika bir iş çıkardılar. Ekip son derece profesyonel ve titizdi. Munzur Temizlik'e teşekkür ederim.",
    name: "Burak Koç",
    role: "Müşteri",
    avatar: avatarBurak,
  },
];

export const stats = [
  { value: "15 +", label: "yıl tecrübe" },
  { value: "3422 +", label: "ev sadece geçen yıl temizlendi" },
  { value: "25.225 +", label: "saat müşterilerimizin zamanı bize emanet edildi" },
  { value: "98 %", label: "müşteri tekrar hizmet aldı" },
];

export const advantages = [
  {
    title: "Ücretsiz Teklif & Anında Fiyatlandırma",
    text: "Online formumuzu doldurarak saniyeler içinde ücretsiz teklif alın, fiyatı anında öğrenin.",
  },
  {
    title: "Ekipman ve Malzeme Desteği",
    text: "Temizlik ekipmanı ve malzeme desteği talebinize göre şekillenir. İsterseniz kendi ürünlerinizi kullanabilir, dilerseniz profesyonel temizlik malzemelerini biz temin edebiliriz.",
  },
  {
    title: "%100 Memnuniyet Garantisi",
    text: "Munzur Temizlik olarak beklentilerinizi karşılamak bizim önceliğimizdir.",
  },
  {
    title: "Güvenilir ve Denetlenmiş Personel",
    text: "Personelimiz güvenlik taramasından geçerek işe alınır. Eviniz, iş yeriniz emin ellerde.",
  },
];

export const howItWorks = [
  {
    image: karolina,
    title: "Teklif Alın",
    text: "Ev veya iş yeriniz hakkında bize bilgi verin, size özel temizlik planınızı ve tarihini belirleyelim.",
  },
  {
    image: womanIndoors,
    title: "Profesyonel Temizlik",
    text: "Deneyimli temizlik ekibimiz, detaylı ve hijyenik bir temizlik ile alanınızı yepyeni bir görünüme kavuştursun.",
  },
  {
    image: lilianaDrew,
    title: "Konforun Keyfini Çıkarın",
    text: "Siz sadece arkanıza yaslanın; tertemiz, hijyenik ve düzenli alanlarınızın tadını çıkarın.",
  },
];
