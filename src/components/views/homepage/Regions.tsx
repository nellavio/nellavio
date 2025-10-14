import { useEffect, useState } from "react";
import { DonutChart, List, ListItem } from "@tremor/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { useTranslateData } from "../../../hooks/useTranslateData";
import { RegionData, RegionsProps } from "./types";
import { Card } from "../../common/Card";
import { Badge } from "../../common/Badge";
import { useChartColors } from "../../../hooks/useChartColors";

const CustomRegionsLegend = ({ data }: { data: RegionData[] }) => {
  const { theme } = useTheme();
  const chartColors = useChartColors(
    theme as "dark" | "light"
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getColorForRegion = (regionKey: string) => {
    if (regionKey === "northamerica") {
      return chartColors.primary.fill;
    } else if (regionKey === "europe") {
      return chartColors.secondary.fill;
    }
    return "#A0AEC0";
  };

  return (
    <div className="flex flex-row justify-start gap-8 text-white w-full mb-6 1xl:mb-8 mt-5 1xl:mt-5 3xl:mb-12 3xl:mt-6 text-xs">
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          {isMounted ? (
            <div
              className="w-3 h-3 mr-2 rounded"
              style={{
                backgroundColor: getColorForRegion(
                  item.regionKey.toLowerCase()
                ),
              }}
            />
          ) : (
            <div className="w-3 h-3 mr-2 rounded bg-transparent"></div>
          )}
          <span className="text-xs 1xl:text-sm text-primaryText">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export const Regions = ({ regionsData }: RegionsProps) => {
  const t = useTranslations("homepage.regions");

  const processedData = regionsData.map((item) => ({
    ...item,
    regionKey: item.name.replace(/\s+/g, "").toLowerCase(),
  }));

  const translations = {
    "North America": t("northAmerica"),
    Europe: t("europe"),
  };

  const translatedData = useTranslateData(processedData, translations);

  return (
    <Card className="regionsCard" id="regions" title={t("title")}>
      <CustomRegionsLegend data={translatedData} />
      <DonutChart
        data={translatedData}
        category="sales"
        index="name"
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat("us").format(number)} $`
        }
        className="mt-2 1xl:mt-6 h-32 1xl:h-36 3xl:h-40 text-[0.9rem] 3xl:text-[1rem]"
      />
      <List className="mt-4 3xl:mt-6">
        {translatedData.map((city) => (
          <ListItem key={city.name}>
            {city.name}
            <Badge
              value={city.delta}
              type={city.deltaType === "increase" ? "increase" : "decrease"}
              accented
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
