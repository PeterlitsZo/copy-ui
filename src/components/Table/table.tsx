import classNames from "classnames";
import type { ComponentProps, FC } from "react";
import tinycolor from "tinycolor2";
import { useJss, useTheme } from "@/components/CopyUiProvider";
import { TableBody } from "./table-body";
import { TableCell } from "./table-cell";
import { TableFooter } from "./table-footer";
import { TableHead } from "./table-head";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";

type TableProps = ComponentProps<"table">;

type TableComponent = FC<TableProps> & {
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  Head: typeof TableHead;
  Cell: typeof TableCell;
};

const Table: TableComponent = (props: TableProps) => {
  const { className, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    "--table-border-color": theme.colors.gray["200"],
    "--table-row-hover-bg-color": tinycolor(theme.colors.gray["100"])
      .setAlpha(0.5)
      .toString(),
  });

  return <table className={classNames(stx, className)} {...rest} />;
};

Table.displayName = "Table";

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;

export { Table };
