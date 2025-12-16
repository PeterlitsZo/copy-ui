import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { useJss } from "@/components/CopyUiProvider";

import styles from "./ibs-base-right-section.module.scss";

type IbsBaseRightSectionProps = ComponentProps<"div">;

const IbsBaseRightSection: FC<IbsBaseRightSectionProps> = (props) => {
  const { className, children, ...rest } = props;

  const jss = useJss();
  const stx = jss.hash({
    "--ibsBaseRightSection-w": "calc(var(--ibsBase-minH) - 2px)",
    "--ibsBaseRightSection-h": "calc(var(--ibsBase-minH) - 2px)",
  });

  return (
    <div
      className={classNames(styles.ibsBaseRightSection, stx, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

IbsBaseRightSection.displayName = "IbsBase.RightSection";

export { IbsBaseRightSection };
