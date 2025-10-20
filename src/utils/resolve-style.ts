import type { CSSProperties } from "react";

type Style = CSSProperties & Record<`--${string}`, string>;

type UnresolvedStyle = {
  base: Style;
  variants: Record<string, Record<string, Style>>;
  cls: Record<string, string>;
};

export function resolveStyle(style: UnresolvedStyle): CSSProperties {
  const result = { ...style.base };

  for (const clsVariant in style.cls) {
    const variantValue = style.cls[clsVariant];
    const variantStyles = style.variants[clsVariant][variantValue];
    Object.assign(result, variantStyles);
  }

  return result;
}
