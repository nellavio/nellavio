import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Input } from "../input";
import { Label } from "../label";

const meta: Meta<typeof Dialog> = {
  title: "UI Elements/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Modal dialog component for focused interactions requiring user attention.
Built on Radix UI Dialog primitive with accessibility support.

**Props:**
- \`open\` - Controlled open state
- \`onOpenChange\` - Callback when open state changes
- \`modal\` - Whether dialog blocks interaction with rest of page

**Subcomponents:**
- \`DialogTrigger\` - Button that opens the dialog
- \`DialogContent\` - Main content container with close button
- \`DialogHeader\` - Header section for title and description
- \`DialogFooter\` - Footer section for action buttons (\`footerVariant\`: \`default\`, \`centered\`)
- \`DialogTitle\` - Title heading
- \`DialogDescription\` - Descriptive text
- \`DialogClose\` - Button that closes the dialog
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      table: { disable: true },
    },
    modal: {
      table: { disable: true },
    },
  },
  args: {
    title: "Dialog Title",
    description: "This is a description of what this dialog does.",
  } as Record<string, unknown>,
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args) => {
    const { title, description } = args as Record<string, string>;
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-primaryText">Dialog content here.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const WithForm: Story = {
  args: {
    title: "Edit Profile",
    description: "Make changes to your profile here.",
  } as Record<string, unknown>,
  render: (args) => {
    const { title, description } = args as Record<string, string>;
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="md:w-[28rem]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="john@example.com" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const CenteredFooter: Story = {
  args: {
    title: "Confirm Action",
    description: "Please confirm that you want to proceed with this action.",
  } as Record<string, unknown>,
  render: (args) => {
    const { title, description } = args as Record<string, string>;
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="md:w-[24rem]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter footerVariant="centered">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const Destructive: Story = {
  args: {
    title: "Are you sure?",
    description:
      "This action cannot be undone. This will permanently delete your data.",
  } as Record<string, unknown>,
  render: (args) => {
    const { title, description } = args as Record<string, string>;
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </DialogTrigger>
        <DialogContent className="md:w-[24rem]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">Delete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
