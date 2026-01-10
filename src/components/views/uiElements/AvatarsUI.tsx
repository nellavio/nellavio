"use client";

import { Card } from "../../common/Card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../shadcn/avatar";

export const AvatarsUI = () => {
  return (
    <Card isHeaderDividerVisible addTitleMargin title="Avatars">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">SM</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <span className="text-sm font-medium mb-2 block">
            Avatar Group
          </span>
          <div className="flex -space-x-2">
            <Avatar className="border-2 border-primaryBg">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-primaryBg">
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-primaryBg">
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-primaryBg">
              <AvatarFallback className="text-xs">+5</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </Card>
  );
};
