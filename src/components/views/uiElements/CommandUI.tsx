"use client";

import { useTranslations } from "next-intl";

import { MailIcon } from "@/assets/icons/MailIcon";
import { SettingsIcon } from "@/assets/icons/SettingsIcon";
import { UserIcon } from "@/assets/icons/UserIcon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/common/shadcn/command";

/**
 * Showcase of a command palette with search input
 * and grouped suggestion items.
 *
 * @component
 */
export const CommandUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card id="command">
      <CardHeader variant="divider">
        <CardTitle>{t("command")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Command
          className="rounded-lg border border-inputBorder"
          value=""
          defaultValue=""
        >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <MailIcon className="mr-2 h-4 w-4" />
                <span>Email</span>
              </CommandItem>
              <CommandItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </CommandItem>
              <CommandItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
};
