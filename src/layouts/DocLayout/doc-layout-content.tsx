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
      <Typography.Root className={styles.docLayoutContentWrapper}>
        {children}
      </Typography.Root>
    </div>
  );
};

export { DocLayoutContent };
