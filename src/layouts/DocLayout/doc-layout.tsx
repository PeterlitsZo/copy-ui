import type { FC } from "react";

import styles from "./doc-layout.module.scss";
import { DocLayoutChangelog } from "./doc-layout-changelog";
import { DocLayoutContent } from "./doc-layout-content";
import { DocLayoutDepGraph } from "./doc-layout-dep-graph";
import { DocLayoutFiles } from "./doc-layout-files";
import { DocLayoutLive } from "./doc-layout-live";
import { DocLayoutTitle } from "./doc-layout-title";
import { DocLayoutTitleWithoutTabs } from "./doc-layout-title-without-tabs";

type DocLayoutProps = {
  children?: React.ReactNode;
};

type DocLayoutComponent = FC<DocLayoutProps> & {
  Title: typeof DocLayoutTitle;
  TitleWithoutTabs: typeof DocLayoutTitleWithoutTabs;
  Content: typeof DocLayoutContent;
  Live: typeof DocLayoutLive;
  DepGraph: typeof DocLayoutDepGraph;
  Files: typeof DocLayoutFiles;
  Changelog: typeof DocLayoutChangelog;
};

const DocLayout: DocLayoutComponent = (props) => {
  const { children } = props;

  return <div className={styles.docLayout}>{children}</div>;
};

DocLayout.Title = DocLayoutTitle;
DocLayout.Content = DocLayoutContent;
DocLayout.TitleWithoutTabs = DocLayoutTitleWithoutTabs;
DocLayout.Live = DocLayoutLive;
DocLayout.DepGraph = DocLayoutDepGraph;
DocLayout.Files = DocLayoutFiles;
DocLayout.Changelog = DocLayoutChangelog;

DocLayout.displayName = "DocLayout";

export { DocLayout };
