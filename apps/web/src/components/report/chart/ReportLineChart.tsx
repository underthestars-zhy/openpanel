import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ReportLineChartTooltip } from "./ReportLineChartTooltip";
import { useFormatDateInterval } from "@/hooks/useFormatDateInterval";
import { type IChartData, type IInterval } from "@/types";
import { getChartColor } from "@/utils/theme";
import { ReportTable } from "./ReportTable";
import { useEffect, useRef, useState } from "react";
import { AutoSizer } from "@/components/AutoSizer";
import { useChartContext } from "./ChartProvider";

type ReportLineChartProps = {
  data: IChartData;
  interval: IInterval;
};

export function ReportLineChart({ interval, data }: ReportLineChartProps) {
  const { editMode } = useChartContext();
  const [visibleSeries, setVisibleSeries] = useState<string[]>([]);
  const formatDate = useFormatDateInterval(interval);

  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current && data) {
      const max = 20;

      setVisibleSeries(
        data?.series?.slice(0, max).map((serie) => serie.name) ?? [],
      );
      // ref.current = true;
    }
  }, [data]);

  return (
    <>
      <AutoSizer disableHeight>
        {({ width }) => (
          <LineChart width={width} height={Math.min(width * 0.5, 400)}>
            <YAxis dataKey={"count"} width={30} fontSize={12}></YAxis>
            <Tooltip content={<ReportLineChartTooltip />} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              fontSize={12}
              dataKey="date"
              tickFormatter={(m: string) => {
                return formatDate(m);
              }}
              tickLine={false}
              allowDuplicatedCategory={false}
            />
            {data?.series
              .filter((serie) => {
                return visibleSeries.includes(serie.name);
              })
              .map((serie) => {
                const realIndex = data?.series.findIndex(
                  (item) => item.name === serie.name,
                );
                const key = serie.name;
                const strokeColor = getChartColor(realIndex);
                return (
                  <Line
                    type="monotone"
                    key={key}
                    isAnimationActive={false}
                    strokeWidth={2}
                    dataKey="count"
                    stroke={strokeColor}
                    data={serie.data}
                    name={serie.name}
                  />
                );
              })}
          </LineChart>
        )}
      </AutoSizer>
      {editMode && (
        <ReportTable
          data={data}
          visibleSeries={visibleSeries}
          setVisibleSeries={setVisibleSeries}
        />
      )}
    </>
  );
}
