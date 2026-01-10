"use client";

import { Card } from "../../common/Card";
import { Skeleton } from "../../shadcn/skeleton";

export const SkeletonsUI = () => {
  return (
    <Card isHeaderDividerVisible addTitleMargin title="Skeletons">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    </Card>
  );
};
