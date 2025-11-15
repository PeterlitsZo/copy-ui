import type { ComponentProps, FC } from "react";

type TableBodyProps = ComponentProps<"tbody">;

const TableBody: FC<TableBodyProps> = (props) => {
  return <tbody {...props} />;
};

TableBody.displayName = "Table.Body";

export { TableBody };
