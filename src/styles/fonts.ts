import {
  Inter,
  Plus_Jakarta_Sans,
  Nunito,
  Public_Sans,
  Outfit,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const publicSans = Public_Sans({ subsets: ["latin"] });

export const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const nunito = Nunito({
  weight: "700",
  subsets: ["latin"],
});

export type FontType = "default" | "alternative";
