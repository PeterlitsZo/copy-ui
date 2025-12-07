import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import styles from "./ibs-base-left-section.module.scss";

type IbsBaseLeftSectionProps = ComponentProps<"div">;

const IbsBaseLeftSection: FC<IbsBaseLeftSectionProps> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <div className={classNames(styles.ibsBaseLeftSection, className)} {...rest}>
      {children}
    </div>
  );
};

IbsBaseLeftSection.displayName = "IbsBase.LeftSection";

export { IbsBaseLeftSection };
