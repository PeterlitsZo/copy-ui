import type { ComponentProps, FC } from "react";

type FlexProps = ComponentProps<"div"> & {
  dir?: "row" | "column";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gap?: string;
  wrap?: boolean;
  children?: React.ReactNode;
};

export const Flex: FC<FlexProps> = (props) => {
  const {
    dir: direction = "row",
    alignItems = "stretch",
    justifyContent = "flex-start",
    gap = "0",
    wrap = false,
    style,
    children,
    ...rest
  } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems,
        justifyContent,
        gap,
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
