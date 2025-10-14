import {
  Col,
  DeltaBar,
  DonutChart,
  Flex,
  List,
  ListItem,
  Text,
  Bold,
  Grid,
} from "@tremor/react";
import { useTranslations } from "next-intl";

import { AssetPerformanceProps } from "./types";
import { Card } from "../../common/Card";

export const AssetPerformance = ({
  assetPerformanceData,
}: AssetPerformanceProps) => {
  const t = useTranslations("analytics.assetPerformance");

  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()} $`;

  return (
    <Card
      className="assetPerformanceCard h-full"
      id="assetPerformance"
      title={t("title")}
    >
      <Grid numItemsLg={3} className="mt-4 1xl:mt-6 3xl:mt-8 gap-x-10 gap-y-10">
        <Flex>
          <DonutChart
            data={assetPerformanceData}
            category="sales"
            variant="donut"
            valueFormatter={valueFormatter}
            className="h-40 1xl:h-44 3xl:h-52"
          />
        </Flex>
        <Col numColSpan={1} numColSpanLg={2}>
          <Flex className="block md:hidden lg:block">
            <Text className="text-secondaryText">
              <Bold>+/-% {t("sinceTransaction")} </Bold>
            </Text>
          </Flex>
          <div className=" sm:max-h-32 lg:max-h-full overflow-auto pr-2">
            <List className="mt-1 1xl:mt-2">
              {assetPerformanceData.map((asset, index) => (
                <ListItem
                  key={asset.name}
                  className={`
                  ${index === 7 ? "hidden 3xl:flex" : ""} 
                  ${index === 6 ? "hidden 1xl:flex" : ""} 
                  pb-2 pt-2 1xl:py-2`}
                >
                  <div className="text-xs 1xl:text-sm 3xl:text-base text-secondaryText">
                    {" "}
                    {asset.name}{" "}
                  </div>
                  <div>
                    <Flex justifyContent="end" className="space-x-4">
                      <Text color={asset.status} className="ml-2">
                        {asset.delta}%{" "}
                      </Text>
                      <div className="hidden lg:block w-44">
                        <DeltaBar
                          value={asset.delta}
                          isIncreasePositive={true}
                          tooltip=""
                        />
                      </div>
                    </Flex>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </Col>
      </Grid>
    </Card>
  );
};
