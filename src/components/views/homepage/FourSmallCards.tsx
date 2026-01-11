import { useTranslations } from "next-intl";

import { useTranslateData } from "../../../hooks/useTranslateData";
import { FourSmallCardsProps } from "./types";
import { Card } from "../../common/Card";
import { Badge } from "../../common/shadcn/badge";

export const FourSmallCards = ({ fourSmallCardsData }: FourSmallCardsProps) => {
  const t = useTranslations("homepage.fourSmallCards");
  const translations = {
    Sales: t("sales"),
    Profit: t("profit"),
    Traffic: t("traffic"),
    Customers: t("customers"),
    "Last 3 weeks": t("Last 3 weeks"),
    "Last month": t("Last month"),
    Yesterday: t("Yesterday"),
    "Last week": t("Last week"),
  };

  const translatedData = useTranslateData(fourSmallCardsData, translations);

  const cardIds = ["salesCard", "profitCard", "trafficCard", "customersCard"];

  return (
    <>
      {translatedData.map((item, index) => {
        return (
          <Card
            key={`${item.title}-${index}`}
            id={cardIds[index]}
            className="h-46 sm-24 lg:h-28 1xl:h-28 pt-4 1xl:pt-5 3xl:p-6 3xl:h-32 pr-[0.8rem] md:!pr-[0.5rem] lg:!pr-[0.8rem] xl:!pr-[0.1rem] 2xl:!pr-[1.2rem] pl-5 2xl:pl-7"
          >
            <div className="flex flex-col">
              <div className="text-primaryText font-medium text-md sm:text-md lg:text-xs 1xl:text-sm tracking-tight mb-1">
                {item.title}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[1.75rem] lg:text-[2rem] 1xl:text-[2.25rem] 3xl:text-4xl font-semibold text-primaryText">
                  {item.metric}
                </div>
                <Badge
                  variant={item.increased ? "default" : "destructive"}
                  className={
                    item.increased ? "bg-green-600 hover:bg-green-600/80" : ""
                  }
                >
                  {item.increased ? "+" : "-"}
                  {item.changeValue}%
                </Badge>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {item.changeText}
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
};
