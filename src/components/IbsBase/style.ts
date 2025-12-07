import { useJss } from "@/components/CopyUiProvider";

type StylesProps = {
  width?: string;
  w?: string;
  maxWidth?: string;
  maxW?: string;
  minWidth?: string;
  minW?: string;

  height?: string;
  h?: string;
  maxHeight?: string;
  maxH?: string;
  minHeight?: string;
  minH?: string;
};

function useStx(stylesProps: StylesProps) {
  const {
    width,
    w,
    maxWidth,
    maxW,
    minWidth,
    minW,
    height,
    h,
    maxHeight,
    maxH,
    minHeight,
    minH,
  } = stylesProps;

  const resolvedWidth = width || w;
  const resolvedMaxWidth = maxWidth || maxW;
  const resolvedMinWidth = minWidth || minW;
  const resolvedHeight = height || h;
  const resolvedMaxHeight = maxHeight || maxH;
  const resolvedMinHeight = minHeight || minH;

  const jss = useJss();

  return jss.hash({
    width: resolvedWidth,
    maxWidth: resolvedMaxWidth,
    minWidth: resolvedMinWidth,
    height: resolvedHeight,
    maxHeight: resolvedMaxHeight,
    minHeight: resolvedMinHeight,
  });
}

function extractStylesProps<T extends StylesProps>(props: T) {
  const {
    width,
    w,
    maxWidth,
    maxW,
    minWidth,
    minW,
    height,
    h,
    maxHeight,
    maxH,
    minHeight,
    minH,

    ...rest
  } = props;

  const stylesProps = {
    width,
    w,
    maxWidth,
    maxW,
    minWidth,
    minW,
    height,
    h,
    maxHeight,
    maxH,
    minHeight,
    minH,
  };

  return {
    stx: useStx(stylesProps),
    rest,
  };
}

export type { StylesProps };
export { extractStylesProps };
