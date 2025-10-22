import type { ComponentProps, FC } from "react";

import { Paper } from "@/components/Paper";
import { CardContent } from "./card-content";
import { CardHeader } from "./card-header";

type CardProps = ComponentProps<typeof Paper>;

type CardComponent = FC<CardProps> & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
};

const Card: CardComponent = (props: CardProps) => {
  return <Paper style={{ width: "20rem" }} radius="md" withBorder {...props} />;
};

Card.displayName = "Card";

Card.Header = CardHeader;
Card.Content = CardContent;

export { Card };
