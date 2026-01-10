"use client";

import { ButtonsUI } from "./ButtonsUI";
import { AlertsUI } from "./AlertsUI";
import { CommandUI } from "./CommandUI";
import { AvatarsUI } from "./AvatarsUI";
import { TabsUI } from "./TabsUI";
import { SkeletonsUI } from "./SkeletonsUI";
import { DialogsUI } from "./DialogsUI";
import { BadgesUI } from "./BadgesUI";
import { PopoverUI } from "./PopoverUI";
import { ProgressUI } from "./ProgressUI";
import { TooltipsUI } from "./TooltipsUI";
import { BreadcrumbsUI } from "./BreadcrumbsUI";
import { SeparatorsUI } from "./SeparatorsUI";

export const UIElementsView = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
      {/* Left Column */}
      <div className="flex flex-col gap-6">
        <ButtonsUI />
        <AlertsUI />
        <CommandUI />
        <AvatarsUI />
        <TabsUI />
        <SkeletonsUI />
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-6">
        <DialogsUI />
        <BadgesUI />
        <PopoverUI />
        <ProgressUI />
        <TooltipsUI />
        <BreadcrumbsUI />
        <SeparatorsUI />
      </div>
    </div>
  );
};
