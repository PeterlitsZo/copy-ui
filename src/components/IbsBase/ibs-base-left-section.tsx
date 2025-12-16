import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { useJss } from "@/components/CopyUiProvider";

import styles from "./ibs-base-left-section.module.scss";

type IbsBaseLeftSectionProps = ComponentProps<"div">;

const IbsBaseLeftSection: FC<IbsBaseLeftSectionProps> = (props) => {
  const { className, children, ...rest } = props;

  const jss = useJss();
  const stx = jss.hash({
    "--ibsBaseLeftSection-w": "calc(var(--ibsBase-minH) - 2px)",
    "--ibsBaseLeftSection-h": "calc(var(--ibsBase-minH) - 2px)",
  });

  return (
    <div
      className={classNames(styles.ibsBaseLeftSection, stx, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

IbsBaseLeftSection.displayName = "IbsBase.LeftSection";

export { IbsBaseLeftSection };
