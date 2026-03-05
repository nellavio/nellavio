import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HelpCircle } from "lucide-react";

import { Button } from "../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "UI Elements/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Tooltip component for displaying contextual information on hover or focus.
Built on Radix UI Tooltip primitive with smooth animations.

**Props (TooltipProvider):**
- \`delayDuration\` - Delay before showing tooltip (ms)

**Subcomponents:**
- \`TooltipProvider\` - Required wrapper that enables tooltips (\`delayDuration\` controls show delay)
- \`TooltipTrigger\` - Element that shows tooltip on hover/focus
- \`TooltipContent\` - Content container with styling and animations (\`side\`: \`top\`, \`right\`, \`bottom\`, \`left\`; \`align\`: \`start\`, \`center\`, \`end\`; \`sideOffset\` for spacing)
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    delayDuration: {
      control: { type: "number", min: 0, max: 2000, step: 50 },
      description: "Delay before showing tooltip (ms)",
    },
  },
  args: {
    delayDuration: 100,
    content: "Tooltip content",
  } as Record<string, unknown>,
  decorators: [
    (Story) => (
      <div className="p-12 bg-primaryBg rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => {
    const { content, delayDuration } = args as Record<string, unknown>;
    return (
      <TooltipProvider delayDuration={delayDuration as number}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{content as string}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
};

export const WithIcon: Story = {
  args: {
    content: "Help information",
  } as Record<string, unknown>,
  render: (args) => {
    const { content, delayDuration } = args as Record<string, unknown>;
    return (
      <TooltipProvider delayDuration={delayDuration as number}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Help">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{content as string}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
};

export const Positions: Story = {
  render: (args) => {
    const { content, delayDuration } = args as Record<string, unknown>;
    return (
      <TooltipProvider delayDuration={delayDuration as number}>
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                Top
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">{content as string}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                Right
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{content as string}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                Bottom
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{content as string}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                Left
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">{content as string}</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
  },
};
