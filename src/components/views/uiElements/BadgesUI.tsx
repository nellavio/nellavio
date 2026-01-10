"use client";

import { Card } from "../../common/Card";
import { Badge } from "../../shadcn/badge";

export const BadgesUI = () => {
  return (
    <Card isHeaderDividerVisible addTitleMargin title="Badges">
      <div className="flex flex-wrap gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </Card>
  );
};
