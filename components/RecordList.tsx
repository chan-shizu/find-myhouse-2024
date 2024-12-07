"use client";

import { FC, useEffect, useState } from "react";

import { fetchRecords } from "@/app/ranking/actions/fetchRecords";
import { Record } from "@/type/record";

type Props = { currentStep: number };

export const RecordList: FC<Props> = ({ currentStep }) => {
  const [records, setRecords] = useState<Record[] | null>(null);

  useEffect(() => {
    (async () => {
      const newRecords = await fetchRecords();
      if (!newRecords) return;
      setRecords(newRecords);
    })();
  }, [currentStep]);

  if (records === null) return <p>エラーだああああ！！！</p>;

  return (
    <div className="flex flex-col divide-y overflow-auto pb-24">
      {records.map((record, index) => {
        let rankingTextColor = "";
        switch (index) {
          case 0:
            rankingTextColor = "text-yellow-500 font-bold text-2xl";
            break;
          case 1:
            rankingTextColor = "text-gray-500 font-bold text-2xl";
            break;
          case 2:
            rankingTextColor = "text-amber-800 font-bold text-2xl";
            break;
        }
        return (
          <div
            className="w-full text-2 py-3 bg-gray px-4 grid grid-cols-3 text-xl"
            key={`index-${record.name}-${record.time}`}
          >
            <p className={`${rankingTextColor}`}>{index + 1}位</p>
            <p>{record.name}</p>
            <p className="text-right">{record.time} 秒</p>
          </div>
        );
      })}
    </div>
  );
};
