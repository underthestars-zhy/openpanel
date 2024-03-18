'use client';

import { api } from '@/app/_trpc/client';
import { ColorSquare } from '@/components/color-square';
import { Combobox } from '@/components/ui/combobox';
import { useAppParams } from '@/hooks/useAppParams';
import { useDispatch, useSelector } from '@/redux';
import { SplitIcon } from 'lucide-react';

import type { IChartBreakdown } from '@openpanel/validation';

import { addBreakdown, changeBreakdown, removeBreakdown } from '../reportSlice';
import { ReportBreakdownMore } from './ReportBreakdownMore';
import type { ReportEventMoreProps } from './ReportEventMore';

export function ReportBreakdowns() {
  const { projectId } = useAppParams();
  const selectedBreakdowns = useSelector((state) => state.report.breakdowns);
  const dispatch = useDispatch();
  const propertiesQuery = api.chart.properties.useQuery({
    projectId,
  });
  const propertiesCombobox = (propertiesQuery.data ?? []).map((item) => ({
    value: item,
    label: item, // <RenderDots truncate>{item}</RenderDots>,
  }));

  const handleMore = (breakdown: IChartBreakdown) => {
    const callback: ReportEventMoreProps['onClick'] = (action) => {
      switch (action) {
        case 'remove': {
          return dispatch(removeBreakdown(breakdown));
        }
      }
    };

    return callback;
  };

  return (
    <div>
      <h3 className="mb-2 font-medium">Breakdown</h3>
      <div className="flex flex-col gap-4">
        {selectedBreakdowns.map((item, index) => {
          return (
            <div key={item.name} className="rounded-lg border bg-slate-50">
              <div className="flex items-center gap-2 p-2 px-4">
                <ColorSquare>{index}</ColorSquare>
                <Combobox
                  icon={SplitIcon}
                  className="flex-1"
                  searchable
                  value={item.name}
                  onChange={(value) => {
                    dispatch(
                      changeBreakdown({
                        ...item,
                        name: value,
                      })
                    );
                  }}
                  items={propertiesCombobox}
                  placeholder="Select..."
                />
                <ReportBreakdownMore onClick={handleMore(item)} />
              </div>
            </div>
          );
        })}

        {selectedBreakdowns.length === 0 && (
          <Combobox
            icon={SplitIcon}
            searchable
            value={''}
            onChange={(value) => {
              dispatch(
                addBreakdown({
                  name: value,
                })
              );
            }}
            items={propertiesCombobox}
            placeholder="Select breakdown"
          />
        )}
      </div>
    </div>
  );
}
