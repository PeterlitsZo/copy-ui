import type { FC } from "react";

import { Markdown } from "@/components/Markdown";

type DocLayoutChangelogProps = {
  changelog: string;
};

const DocLayoutChangelog: FC<DocLayoutChangelogProps> = (props) => {
  const { changelog } = props;

  return <Markdown>{changelog}</Markdown>;
};

export { DocLayoutChangelog };
