import classNames from "classnames";
import Color from "colorjs.io";
import { type CSSProperties, useState } from "react";
import tinycolor from "tinycolor2";
import {
  type ColorName,
  type ColorNo,
  useJss,
  useTheme,
} from "@/components/CopyUiProvider";
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
  "050",
  "100",
  "150",
  "200",
  "250",
  "300",
  "350",
  "400",
  "450",
  "500",
  "550",
  "600",
  "650",
  "700",
  "750",
  "800",
  "850",
  "900",
  "950",
] as const;

export default function ColorPalette() {
  return (
    <div className={styles.colorPalette}>
      {COLOR_NAMES.map((colorName) => (
        <ColorPaletteItem key={colorName} colorName={colorName} />
      ))}
    </div>
  );
}

function ColorPaletteItem({ colorName }: { colorName: ColorName }) {
  const [colorNo, setColorNo] = useState("200" as ColorNo);

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    "--colorPaletteItem-bdColor": theme.colors.gray["200"],
  });

  const textColor = (colorNo: ColorNo) => {
    const base =
      colorNo >= "600" ? theme.colors.gray["000"] : theme.colors.gray["900"];
    return tinycolor(base).setAlpha(0.9).toString();
  };

  const toOklch = (color: string) => {
    const cl = new Color(color).to("oklch");
    const l = `${(cl.l * 100).toFixed(1)}%`;
    const c = cl.c.toFixed(3);
    const h = cl.h.toFixed(3);

    return `oklch(${l} ${c} ${h})`;
  };

  return (
    <div className={classNames(styles.colorPaletteItem, stx)}>
      <div
        className={styles.colorPaletteItemColor}
        style={{
          backgroundColor: theme.colors[colorName][colorNo],
          color: textColor(colorNo),
        }}
      >
        <div className={styles.colorPaletteItemColorTitle}>
          {colorName}-{colorNo}
        </div>
        <div className={styles.colorPaletteItemColorDescription}>
          <div>{theme.colors[colorName][colorNo]}</div>
          <div>{toOklch(theme.colors[colorName][colorNo])}</div>
        </div>
      </div>
      <div className={styles.colorPaletteItemColumn}>
        {COLOR_NOS.map((colorNo) => (
          <button
            key={colorNo}
            type="button"
            className={styles.colorPaletteItemColumnColor}
            style={
              {
                backgroundColor: theme.colors[colorName][colorNo],
                "--colorPaletteItemColumnColor-color": textColor(colorNo),
              } as CSSProperties
            }
            onClick={() => setColorNo(colorNo)}
          >
            {colorName}-{colorNo}
          </button>
        ))}
      </div>
    </div>
  );
}
