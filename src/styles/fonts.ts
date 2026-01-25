import {
  Plus_Jakarta_Sans,
  Nunito,
  Public_Sans,
  Outfit,
  Open_Sans,
} from "next/font/google";

export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const publicSans = Public_Sans({ subsets: ["latin"] });

export const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const nunito = Nunito({
  weight: "700",
  subsets: ["latin"],
});

export type FontType = "default" | "alternative";
