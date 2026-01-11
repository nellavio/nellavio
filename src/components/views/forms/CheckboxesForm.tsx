"use client";

import { Card } from "../../common/Card";
import { Label } from "../../common/shadcn/label";
import { Checkbox } from "../../common/shadcn/checkbox";

export const CheckboxesForm = () => {
  return (
    <Card isHeaderDividerVisible addTitleMargin title="Checkboxes">
      <div className="flex flex-col gap-6">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Default Checkbox</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="checked" defaultChecked />
          <Label htmlFor="checked">Checked Checkbox</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled-check" disabled />
          <Label htmlFor="disabled-check">Disabled Checkbox</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled-checked" disabled defaultChecked />
          <Label htmlFor="disabled-checked">Disabled Checked Checkbox</Label>
        </div>
      </div>
    </Card>
  );
};
