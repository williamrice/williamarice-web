import { Progress } from "@/components/ui/progress";
import { FuelTransaction } from "@prisma/client";
import {
  Decimal,
  PrismaClientRustPanicError,
} from "@prisma/client/runtime/library";
import React from "react";
import { Month } from "./FuelTransactionListDisplay";

type Props = {
  month: Month;
  year: number;
  data: FuelTransaction[] | undefined;
};

const ALLOCATED_FUEL = 180;

function MonthlyFuelProgress({ month, year, data }: Props) {
  const filteredData = data?.filter((transaction) => {
    const date = new Date(transaction.date);
    const monthValue = date.getMonth() + 1;
    const yearValue = date.getFullYear();
    return monthValue === month.value && yearValue === year;
  });

  const progressTotal =
    filteredData?.reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0) ?? 0;

  const progressValue = progressTotal / ALLOCATED_FUEL;

  return (
    <div className="w-full flex-col items-center justify-center">
      <div className="w-full text-center mb-4">
        Monthly Progress for {month.name} {year}
      </div>
      <div className="w-full text-center mb-4">
        {progressTotal.toFixed(2)} / {ALLOCATED_FUEL}
      </div>
      <div>
        <Progress
          className="w-[100%] h-10"
          value={progressValue * 100}
          max={ALLOCATED_FUEL}
          getValueLabel={(value, max) => `${value}/${ALLOCATED_FUEL}`}
        />
      </div>
    </div>
  );
}

export default MonthlyFuelProgress;
