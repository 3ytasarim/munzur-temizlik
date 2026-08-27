import { CalendarDays, HandHeart, ShieldCheck, Sofa, SprayCan } from "lucide-react";
import { images, testimonials } from "@/data/site";

export const heroBadges = ["Profesyonel", "Samimi", "Hızlı İletişim"];
export const heroLeafs = [images.leaf3, images.leaf1, images.leaf2];
export const heroAvatars = testimonials.slice(0, 3).map((t) => t.avatar);
export const stepIcons = [CalendarDays, SprayCan, Sofa];
export const advantageIcons = [CalendarDays, SprayCan, HandHeart, ShieldCheck];
