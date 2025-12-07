import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import styles from "./ibs-base-right-section.module.scss";

type IbsBaseRightSectionProps = ComponentProps<"div">;

const IbsBaseRightSection: FC<IbsBaseRightSectionProps> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={classNames(styles.ibsBaseRightSection, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

IbsBaseRightSection.displayName = "IbsBase.RightSection";

export { IbsBaseRightSection };
