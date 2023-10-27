import { useDispatch, useSelector } from "@/redux";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  changeChartType,
  changeDateRanges,
  changeInterval,
} from "./reportSlice";
import { Combobox } from "../ui/combobox";
import { type IChartType } from "@/types";
import { chartTypes } from "@/utils/constants";

export function ReportChartType() {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.report.chartType);

  return (
    <>
      <div className="w-full max-w-[200px]">
        <Combobox
          placeholder="Chart type"
          onChange={(value) => {
            dispatch(changeChartType(value as IChartType));
          }}
          value={type}
          items={Object.entries(chartTypes).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
        />
      </div>
    </>
  );
}
