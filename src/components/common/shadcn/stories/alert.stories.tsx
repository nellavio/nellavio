import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../alert";

const meta: Meta<typeof Alert> = {
  title: "UI Elements/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Alert notification container for displaying important messages and notifications.
Supports optional icons and multiple visual variants for different message types.

**Props:**
- \`className\` - Additional CSS classes to apply
- \`variant\` - Visual style variant: \`default\`, \`destructive\`, \`success\`
- \`children\` - Alert content including title and description
- \`ref\` - Forwarded ref to the alert container element

**Subcomponents:**
- \`AlertTitle\` - Title heading for the alert notification
- \`AlertDescription\` - Description text content for the alert
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success"],
      description: "Visual style variant",
    },
  },
  args: {
    variant: "default",
    title: "Information",
    description: "This is an informational alert.",
  } as Record<string, unknown>,
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => {
    const { title, description, ...rest } = args as Record<string, unknown>;
    return (
      <Alert {...rest}>
        <Info className="h-4 w-4" />
        <AlertTitle>{title as string}</AlertTitle>
        <AlertDescription>{description as string}</AlertDescription>
      </Alert>
    );
  },
  args: { variant: "default" },
};

export const Destructive: Story = {
  render: (args) => {
    const { title, description, ...rest } = args as Record<string, unknown>;
    return (
      <Alert {...rest}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title as string}</AlertTitle>
        <AlertDescription>{description as string}</AlertDescription>
      </Alert>
    );
  },
  args: {
    variant: "destructive",
    title: "Error",
    description: "Something went wrong.",
  } as Record<string, unknown>,
};

export const Success: Story = {
  render: (args) => {
    const { title, description, ...rest } = args as Record<string, unknown>;
    return (
      <Alert {...rest}>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>{title as string}</AlertTitle>
        <AlertDescription>{description as string}</AlertDescription>
      </Alert>
    );
  },
  args: {
    variant: "success",
    title: "Success",
    description: "Your changes have been saved.",
  } as Record<string, unknown>,
};
