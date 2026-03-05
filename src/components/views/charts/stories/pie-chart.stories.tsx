import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { PieChartTooltip } from "./ChartTooltip";

interface PieChartDemoProps {
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  showLegend?: boolean;
  showLabels?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
}

const defaultData = [
  { name: "Electronics", value: 4500 },
  { name: "Clothing", value: 3200 },
  { name: "Home & Garden", value: 2800 },
  { name: "Sports", value: 1800 },
  { name: "Books", value: 1200 },
];

const PieChartDemo = ({
  data = defaultData,
  colors,
  showLegend = true,
  showLabels = true,
  innerRadius = 0,
  outerRadius = 80,
  paddingAngle = 0,
}: PieChartDemoProps) => {
  const chartColors = colors ?? [
    "var(--color-chartPrimaryFill)",
    "var(--color-chartSecondaryFill)",
    "rgb(168, 162, 255)",
    "rgb(100, 200, 180)",
    "rgb(255, 150, 150)",
    "rgb(255, 200, 100)",
  ];

  const renderLabel = ({
    name = "",
    percent = 0,
    x = 0,
    y = 0,
    midAngle = 0,
    textAnchor = "middle",
    fill = "",
  }: {
    name?: string;
    percent?: number;
    x?: number;
    y?: number;
    midAngle?: number;
    textAnchor?: "start" | "middle" | "end" | "inherit";
    fill?: string;
  }) => {
    const RADIAN = Math.PI / 180;
    const offsetX = Math.cos(-midAngle * RADIAN) * 5;
    const offsetY = Math.sin(-midAngle * RADIAN) * 5;
    return (
      <text
        x={x + offsetX}
        y={y + offsetY}
        textAnchor={textAnchor}
        fill={fill}
        fontSize={12}
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-full text-primaryText">
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
            label={showLabels ? renderLabel : false}
            labelLine={showLabels}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip content={<PieChartTooltip />} isAnimationActive={false} />
          {showLegend && (
            <Legend
              content={({ payload }) => {
                const items = payload ?? [];
                const midpoint = Math.ceil(items.length / 2);
                const rows =
                  items.length > 3
                    ? [items.slice(0, midpoint), items.slice(midpoint)]
                    : [items];
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginTop: 8,
                    }}
                  >
                    {rows.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: "1.3rem",
                        }}
                      >
                        {row.map((entry, index) => (
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
                                backgroundColor: entry.color,
                                borderRadius: 2,
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                color: "var(--color-primaryText)",
                                fontSize: 14,
                              }}
                            >
                              {entry.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              }}
              verticalAlign="bottom"
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const meta: Meta<typeof PieChartDemo> = {
  title: "Charts/PieChart",
  component: PieChartDemo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A customizable pie chart for showing proportions and distributions.

**Features:**
- Configurable inner/outer radius (for donut variant)
- Optional labels with percentages
- Padding angle for separated segments
- Theme-aware colors

**Usage:**
\`\`\`tsx
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#3db985", "#5385c6", "#a8a2ff"];

<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
      {data.map((_, index) => (
        <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
    showLabels: {
      control: "boolean",
      description: "Show percentage labels on segments",
    },
    innerRadius: {
      control: { type: "range", min: 0, max: 70, step: 5 },
      description: "Inner radius (0 for pie, >0 for donut)",
    },
    outerRadius: {
      control: { type: "range", min: 50, max: 120, step: 5 },
      description: "Outer radius of the chart",
    },
    paddingAngle: {
      control: { type: "range", min: 0, max: 10, step: 1 },
      description: "Gap between segments in degrees",
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
type Story = StoryObj<typeof PieChartDemo>;

export const Default: Story = {
  args: {
    data: defaultData,
    showLegend: true,
    showLabels: true,
    innerRadius: 0,
    outerRadius: 80,
    paddingAngle: 0,
  },
};

export const NoLabels: Story = {
  args: {
    ...Default.args,
    showLabels: false,
  },
};

export const WithGaps: Story = {
  args: {
    ...Default.args,
    paddingAngle: 3,
    showLabels: false,
  },
};

export const LargerRadius: Story = {
  args: {
    ...Default.args,
    outerRadius: 100,
    showLabels: false,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: ["#f43f5e", "#8b5cf6", "#06b6d4", "#84cc16", "#f59e0b"],
    showLabels: false,
  },
};

const marketShareData = [
  { name: "Chrome", value: 65 },
  { name: "Safari", value: 19 },
  { name: "Firefox", value: 8 },
  { name: "Edge", value: 5 },
  { name: "Other", value: 3 },
];

export const MarketShare: Story = {
  args: {
    data: marketShareData,
    showLegend: true,
    showLabels: false,
    outerRadius: 90,
  },
};
