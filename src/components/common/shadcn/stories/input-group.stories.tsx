import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DollarSign, Mail, Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../input-group";

const meta: Meta<typeof InputGroup> = {
  title: "Forms/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Container component for inputs with addons like icons, buttons, or text.
Automatically detects addon positions and adjusts input padding accordingly.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`children\` - InputGroupInput and InputGroupAddon components

**Subcomponents:**
- \`InputGroupInput\` - Input element with automatic padding adjustment (\`variant\`: \`default\`, \`navbarSearch\`; \`fixedHeight\` for fixed height mode)
- \`InputGroupAddon\` - Container for icons/buttons (\`align\`: \`inline-start\`, \`inline-end\`, \`block-start\`, \`block-end\`)
- \`InputGroupButton\` - Interactive button within addon (\`variant\`: \`default\`, \`destructive\`, \`outline\`, \`secondary\`, \`ghost\`, \`link\`; \`size\`: \`xs\`, \`icon-xs\`, \`sm\`, \`icon-sm\`)
- \`InputGroupText\` - Non-interactive text display
- \`InputGroupTextarea\` - Textarea element with automatic padding adjustment
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Input placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  } as Meta["argTypes"],
  args: {
    placeholder: "Search...",
    disabled: false,
  } as Record<string, unknown>,
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const WithLeftIcon: Story = {
  render: (args) => {
    const { placeholder, disabled } = args as Record<string, unknown>;
    return (
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder={placeholder as string}
          disabled={disabled as boolean}
        />
      </InputGroup>
    );
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: "Enter email",
  } as Record<string, unknown>,
  render: (args) => {
    const { placeholder, disabled } = args as Record<string, unknown>;
    return (
      <InputGroup>
        <InputGroupInput
          type="email"
          placeholder={placeholder as string}
          disabled={disabled as boolean}
        />
        <InputGroupAddon align="inline-end">
          <Mail className="h-4 w-4" />
        </InputGroupAddon>
      </InputGroup>
    );
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: "Search products...",
  } as Record<string, unknown>,
  render: (args) => {
    const { placeholder, disabled } = args as Record<string, unknown>;
    return (
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder={placeholder as string}
          disabled={disabled as boolean}
        />
        <InputGroupAddon align="inline-end">
          <Mail className="h-4 w-4" />
        </InputGroupAddon>
      </InputGroup>
    );
  },
};

export const WithText: Story = {
  args: {
    placeholder: "0.00",
  } as Record<string, unknown>,
  render: (args) => {
    const { placeholder, disabled } = args as Record<string, unknown>;
    return (
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <DollarSign className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput
          type="number"
          placeholder={placeholder as string}
          disabled={disabled as boolean}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  } as Record<string, unknown>,
  render: (args) => {
    const { placeholder, disabled } = args as Record<string, unknown>;
    return (
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder={placeholder as string}
          disabled={disabled as boolean}
        />
      </InputGroup>
    );
  },
};
