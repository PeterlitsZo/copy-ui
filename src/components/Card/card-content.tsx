import type { FC } from "react";

import styles from "./card-content.module.scss";

type CardContentProps = {
  children: React.ReactNode;
};

const CardContent: FC<CardContentProps> = (props) => {
  const { children } = props;

  return <div className={styles.cardContent}>{children}</div>;
};

CardContent.displayName = "Card.Content";

export { CardContent };
