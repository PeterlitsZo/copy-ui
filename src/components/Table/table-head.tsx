import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import styles from "./table-head.module.scss";

type TableHeadProps = ComponentProps<"th">;

const TableHead: FC<TableHeadProps> = (props) => {
  const { className, ...rest } = props;

  return <th className={classNames(styles.TableHead, className)} {...rest} />;
};

TableHead.displayName = "Table.Head";

export { TableHead };
