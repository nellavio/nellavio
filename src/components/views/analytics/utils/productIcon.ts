import { HeadphonesIcon } from "@/assets/icons/HeadphonesIcon";
import { LaptopIcon } from "@/assets/icons/LaptopIcon";
import { SmartphoneIcon } from "@/assets/icons/SmartphoneIcon";
import { TabletIcon } from "@/assets/icons/TabletIcon";
import { WatchIcon } from "@/assets/icons/WatchIcon";

import { IconComponent, ProductCategory } from "../types";

export const PRODUCT_ICON: Record<ProductCategory, IconComponent> = {
  phone: SmartphoneIcon,
  laptop: LaptopIcon,
  tablet: TabletIcon,
  watch: WatchIcon,
  audio: HeadphonesIcon,
};
