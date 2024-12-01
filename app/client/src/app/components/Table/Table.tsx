"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import TextInput from "../Input/TextField";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectField from "../Input/SelectField";

type DataTableType = {
  columns: ColumnDef<any>[];
  data: any;
  filterData?: string[];
  searchBy?: string;
  filterColumn?: string;
};

export function DataTable({
  columns,
  data,
  filterData,
  searchBy,
  filterColumn
}: DataTableType) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filterValue, setFilter] = React.useState("");

  const setFilterTo = (value: string) => {
    if (!filterColumn) return;
    setFilter(value);
    if (value === "all") {
      table.resetColumnFilters();
    } else {
      table.getColumn(filterColumn)?.setFilterValue(value);
    }
  };

  const pageSize: { count: number }[] = [
    { count: 5 },
    { count: 10 },
    { count: 20 },
    { count: 30 },
    { count: 40 },
    { count: 50 },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
      <div className="flex gap-4 items-start">
        {searchBy && (
          <TextInput
            placeholder="Search..."
            value={
              (table.getColumn(searchBy)?.getFilterValue() as string) ?? ""
            }
            onChange={(value) =>
              table.getColumn(searchBy)?.setFilterValue(value)
            }
            className="bg-grey-8 rounded-xl max-w-2xl w-full px-3.5 py-2.5"
          />
        )}
        {filterData && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-auto text-sm font-bold flex items-center justify-center gap-2 bg-grey-8 w-[122px] h-11 rounded-lg text-grey">
                {filterColumn} <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={filterValue}
                onValueChange={setFilterTo}>
                {filterData.map((data, index) => {
                  return (
                    <DropdownMenuRadioItem
                      key={index}
                      value={data}
                      className="capitalize">
                      {data}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="rounded-md ">
        <Table>
          <TableHeader>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground max-w-20">
          <SelectField
            label=""
            value={`${table.getState().pagination.pageSize}`}
            nameKey="count"
            options={pageSize}
            onChange={(value) => table.setPageSize(Number(value))}
            classname="bg-grey-8 border-none border-grey-8"
          />
        </div>
        <div className="space-x-2">
          <div className="flex items-center space-x-2 text-grey">
            <button
              className="hidden h-8 w-8 p-0 lg:flex items-center disabled:text-grey/50"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </button>
            <button
              className="h-8 w-8 p-0 disabled:text-grey/50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </button>
            <button
              className="h-8 w-8 p-0 disabled:text-grey/50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </button>
            <button
              className="hidden h-8 w-8 p-0 lg:flex items-center disabled:text-grey/50"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
