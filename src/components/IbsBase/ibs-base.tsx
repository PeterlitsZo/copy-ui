import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { type Theme, useJss, useTheme } from "@/components/CopyUiProvider";
import { resolveStyle2 } from "@/utils/resolve-style2";

import styles from "./ibs-base.module.scss";
import { IbsBaseLeftSection } from "./ibs-base-left-section";
import { IbsBaseRightSection } from "./ibs-base-right-section";
import { IbsBaseWrapper } from "./ibs-base-wrapper";
import { extractStylesProps, type StylesProps } from "./style";

type IbsBaseProps = ComponentProps<"div"> &
  StylesProps & {
    variant?: "default" | "filled";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    disabled?: boolean;
  };

type IbsBaseComponent = FC<IbsBaseProps> & {
  LeftSection: typeof IbsBaseLeftSection;
  RightSection: typeof IbsBaseRightSection;
  Wrapper: typeof IbsBaseWrapper;
};

const IbsBase: IbsBaseComponent = (props: IbsBaseProps) => {
  const {
    children,
    className,
    variant = "default",
    size = "md",
    disabled = false,
    ...others
  } = props;
  const { stx: stylesStx, rest } = extractStylesProps(others);

  const jss = useJss();
  const theme = useTheme();

  const baseStx = jss.hash({
    "--ibsBase-bdRadius": "0.5rem",
    "--ibsBase-disabled-bgColor": theme.colors.gray["100"],
  });

  const stx = jss.hash(ibsBaseStyle(theme)({ size, variant }));

  return (
    <div
      className={classNames(styles.ibsBase, baseStx, stylesStx, stx, className)}
      data-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

IbsBase.displayName = "IbsBase";

IbsBase.LeftSection = IbsBaseLeftSection;
IbsBase.RightSection = IbsBaseRightSection;
IbsBase.Wrapper = IbsBaseWrapper;

const ibsBaseStyle = (theme: Theme) =>
  resolveStyle2({
    size: {
      xs: {
        "--ibsBase-minH": "1.75rem",
        "--ibsBase-fontSize": "0.625rem",
        "--ibsBase-lineHeight": "1.25rem",
      },
      sm: {
        "--ibsBase-minH": "2rem",
        "--ibsBase-fontSize": "0.75rem",
        "--ibsBase-lineHeight": "1.375rem",
      },
      md: {
        "--ibsBase-minH": "2.25rem",
        "--ibsBase-fontSize": "0.875rem",
        "--ibsBase-lineHeight": "1.5rem",
      },
      lg: {
        "--ibsBase-minH": "2.5rem",
        "--ibsBase-fontSize": "1rem",
        "--ibsBase-lineHeight": "1.75rem",
      },
      xl: {
        "--ibsBase-minH": "3rem",
        "--ibsBase-fontSize": "1.125rem",
        "--ibsBase-lineHeight": "2rem",
      },
    },
    variant: {
      default: {
        "--ibsBase-bdColor": theme.colors.gray["400"],
        "--ibsBase-bgColor": "white",
      },
      filled: {
        "--ibsBase-bdColor": "transparent",
        "--ibsBase-bgColor": `color-mix(in srgb, ${theme.colors.gray["150"]} 50%, transparent)`,
      },
    },
  });

export { IbsBase };
