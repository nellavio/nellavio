"use client";

import { Card } from "../../common/Card";
import { Label } from "../../common/shadcn/label";
import { Textarea } from "../../common/shadcn/textarea";

export const TextareaForm = () => {
  return (
    <Card isHeaderDividerVisible addTitleMargin title="Textarea">
      <div className="grid w-full gap-[0.8rem]">
        <Label htmlFor="message">Description</Label>
        <Textarea placeholder="Type your message here." id="message" rows={6} />
      </div>
    </Card>
  );
};
