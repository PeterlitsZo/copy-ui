import type { FC } from "react";

import styles from "./doc-layout.module.scss";
import { DocLayoutChangelog } from "./doc-layout-changelog";
import { DocLayoutContent } from "./doc-layout-content";
import { DocLayoutFiles } from "./doc-layout-files";
import { DocLayoutLive } from "./doc-layout-live";
import { DocLayoutTitle } from "./doc-layout-title";

type DocLayoutProps = {
  children?: React.ReactNode;
};

type DocLayoutComponent = FC<DocLayoutProps> & {
  Title: typeof DocLayoutTitle;
  Content: typeof DocLayoutContent;
  Live: typeof DocLayoutLive;
  Files: typeof DocLayoutFiles;
  Changelog: typeof DocLayoutChangelog;
};

const DocLayout: DocLayoutComponent = (props) => {
  const { children } = props;

  return <div className={styles.docLayout}>{children}</div>;
};

DocLayout.Title = DocLayoutTitle;
DocLayout.Content = DocLayoutContent;
DocLayout.Live = DocLayoutLive;
DocLayout.Files = DocLayoutFiles;
DocLayout.Changelog = DocLayoutChangelog;

DocLayout.displayName = "DocLayout";

export { DocLayout };
