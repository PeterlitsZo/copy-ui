import type { FC } from "react";

import { Navbar } from "@/components/Navbar";
import { ScrollArea } from "@/components/ScrollArea";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toast } from "@/components/Toast";

import styles from "./ComponentTemplate.module.scss";

interface ComponentTemplateProps {
  component?: string;
  idx?: string;
  children?: React.ReactNode;
}

export const ComponentTemplate: FC<ComponentTemplateProps> = (props) => {
  const { component, idx, children } = props;

  if (!component && !idx) {
    throw new Error("ComponentTemplate requires a component or idx prop");
  }

  let computedIdx = idx;
  if (!computedIdx) {
    computedIdx = `/v0/components/${component}`;
  }

  return (
    <ThemeProvider>
      <Toast.Context>
        <div className={styles.page}>
          <Navbar active={computedIdx} />
          <ScrollArea className={styles.childrenContainer}>
            <ScrollArea.Viewport>
              <ScrollArea.Content>{children}</ScrollArea.Content>
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
