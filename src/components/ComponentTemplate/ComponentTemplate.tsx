import type { FC, PropsWithChildren } from "react";

import { ThemeProvider } from "../ThemeProvider";
import { Navbar } from "../Navbar";
import { Toast } from "../Toast";

import styles from "./ComponentTemplate.module.scss";

interface ComponentTemplateProps {
  component: string;
  children?: React.ReactNode;
}

export const ComponentTemplate: FC<ComponentTemplateProps> = (props) => {
  return (
    <ThemeProvider>
      <Toast.Context>
        <div className={styles.page}>
          <Navbar active={props.component} />
          <div className={styles.childrenContainer}>
            <div className={styles.childrenWrapper}>
              {props.children}
            </div>
          </div>
        </div>
        <Toast.Container />
      </Toast.Context>
    </ThemeProvider>
  );
}