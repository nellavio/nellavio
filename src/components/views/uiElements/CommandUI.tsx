"use client";

import { Mail, User, Settings } from "lucide-react";

import { Card } from "../../common/Card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../shadcn/command";

export const CommandUI = () => {
  return (
    <Card isHeaderDividerVisible addTitleMargin title="Command">
      <Command className="rounded-lg border border-inputBorder">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Email</span>
            </CommandItem>
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Card>
  );
};
