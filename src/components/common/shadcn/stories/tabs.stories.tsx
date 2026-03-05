import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI Elements/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Root tabs component that manages tab state and navigation.
Uses Radix UI for accessibility and keyboard navigation.

**Props:**
- \`defaultValue\` - Default active tab value
- \`className\` - Additional CSS classes to apply

**Subcomponents:**
- \`TabsList\` - Container for tab triggers (\`variant\`: \`default\`, \`line\`)
- \`TabsTrigger\` - Individual tab button that activates its content panel (\`variant\`: \`default\`, \`line\`)
- \`TabsContent\` - Content panel displayed when tab is active
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "line"],
      description: "Visual style variant for TabsList and TabsTrigger",
    },
  } as Meta["argTypes"],
  args: {
    variant: "default",
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
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => {
    const { variant } = args as Record<string, string>;
    return (
      <Tabs defaultValue="account" className="w-80">
        <TabsList
          variant={variant as "default" | "line"}
          className="grid w-full grid-cols-2"
        >
          <TabsTrigger variant={variant as "default" | "line"} value="account">
            Account
          </TabsTrigger>
          <TabsTrigger variant={variant as "default" | "line"} value="password">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-4">
          <p className="text-sm text-primaryText">
            Manage your account settings here.
          </p>
        </TabsContent>
        <TabsContent value="password" className="mt-4">
          <p className="text-sm text-primaryText">Change your password here.</p>
        </TabsContent>
      </Tabs>
    );
  },
};

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList variant="line" className="grid w-full grid-cols-3">
        <TabsTrigger variant="line" value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger variant="line" value="analytics">
          Analytics
        </TabsTrigger>
        <TabsTrigger variant="line" value="reports">
          Reports
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <p className="text-sm text-primaryText">Overview content</p>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <p className="text-sm text-primaryText">Analytics content</p>
      </TabsContent>
      <TabsContent value="reports" className="mt-4">
        <p className="text-sm text-primaryText">Reports content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const ThreeTabs: Story = {
  render: (args) => {
    const { variant } = args as Record<string, string>;
    return (
      <Tabs defaultValue="tab1" className="w-96">
        <TabsList
          variant={variant as "default" | "line"}
          className="grid w-full grid-cols-3"
        >
          <TabsTrigger variant={variant as "default" | "line"} value="tab1">
            Overview
          </TabsTrigger>
          <TabsTrigger variant={variant as "default" | "line"} value="tab2">
            Analytics
          </TabsTrigger>
          <TabsTrigger variant={variant as "default" | "line"} value="tab3">
            Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="mt-4">
          <p className="text-sm text-primaryText">Overview content</p>
        </TabsContent>
        <TabsContent value="tab2" className="mt-4">
          <p className="text-sm text-primaryText">Analytics content</p>
        </TabsContent>
        <TabsContent value="tab3" className="mt-4">
          <p className="text-sm text-primaryText">Reports content</p>
        </TabsContent>
      </Tabs>
    );
  },
};
