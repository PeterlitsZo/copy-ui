import type { ComponentProps, FC } from "react";

type TableFooterProps = ComponentProps<"tfoot">;

const TableFooter: FC<TableFooterProps> = (props) => {
  return <tfoot {...props} />;
};

TableFooter.displayName = "Table.Footer";

export { TableFooter };
