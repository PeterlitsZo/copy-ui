import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import styles from "./table-row.module.scss";

type TableRowProps = ComponentProps<"tr">;

const TableRow: FC<TableRowProps> = (props) => {
  const { className, ...rest } = props;

  return <tr className={classNames(styles.TableRow, className)} {...rest} />;
};

TableRow.displayName = "Table.Row";

export { TableRow };
