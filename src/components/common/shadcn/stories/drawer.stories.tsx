import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import { Input } from "../input";
import { Label } from "../label";

const meta: Meta<typeof Drawer> = {
  title: "UI Elements/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Drawer component that slides in from screen edges for secondary content.
Built on Vaul library with support for multiple directions.

**Props:**
- \`direction\` - Slide direction: \`top\`, \`bottom\`, \`left\`, \`right\`

**Subcomponents:**
- \`DrawerTrigger\` - Button that opens the drawer
- \`DrawerContent\` - Main content container with directional animations
- \`DrawerHeader\` - Header section for title and description
- \`DrawerFooter\` - Footer section for action buttons
- \`DrawerTitle\` - Title heading
- \`DrawerDescription\` - Descriptive text
- \`DrawerClose\` - Button to close the drawer
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Slide direction",
    },
  },
  args: {
    direction: "bottom",
    title: "Drawer Title",
    description: "This is a drawer with description text.",
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
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: (args) => {
    const { direction, title, description } = args as Record<string, string>;
    return (
      <Drawer direction={direction as "top" | "bottom" | "left" | "right"}>
        <DrawerTrigger asChild>
          <Button>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <p className="text-sm text-primaryText">
              Drawer content goes here.
            </p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Submit</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const WithForm: Story = {
  args: {
    direction: "right",
    title: "Settings",
    description: "Manage your preferences.",
  } as Record<string, unknown>,
  render: (args) => {
    const { direction, title, description } = args as Record<string, string>;
    return (
      <Drawer direction={direction as "top" | "bottom" | "left" | "right"}>
        <DrawerTrigger asChild>
          <Button>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Save</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const Navigation: Story = {
  args: {
    direction: "left",
    title: "Navigation",
    description: "Browse menu items.",
  } as Record<string, unknown>,
  render: (args) => {
    const { direction, title, description } = args as Record<string, string>;
    return (
      <Drawer direction={direction as "top" | "bottom" | "left" | "right"}>
        <DrawerTrigger asChild>
          <Button>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Products
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Customers
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  },
};
