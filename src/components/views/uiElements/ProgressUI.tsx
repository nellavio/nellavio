"use client";

import * as React from "react";

import { Card } from "../../common/Card";
import { Progress } from "../../shadcn/progress";

export const ProgressUI = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card isHeaderDividerVisible addTitleMargin title="Progress">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Complete</span>
            <span>100%</span>
          </div>
          <Progress value={100} />
        </div>
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Starting</span>
            <span>0%</span>
          </div>
          <Progress value={0} />
        </div>
      </div>
    </Card>
  );
};
