import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { Paper } from "@/components/Paper";

import styles from "./card.module.scss";
import { CardContent } from "./card-content";
import { CardFooter } from "./card-footer";
import { CardHeader } from "./card-header";

type CardProps = ComponentProps<typeof Paper> & {
  width?: string;
  maxWidth?: string;
};

type CardComponent = FC<CardProps> & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};

const Card: CardComponent = (props: CardProps) => {
  // TODO (PeterlitsZo): Remove the default width in the future.
  const {
    radius = "md",
    withBorder = true,
    width = "20rem",
    maxWidth,
    children,
    ...rest
  } = props;

  const jss = useJss();

  const stx = jss.hash({
    "--card-width": width,
    "--card-max-width": maxWidth,
  });

  return (
    <Paper
      radius={radius}
      withBorder={withBorder}
      className={classNames(styles.card, stx)}
      {...rest}
    >
      {children}
    </Paper>
  );
};

Card.displayName = "Card";

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export { Card };
