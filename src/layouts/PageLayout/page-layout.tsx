import { type FC, useMemo } from "react";

import { CopyUiProvider } from "@/components/CopyUiProvider";
import { Navbar } from "@/components/Navbar";
import { ScrollArea } from "@/components/ScrollArea";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Topbar } from "@/components/Topbar";

import styles from "./page-layout.module.scss";

interface PageLayoutProps {
  kind: "docs" | "components" | "utils";
  name: string;
  children?: React.ReactNode;
}

const PageLayout: FC<PageLayoutProps> = (props) => {
  const { kind, name, children } = props;

  const currentPath = useMemo(() => {
    return `/v0/${kind}/${name}`;
  }, [kind, name]);

  return (
    <CopyUiProvider>
      <ThemeProvider>
        <div className={styles.page}>
          <Topbar />
          <div className={styles.pageWithoutTopbar}>
            <div className={styles.pageWithoutTopbarWrapper}>
              <Navbar active={currentPath} />
              <ScrollArea className={styles.childrenContainer}>
                <ScrollArea.Viewport>
                  <ScrollArea.Content>{children}</ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar>
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
              </ScrollArea>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </CopyUiProvider>
  );
};

PageLayout.displayName = "PageLayout";

export { PageLayout };
