import type { ReactNode } from "react";

/**
 * Yuvarlak kıvrımlı (notch) buton kabı — orijinal sitedeki
 * "Ücretsiz Teklif Al" / "Bize Ulaşın" buton çıkıntısı.
 */
export function Notch({
  color = "var(--background)",
  children,
  className = "",
}: {
  color?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`absolute left-1/2 top-0 z-20 -translate-x-1/2 ${className}`}>
      <div className="relative origin-top scale-[0.82] md:scale-100">
        <svg
          width="268"
          height="72"
          viewBox="0 0 268 72"
          className="block"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M0 0C14 0 26 12 26 26L26 44C26 59.46 38.54 72 54 72L214 72C229.46 72 242 59.46 242 44L242 26C242 12 254 0 268 0Z"
            fill={color}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pt-2">{children}</div>
      </div>
    </div>
  );
}

/** Tam genişlikte görsel bant + üstünde kıvrımlı buton. */
export function ImageCtaBand({
  image,
  alt,
  notchColor = "var(--background)",
  children,
  height = "h-[240px] md:h-[380px]",
}: {
  image: string;
  alt: string;
  notchColor?: string;
  children: ReactNode;
  height?: string;
}) {
  return (
    <div className="relative">
      <img src={image} alt={alt} loading="lazy" className={`w-full object-cover ${height}`} />
      <Notch color={notchColor}>{children}</Notch>
    </div>
  );
}
