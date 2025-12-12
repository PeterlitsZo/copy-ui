import classNames from "classnames";
import Color from "colorjs.io";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { Tooltip } from "@/components/Tooltip";
import { Typography } from "@/components/Typography";

import styles from "./color-palette.module.css";

const COLOR_NAMES = [
  "gray",
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
] as const;

const COLOR_NOS = [
  "000",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
] as const;

export default function ColorPalette() {
  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    "--swatch-bdColor": theme.colors.gray["200"],
  });

  return (
    <>
      {COLOR_NAMES.map((colorName) => (
        <>
          <Typography.H3>{colorName}</Typography.H3>
          <div className={classNames(styles.colorSwatches, stx)}>
            {COLOR_NOS.map((colorNo) => {
              const color = theme.colors[colorName][colorNo];

              return (
                <Swatch
                  key={colorNo}
                  color={color}
                  colorName={colorName}
                  colorNo={colorNo}
                />
              );
            })}
          </div>
        </>
      ))}
    </>
  );
}

function Swatch({
  color,
  colorNo,
}: {
  color: string;
  colorName: string;
  colorNo: string;
}) {
  const theme = useTheme();

  const labelBgColor = "white";
  const textColor = theme.colors.gray["900"];

  return (
    <Tooltip
      label={`OKLCH: ${new Color(color).to("oklch").toString()}`}
      triggerRender={({ setRef, onOpen, onClose }) => (
        // biome-ignore lint/a11y/noStaticElementInteractions: It is fine to use div here.
        <div ref={setRef} onMouseEnter={onOpen} onMouseLeave={onClose} className={styles.swatch}>
          <div className={styles.swatchColor} style={{ backgroundColor: color }} />
          <div
            className={styles.swatchLabel}
            style={{ backgroundColor: labelBgColor, color: textColor }}
          >
            <div className={styles.swatchName}>{colorNo}</div>
            <div className={styles.swatchValue}>{color}</div>
          </div>
        </div>
      )}
    />
  );
}
