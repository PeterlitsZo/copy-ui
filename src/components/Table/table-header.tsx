import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import styles from "./table-header.module.scss";

type TableHeaderProps = ComponentProps<"thead">;

const TableHeader: FC<TableHeaderProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <thead className={classNames(styles.TableHeader, className)} {...rest} />
  );
};

TableHeader.displayName = "Table.Header";

export { TableHeader };
