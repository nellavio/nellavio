"use client";

import { Card } from "../../common/Card";
import { Label } from "../../shadcn/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../shadcn/radio-group";

export const RadioButtonsForm = () => {
  return (
    <Card isHeaderDividerVisible addTitleMargin title="Radio Buttons">
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Default Radio</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Secondary Radio</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="option-three"
            id="option-three"
            disabled
          />
          <Label htmlFor="option-three">Disabled Radio</Label>
        </div>
      </RadioGroup>
    </Card>
  );
};
