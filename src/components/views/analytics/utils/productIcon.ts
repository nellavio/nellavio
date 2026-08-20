import {
  Headphones,
  Laptop,
  type LucideIcon,
  Smartphone,
  Tablet,
  Watch,
} from "lucide-react";

import { ProductCategory } from "../types";

export const PRODUCT_ICON: Record<ProductCategory, LucideIcon> = {
  phone: Smartphone,
  laptop: Laptop,
  tablet: Tablet,
  watch: Watch,
  audio: Headphones,
};
