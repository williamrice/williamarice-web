"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  getFuelTransactions,
  deleteFuelTransactionById,
} from "../actions";
import { Decimal } from "@prisma/client/runtime/library";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FuelTransactionAddForm } from "./FuelTransactionAddForm";
import { useRouter } from "next/navigation";
import { SyncLoader } from "react-spinners";
import { useTheme } from "next-themes";
import MonthlyFuelProgress from "./MonthlyFuelProgress";

export type Transaction =
  | {
      id: string;
      amount: number | Decimal;
      date: Date;
      createdAt: Date;
      updatedAt: Date;
      userId?: string;
    }
  | undefined;

export type Month = {
  name: string;
  value: number;
};

export const isWithinMonthYear = (
  row: { getValue: (arg0: any) => string | number | Date },
  columnId: any,
  value: any
) => {
  const { month, year } = value;
  const date = new Date(row.getValue(columnId));

  const monthValue = date.getMonth() + 1;
  const yearValue = date.getFullYear();

  return monthValue === month && yearValue === year;
};

export const columns: ColumnDef<Transaction | undefined>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: "date",
    filterFn: isWithinMonthYear,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue("date")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "decimal",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "delete",
    header: () => <div className="text-right"></div>,
    cell: ({ row }) => {},
  },
];

const months: Month[] = [
  {
    value: 1,
    name: "January",
  },
  {
    value: 2,
    name: "February",
  },
  {
    value: 3,
    name: "March",
  },
  {
    value: 4,
    name: "April",
  },
  {
    value: 5,
    name: "May",
  },
  {
    value: 6,
    name: "June",
  },
  {
    value: 7,
    name: "July",
  },
  {
    value: 8,
    name: "August",
  },
  {
    value: 9,
    name: "September",
  },
  {
    value: 10,
    name: "October",
  },
  {
    value: 11,
    name: "November",
  },
  {
    value: 12,
    name: "December",
  },
];

const years = [
  2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034,
];

export default function FuelTransactionListDisplay() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [month, setMonth] = React.useState<Month>({
    name: new Date().toLocaleString("default", { month: "long" }),
    value: new Date().getMonth() + 1,
  });
  const [year, setYear] = React.useState(2024);
  const [data, setData] = React.useState<Transaction[] | undefined>([]);
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [successFormSubmit, setSuccessFormSubmit] = React.useState(false);
  const [successDelete, setSuccessDelete] = React.useState(false);

  const { theme } = useTheme();

  const router = useRouter();

  React.useEffect(() => {
    setColumnFilters([
      {
        id: "date",
        value: {
          month: month.value,
          year: year,
        },
      },
    ]);
  }, [month, year]);

  React.useEffect(() => {
    async function getTransactions() {
      setLoading(true);
      const transactions = getFuelTransactions();
      return transactions || [];
    }
    const newData = getTransactions().then((data) => {
      setData(data || []);
      setLoading(false);
    });
  }, [successFormSubmit, successDelete]);

  const table = useReactTable({
    // @ts-ignore next-line
    data,
    columns,
    filterFns: {
      isWithinMonthYear: isWithinMonthYear,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    //getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* @ts-ignore next-line */}
      <MonthlyFuelProgress month={month} year={year} data={data} />
      <div className="flex justify-center items-center py-4 gap-2">
        <div>
          <Popover open={showModal}>
            <PopoverTrigger asChild>
              <Button
                onClick={() => setShowModal(!showModal)}
                variant="outline"
              >
                Add Fuel
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              sideOffset={20}
              align="start"
              alignOffset={30}
            >
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Fuel Transaction</h4>
                  <p className="text-sm text-muted-foreground">
                    Add a new fuel transaction
                  </p>
                </div>
                <div className="grid gap-2">
                  <FuelTransactionAddForm
                    setShowModal={setShowModal}
                    setSuccessFormSubmit={setSuccessFormSubmit}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {month.name} <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {months.map((month) => {
                return (
                  <DropdownMenuItem
                    key={month.value}
                    onClick={() => {
                      setMonth(month);
                      table
                        .getColumn("date")
                        ?.setFilterValue({ month: month.value, year: year });
                    }}
                  >
                    {month.name}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {year} <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {years.map((year) => {
                return (
                  <DropdownMenuItem
                    key={year}
                    onClick={() => {
                      setYear(year);
                      table
                        .getColumn("date")
                        ?.setFilterValue({ month: month.value, year: year });
                    }}
                  >
                    {year}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <div className="h-96 relative overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-slate-950">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            {loading ? (
              <TableBody>
                {[...Array(8)].map((i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={columns.length} align="center">
                      <SyncLoader
                        size={10}
                        color={theme === "light" ? "black" : "white"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) =>
                        cell.column.id === "delete" ? (
                          <TableCell
                            key={cell.id}
                            className="flex justify-center items-center h-full w-full"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-red-500"
                              onClick={() => {
                                setSuccessDelete(false);
                                const result = deleteFuelTransactionById(
                                  row.original?.id as string
                                ).then((result) => {
                                  if (result) {
                                    router.refresh();
                                    setSuccessDelete(true);
                                  }
                                });
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
}
