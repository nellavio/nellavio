import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { PieChartTooltip } from "./ChartTooltip";

interface DonutChartDemoProps {
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  centerLabel?: string;
  centerValue?: string;
}

const defaultData = [
  { name: "Completed", value: 68 },
  { name: "In Progress", value: 22 },
  { name: "Pending", value: 10 },
];

const DonutChartDemo = ({
  data = defaultData,
  colors,
  showLegend = true,
  innerRadius = 60,
  outerRadius = 90,
  paddingAngle = 2,
  centerLabel,
  centerValue,
}: DonutChartDemoProps) => {
  const chartColors = colors ?? [
    "var(--color-chartPrimaryFill)",
    "var(--color-chartSecondaryFill)",
    "rgb(168, 162, 255)",
    "rgb(100, 200, 180)",
    "rgb(255, 150, 150)",
  ];

  const legendItems = data.map((entry, index) => ({
    name: entry.name,
    color: chartColors[index % chartColors.length],
  }));
  const legendMidpoint = Math.ceil(legendItems.length / 2);
  const legendRows =
    legendItems.length > 3
      ? [
          legendItems.slice(0, legendMidpoint),
          legendItems.slice(legendMidpoint),
        ]
      : [legendItems];

  return (
    <div className="w-full h-full text-primaryText flex flex-col">
      <div className="flex-1 relative min-h-0">
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {centerValue && (
              <span className="text-2xl font-bold text-primaryText">
                {centerValue}
              </span>
            )}
            {centerLabel && (
              <span className="text-sm text-secondaryText">{centerLabel}</span>
            )}
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={paddingAngle}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              content={
                <PieChartTooltip valueFormatter={(value) => `${value}%`} />
              }
              isAnimationActive={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {showLegend && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            paddingTop: 8,
          }}
        >
          {legendRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1.3rem",
              }}
            >
              {row.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: item.color,
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{ color: "var(--color-primaryText)", fontSize: 14 }}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof DonutChartDemo> = {
  title: "Charts/DonutChart",
  component: DonutChartDemo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A donut chart (pie with inner radius) with optional center label.

**Features:**
- Configurable inner/outer radius
- Center text for key metrics
- Padding between segments
- Theme-aware colors

**Usage:**
\`\`\`tsx
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={data}
      dataKey="value"
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={90}
    >
      {data.map((_, index) => (
        <Cell key={index} fill={COLORS[index]} />
      ))}
    </Pie>
  </PieChart>
</ResponsiveContainer>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: "object",
      description: "Array of { name, value } objects",
    },
    colors: { table: { disable: true } },
    showLegend: {
      control: "boolean",
      description: "Show legend below chart",
    },
    innerRadius: {
      control: { type: "range", min: 30, max: 80, step: 5 },
      description: "Inner radius of the donut",
    },
    outerRadius: {
      control: { type: "range", min: 60, max: 120, step: 5 },
      description: "Outer radius of the donut",
    },
    paddingAngle: {
      control: { type: "range", min: 0, max: 10, step: 1 },
      description: "Gap between segments",
    },
    centerLabel: {
      control: "text",
      description: "Small label text in center",
    },
    centerValue: {
      control: "text",
      description: "Large value text in center",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-primaryBg rounded-lg w-md aspect-[4/3]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DonutChartDemo>;

export const Default: Story = {
  args: {
    data: defaultData,
    showLegend: true,
    innerRadius: 60,
    outerRadius: 90,
    paddingAngle: 2,
  },
};

export const WithCenterLabel: Story = {
  args: {
    ...Default.args,
    centerValue: "68%",
    centerLabel: "Completed",
  },
};

export const ThinDonut: Story = {
  args: {
    ...Default.args,
    innerRadius: 70,
    outerRadius: 90,
    centerValue: "100",
    centerLabel: "Tasks",
  },
};

export const ThickDonut: Story = {
  args: {
    ...Default.args,
    innerRadius: 40,
    outerRadius: 90,
  },
};

export const NoGaps: Story = {
  args: {
    ...Default.args,
    paddingAngle: 0,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: ["#22c55e", "#eab308", "#ef4444"],
    centerValue: "68%",
    centerLabel: "Success Rate",
  },
};

const storageData = [
  { name: "Used", value: 75 },
  { name: "Available", value: 25 },
];

export const StorageUsage: Story = {
  args: {
    data: storageData,
    colors: ["var(--color-chartPrimaryFill)", "rgb(100, 100, 100)"],
    innerRadius: 65,
    outerRadius: 85,
    paddingAngle: 0,
    centerValue: "75%",
    centerLabel: "Storage Used",
    showLegend: false,
  },
};

const budgetData = [
  { name: "Marketing", value: 35 },
  { name: "Development", value: 30 },
  { name: "Operations", value: 20 },
  { name: "Sales", value: 15 },
];

export const BudgetAllocation: Story = {
  args: {
    data: budgetData,
    innerRadius: 55,
    outerRadius: 85,
    paddingAngle: 3,
    showLegend: true,
  },
};
