"use client";

import { Bet } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import BetTableActionMenu from "./BetTableActionMenu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const BetTableColumns: ColumnDef<Bet>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const bet: Bet = row.original;

      return <BetTableActionMenu bet={bet} />;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue("date")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "amountBet",
    header: "Bet Amount",
  },
  {
    accessorKey: "amountWon",
    header: "Amount Won",
  },
  {
    header: "Profit/Loss",
    cell: ({ row }) => {
      const profit = ((row.getValue("amountWon") as number) -
        (row.getValue("amountBet") as number)) as number;
      return (
        <div className="text-right">
          {row.original.status === "PENDING" ? "-" : profit.toFixed(2)}
        </div>
      );
    },
  },
];
