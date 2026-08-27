# Munzur React Rebuild

# MUNZUR TEMİZLİK – WORDPRESS SİTESİNİ REACT İLE BİREBİR YENİDEN OLUŞTUR

Mevcut web sitesi:

https://munzurtemizlik.com/

Bu proje mevcut Munzur Temizlik WordPress web sitesinin modern React tabanlı yeniden geliştirilmiş versiyonu olacaktır.

## EN ÖNEMLİ KURAL

Mevcut web sitesinin tasarımını değiştirme.

Yeni bir tasarım oluşturma.

Mevcut siteyi mümkün olduğunca **pixel-perfect / birebir** yeniden oluştur.

Mevcut WordPress sitesindeki:

* Logo
* Header
* Menü yapısı
* Hero alanı
* Hero görseli
* Başlıklar
* Açıklamalar
* Butonlar
* Renkler
* Font yapısı
* Kartlar
* Hizmet bölümleri
* Hizmet görselleri
* İkonlar
* CTA alanları
* Formlar
* Footer
* İletişim bilgileri
* Sayfa içerikleri
* Hizmet sayfaları
* Hizmet bölgeleri
* İlçe sayfaları
* SEO içerikleri
* Mobil görünüm

korunmalıdır.

Ama WordPress altyapısı kullanılmayacaktır.

---

# 1. TEKNOLOJİ

Projeyi modern React mimarisiyle geliştir.

Tercihen:

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Lucide React icons

kullan.

WordPress, Elementor veya PHP bağımlılığı olmasın.

Proje tamamen bağımsız çalışabilsin.

Kod yapısı temiz, component-based ve production-ready olsun.

---

# 2. MEVCUT SİTEYİ ANALİZ ET

Öncelikle:

https://munzurtemizlik.com/

sitesini detaylı olarak incele.

Sadece ana sayfaya bakma.

Mevcut sitenin erişilebilir bütün sayfalarını analiz et.

Header ve footer içerisindeki linkleri takip ederek:

* Ana Sayfa
* Kurumsal sayfalar
* Hizmetler
* Hizmet detay sayfaları
* Hizmet Bölgeleri
* İlçe bazlı hizmet sayfaları
* İletişim
* Teklif alma alanları
* Diğer mevcut sayfalar

dahil olmak üzere mevcut site yapısını çıkart.

Sonrasında React uygulamasında aynı URL ve içerik mimarisini mümkün olduğunca koru.

---

# 3. GÖRSELLERİ KORU

Bu çok önemli.

Mevcut WordPress sitesinde kullanılan görselleri mümkün olduğunca değiştirme.

Özellikle:

* Munzur Temizlik logosu
* Hero background / hero fotoğrafı
* Hizmet fotoğrafları
* Hakkımızda görselleri
* Banner görselleri
* CTA görselleri
* Footer logo
* Dekoratif görseller
* Diğer site görselleri

mevcut siteden alınarak yeni projeye aktarılmalıdır.

AI-generated veya rastgele stock görseller ile mevcut fotoğrafları değiştirme.

Mevcut görselleri mümkünse local asset olarak projeye kaydet.

Örneğin:

src/assets/images/
src/assets/logo/
src/assets/services/
src/assets/hero/

gibi düzenli klasör yapısı kullan.

Görseller WordPress URL'lerine kalıcı olarak bağımlı olmasın.

Production ortamında WordPress kapatılsa bile yeni React sitesi çalışmaya devam edebilmelidir.

---

# 4. İÇERİKLERİ KORU

Mevcut sitedeki gerçek içerikleri kullan.

Lorem Ipsum kullanma.

Kendi başına yeni firma bilgileri üretme.

Mevcut:

* Başlıklar
* Alt başlıklar
* Açıklamalar
* Hizmet açıklamaları
* İlçe açıklamaları
* Telefon
* E-mail
* Adres
* Çalışma saatleri
* CTA metinleri

korunmalıdır.

Türkçe karakterlerin tamamı doğru görüntülenmelidir.

---

# 5. ANA SAYFA

Ana sayfayı mevcut siteye mümkün olduğunca birebir oluştur.

Özellikle mevcut:

HEADER
↓
HERO
↓
HİZMETLER
↓
KURUMSAL / TANITIM ALANLARI
↓
CTA ALANLARI
↓
DİĞER İÇERİK BÖLÜMLERİ
↓
İLETİŞİM / TEKLİF
↓
FOOTER

sıralamasını mevcut siteden analiz ederek koru.

Hero bölümünün mevcut görseli özellikle korunmalıdır.

Desktop görünüm mevcut siteyle mümkün olduğunca aynı olmalıdır.

---

# 6. HİZMETLER

Mevcut sitedeki bütün hizmetleri aktar.

Örneğin mevcut hizmetler arasında:

* Ev Temizliği
* Ofis Temizliği
* İnşaat Sonrası Temizlik
* Detaylı Temizlik
* Taşınma Öncesi & Sonrası Temizlik
* Derinlemesine Temizlik

bulunmaktadır.

Ancak sadece bu listeyle sınırlı kalma.

Mevcut sitede bulunan tüm hizmetleri tespit ederek aktar.

Her hizmet detay sayfasının:

* URL yapısını
* Başlığını
* Görsellerini
* Açıklamalarını
* CTA alanlarını
* SEO içeriğini

koru.

---

# 7. HİZMET BÖLGELERİ

Bu bölüm SEO açısından çok önemli.

Mevcut WordPress sitesinde bulunan tüm:

Hizmet Bölgeleri → İlçe → İlçe Detay

sayfalarını tespit et.

Örneğin mevcut yapıda Sultangazi ve Sarıyer gibi İstanbul ilçelerine özel hizmet sayfaları bulunmaktadır.

Bunların tamamını yeni React projesine taşı.

Örneğin:

/hizmet-bolgeleri/sariyer/
/hizmet-bolgeleri/sultangazi/

gibi mevcut URL'leri mümkün olduğunca değiştirme.

Google'da indexlenmiş mevcut URL'lerin bozulmaması önemlidir.

Her ilçe sayfasındaki:

* H1
* H2
* açıklamalar
* mahalle listeleri
* görseller
* CTA
* meta title
* meta description

korunmalıdır.

---

# 8. SEO – ÇOK ÖNEMLİ

WordPress'ten React'e geçiş SEO kaybına neden olmamalıdır.

Her sayfa için:

* Unique `<title>`
* Meta description
* Canonical URL
* Open Graph
* Twitter Card
* Semantic HTML
* Tek H1 kullanımı
* Doğru H2/H3 hiyerarşisi
* Image alt attributes
* robots.txt
* sitemap.xml

oluştur.

Mevcut URL'leri mümkün olduğunca koru.

Mevcut sitede Google tarafından indexlenmiş URL'leri gereksiz yere değiştirme.

Schema.org structured data ekle.

Uygun yerlerde:

* LocalBusiness
* Organization
* Service
* BreadcrumbList

schema kullan.

---

# 9. İLETİŞİM BİLGİLERİ

Mevcut sitedeki gerçek iletişim bilgilerini koru.

Telefon:

+90 (532) 721 72 62

E-mail:

[info@munzurtemizlik.com](mailto:info@munzurtemizlik.com)

Adres:

Postane Mahallesi Cumhuriyet Caddesi Tuzla Port Tuzla - İSTANBUL

Bu bilgileri header, footer, iletişim ve CTA alanlarında mevcut tasarıma uygun şekilde kullan.

Telefon numaraları mobilde tıklanabilir `tel:` linki olsun.

E-mail `mailto:` olarak çalışsın.

---

# 10. TEKLİF FORMU

Mevcut sitedeki "Ücretsiz Teklif Al" akışını koru.

Formu React component olarak oluştur.

Form validation ekle.

Form backend entegrasyonunu ayrı bir servis/component yapısında tut ki production aşamasında SMTP/API bağlantısı kolayca yapılabilsin.

Form başarılı ve başarısız durumlarını kullanıcıya düzgün göster.

---

# 11. RESPONSIVE

Site aşağıdaki ekranlarda eksiksiz çalışmalıdır:

* 1920px desktop
* Laptop
* Tablet
* iPad
* Mobile
* 390px
* 375px
* 360px

Desktop tasarımın küçültülmüş hali gibi davranma.

Mobil navigasyonu düzgün oluştur.

Mobilde:

* Menü
* Hero
* Başlıklar
* Kartlar
* Görseller
* Formlar
* CTA
* Footer

taşmamalıdır.

Horizontal scroll kesinlikle olmamalıdır.

---

# 12. PERFORMANS

Yeni React sitesi mevcut WordPress sitesinden daha hızlı olmalıdır.

Uygula:

* WebP/AVIF mümkün olduğunda
* Responsive images
* Lazy loading
* Code splitting
* Route lazy loading
* Optimized asset loading
* Minimal JavaScript bundle
* Font optimization
* CLS önleme
* Image width/height tanımları

Google PageSpeed ve Core Web Vitals açısından optimize et.

---

# 13. HETZNER DEPLOYMENT

Bu proje Lovable üzerinde kalmayacak.

Son aşamada GitHub üzerinden kendi Hetzner Ubuntu sunucuma deploy edeceğim.

Bu nedenle proje:

* Lovable'a bağımlı olmamalı
* Supabase zorunlu olmamalı
* Lovable CDN zorunlu olmamalı
* Lovable asset URL'lerine bağımlı olmamalı

Production build kendi başına çalışmalıdır.

Hedef deployment yapısı:

GitHub
↓
Hetzner Ubuntu Server
↓
Nginx
↓
React Production Build
↓
munzurtemizlik.com

Projede production deployment için gerekli build scriptleri hazır olsun.

`npm install`
`npm run build`

komutlarıyla production build alınabilsin.

---

# 14. WORDPRESS'TEN TAM BAĞIMSIZLIK

Migration tamamlandığında eski WordPress hostingini tamamen kapatabilmeliyim.

Bu nedenle yeni site:

* WordPress API kullanmamalı
* WordPress CSS kullanmamalı
* WordPress JS kullanmamalı
* WordPress database kullanmamalı
* WordPress image URL'lerine bağımlı olmamalı
* Elementor'a bağımlı olmamalı

Gerekli bütün statik içerikler ve görseller React projesine aktarılmalıdır.

---

# 15. TASARIM KONUSUNDA KESİN TALİMAT

Siteyi yeniden tasarlama.

"Modernleştirme" adı altında:

* Renk değiştirme
* Logo değiştirme
* Hero değiştirme
* Fotoğraf değiştirme
* Kart tasarımını değiştirme
* Genel marka kimliğini değiştirme

yapma.

Amacımız:

**WordPress sitesinin görünümünü ve içeriğini koruyup altyapısını React'e taşımaktır.**

Kullanıcı mevcut site ile yeni siteyi yan yana açtığında mümkün olduğunca aynı web sitesi olduğunu görmelidir.

---

# 16. ÇALIŞMA SIRASI

Projeyi aşamalı gerçekleştir:

1. Mevcut munzurtemizlik.com sitesini analiz et.
2. Site haritasını ve mevcut route'ları belirle.
3. Tüm gerekli görselleri belirle.
4. Global tasarım sistemini oluştur.
5. Header ve Footer'ı oluştur.
6. Ana sayfayı birebir oluştur.
7. Hizmet detay sayfalarını oluştur.
8. Hizmet bölgeleri ve ilçe sayfalarını oluştur.
9. İletişim ve teklif formlarını oluştur.
10. Responsive kontrolleri yap.
11. SEO metadata ve schema yapılarını ekle.
12. Sitemap ve robots.txt oluştur.
13. Production build hatalarını düzelt.
14. WordPress'e kalan bütün bağımlılıkları kaldır.

Her aşamada mevcut siteyi referans al.

## SONUÇ

İstediğim şey yeni bir Munzur Temizlik tasarımı değildir.

İstediğim:

**munzurtemizlik.com WordPress sitesinin mevcut görünümü, içerikleri, sayfaları, görselleri, logosu, hero fotoğrafı ve SEO yapısı korunarak React + TypeScript ile yeniden geliştirilmiş, hızlı, responsive ve Hetzner üzerinde bağımsız çalışabilecek production-ready versiyonudur.**

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/192a577d-3706-4860-9ccb-864bee3954f3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
