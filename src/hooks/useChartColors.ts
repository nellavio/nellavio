interface ChartColors {
  primary: {
    stroke: string;
    fill: string;
    disabled: string;
    grid: string;
    inverted: string;
  };
  secondary: {
    stroke: string;
    fill: string;
    disabled: string;
    grid: string;
    inverted: string;
  };
}

export const useChartColors = (
  theme: "dark" | "light"
): ChartColors => {
  const themeColors = {
    dark: {
      primary: {
        stroke: "rgb(61, 185, 133)",
        fill: "rgb(61, 185, 133)",
        disabled: "rgb(255,255,255,0.1)",
        grid: "rgba(255,255,255,0.1)",
        inverted: "rgb(61, 185, 133)",
      },
      secondary: {
        stroke: "rgb(83,133,198)",
        fill: "rgb(83,133,198)",
        disabled: "rgb(255,255,255,0.1)",
        grid: "rgba(255,255,255,0.1)",
        inverted: "rgb(83,133,198)",
      },
    },
    light: {
      primary: {
        stroke: "rgb(118, 167, 247)",
        fill: "rgb(118, 167, 247)",
        disabled: "rgb(125, 214, 230)",
        grid: "rgba(0,0,0,0.2)",
        inverted: "rgb(125, 214, 230)",
      },
      secondary: {
        stroke: "rgb(125, 214, 230)",
        fill: "rgb(125, 214, 230)",
        disabled: "rgb(255,255,255,0.1)",
        grid: "rgba(255,255,255,0.1)",
        inverted: "rgb(118, 167, 247)",
      },
    },
  };

  if (!theme) {
    if (typeof document !== "undefined") {
      if (document.documentElement.classList.contains("dark")) {
        return themeColors.dark;
      } else if (document.documentElement.classList.contains("light")) {
        return themeColors.light;
      }
    }

    return themeColors.dark;
  }

  return themeColors[theme] || themeColors.dark;
};
