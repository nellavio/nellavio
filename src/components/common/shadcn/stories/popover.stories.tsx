import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

const meta: Meta<typeof Popover> = {
  title: "UI Elements/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Popover component for displaying floating content triggered by user interaction.
Built on Radix UI Popover primitive with smooth animations.

**Props:**
- \`open\` - Controlled open state
- \`onOpenChange\` - Callback when open state changes
- \`modal\` - Whether popover is modal

**Subcomponents:**
- \`PopoverTrigger\` - Element that opens the popover when clicked
- \`PopoverContent\` - Content container with positioning and animations (\`side\`: \`top\`, \`right\`, \`bottom\`, \`left\`; \`align\`: \`start\`, \`center\`, \`end\`; \`sideOffset\` for spacing)
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
  decorators: [
    (Story) => (
      <div className="p-12 bg-primaryBg rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-primaryText">Dimensions</h4>
            <p className="text-sm text-secondaryText">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100%" className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="25px" className="col-span-2" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Top
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-48">
          <p className="text-sm text-primaryText">Top popover</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Right
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-48">
          <p className="text-sm text-primaryText">Right popover</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Bottom
          </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-48">
          <p className="text-sm text-primaryText">Bottom popover</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Left
          </Button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-48">
          <p className="text-sm text-primaryText">Left popover</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
