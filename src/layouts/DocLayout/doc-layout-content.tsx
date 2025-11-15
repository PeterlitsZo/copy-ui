import type { FC } from "react";

import { Typography } from "@/components/Typography";

import styles from "./doc-layout-content.module.scss";

type DocLayoutContentProps = {
  children?: React.ReactNode;
};

const DocLayoutContent: FC<DocLayoutContentProps> = (props) => {
  const { children } = props;

  return (
    <div className={styles.docLayoutContent}>
      <div className={styles.docLayoutContentWrapper}>
        <Typography className={styles.docLayoutContentText}>
          {children}
        </Typography>
      </div>
    </div>
  );
};

export { DocLayoutContent };
