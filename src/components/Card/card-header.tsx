import type { FC } from "react";

import styles from "./card-header.module.scss";

type CardHeaderProps = {
  children: React.ReactNode;
};

const CardHeader: FC<CardHeaderProps> = (props) => {
  const { children } = props;

  return <div className={styles.cardHeader}>{children}</div>;
};

CardHeader.displayName = "Card.Header";

export { CardHeader };
