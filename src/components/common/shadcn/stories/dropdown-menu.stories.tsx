import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CloudIcon } from "@/assets/icons/CloudIcon";
import { CreditCardIcon } from "@/assets/icons/CreditCardIcon";
import { KeyboardIcon } from "@/assets/icons/KeyboardIcon";
import { LogoutIcon } from "@/assets/icons/LogoutIcon";
import { MailIcon } from "@/assets/icons/MailIcon";
import { MessageSquareIcon } from "@/assets/icons/MessageSquareIcon";
import { PlusCircleIcon } from "@/assets/icons/PlusCircleIcon";
import { SettingsIcon } from "@/assets/icons/SettingsIcon";
import { UserIcon } from "@/assets/icons/UserIcon";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../dropdown-menu";

const meta: Meta<typeof DropdownMenu> = {
  title: "UI Elements/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Dropdown menu component for displaying a list of actions or options.
Built on Radix UI DropdownMenu primitive with keyboard navigation.

**Subcomponents:**
- \`DropdownMenuTrigger\` - Button that opens the menu
- \`DropdownMenuContent\` - Menu content container
- \`DropdownMenuItem\` - Interactive menu item
- \`DropdownMenuLabel\` - Non-interactive label
- \`DropdownMenuSeparator\` - Visual divider
- \`DropdownMenuShortcut\` - Keyboard shortcut hint
- \`DropdownMenuGroup\` - Groups related menu items
- \`DropdownMenuSub\` - Nested submenu container
- \`DropdownMenuSubTrigger\` - Button that opens a submenu
- \`DropdownMenuSubContent\` - Content container for submenu
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-10 bg-primaryBg rounded-lg min-h-75">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutIcon className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithLabelsAndGroups: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon className="mr-2 h-4 w-4" />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <KeyboardIcon className="mr-2 h-4 w-4" />
            Shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutIcon className="mr-2 h-4 w-4" />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem>
          <MailIcon className="mr-2 h-4 w-4" />
          Email
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquareIcon className="mr-2 h-4 w-4" />
          Message
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Invite users
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <MailIcon className="mr-2 h-4 w-4" />
              Email invite
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquareIcon className="mr-2 h-4 w-4" />
              Message invite
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CloudIcon className="mr-2 h-4 w-4" />
          API
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
