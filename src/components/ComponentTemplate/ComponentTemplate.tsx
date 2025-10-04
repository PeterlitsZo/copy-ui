import type { FC } from "react";

import { Navbar } from "@/components/Navbar";
import { ScrollArea } from "@/components/ScrollArea";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toast } from "@/components/Toast";

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
          <ScrollArea className={styles.childrenContainer}>
            <ScrollArea.Viewport>
              <ScrollArea.Content>{props.children}</ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea>
        </div>
        <Toast.Container />
      </Toast.Context>
    </ThemeProvider>
  );
};
