import { images, testimonials } from "@/data/site";

import starSvgUrl from "@/assets/images/star.svg";
import googleGUrl from "@/assets/images/Google__G__logo.svg";
import arrowIllUrl from "@/assets/images/arrow-ill.svg";
import leafGroup1 from "@/assets/images/leaf-group-1.svg";
import leafGroup2 from "@/assets/images/leaf-group-2.svg";
import leafGroup3 from "@/assets/images/leaf-group-3.svg";
import stepCalendar from "@/assets/images/calendar-booking.svg";
import stepClean from "@/assets/images/clean.svg";
import stepRelax from "@/assets/images/relax.svg";
import advCalendar from "@/assets/images/calendar-booking-1-1.svg";
import advEquipment from "@/assets/images/Equipment.svg";
import advSatisfaction from "@/assets/images/Satisfaction.svg";
import advRelax from "@/assets/images/relkax.svg";

export const heroBadges = ["Profesyonel", "Samimi", "Hızlı İletişim"];
export const heroLeafs = [images.leaf3, images.leaf1, images.leaf2];
export const heroAvatars = testimonials.slice(0, 3).map((t) => t.avatar);

export const starSvg = starSvgUrl;
export const googleG = googleGUrl;
export const arrowIll = arrowIllUrl;

export const stepIcons = [stepCalendar, stepClean, stepRelax];
export const stepLeafs = [leafGroup1, leafGroup2, leafGroup3];
export const advantageIcons = [advCalendar, advEquipment, advSatisfaction, advRelax];
