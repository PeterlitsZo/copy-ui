import type { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "../ThemeProvider";

import styles from "./ComponentTemplate.module.scss";
import { Navbar } from "../Navbar/Navbar";

export const ComponentTemplate: FC<PropsWithChildren> = (props) => {
  return (
    <ThemeProvider>
      <div className={styles.page}>
        <Navbar />
        <div className={styles.childrenContainer}>
          <div className={styles.childrenWrapper}>
            {props.children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}