"use client";

import { useTranslations } from "next-intl";

import { MailLineIcon } from "@/assets/icons/MailLineIcon";
import { SettingsLineIcon } from "@/assets/icons/SettingsLineIcon";
import { UserLineIcon } from "@/assets/icons/UserLineIcon";
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
                <MailLineIcon className="mr-2 h-4 w-4" />
                <span>Email</span>
              </CommandItem>
              <CommandItem>
                <UserLineIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </CommandItem>
              <CommandItem>
                <SettingsLineIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
};
