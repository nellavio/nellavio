"use client";

import { Card } from "../../common/Card";
import { Label } from "../../shadcn/label";
import { Slider } from "../../shadcn/slider";

export const SlidersForm = () => {
  return (
    <Card isHeaderDividerVisible addTitleMargin title="Sliders">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-[0.8rem]">
          <Label>Default Slider</Label>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
        <div className="flex flex-col gap-[0.8rem]" style={{ marginTop: "1rem" }}>
          <Label>Range Slider</Label>
          <Slider defaultValue={[25, 75]} max={100} step={1} />
        </div>
      </div>
    </Card>
  );
};
