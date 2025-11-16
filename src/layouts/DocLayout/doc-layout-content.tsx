import type { FC } from "react";

import { Typography } from "@/components/Typography";

import styles from "./doc-layout-content.module.scss";

type DocLayoutContentProps = {
  variant?: "default" | "files";
  children?: React.ReactNode;
};

const DocLayoutContent: FC<DocLayoutContentProps> = (props) => {
  const { variant = "default", children } = props;

  if (variant === "files") {
    return (
      <div className={styles.docLayoutContentVariantFiles}>{children}</div>
    );
  }

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
