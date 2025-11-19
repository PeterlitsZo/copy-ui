import { useJss, useTheme } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { Paper } from "@/components/Paper";

export default function Demo() {
  const theme = useTheme();
  const jss = useJss();

  const flexStx = jss.hash({
    width: "40rem",
    backgroundColor: theme.colors.grape["000"],
    padding: "0.5rem",
    borderRadius: "0.5rem",
  });

  const cardStx = (height: string) =>
    jss.hash({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "7rem",
      height,
    });

  const cards = (
    <>
      <Paper withBorder radius="md" className={cardStx("3rem")}>
        Card 1
      </Paper>
      <Paper withBorder radius="md" className={cardStx("2rem")}>
        Card 2
      </Paper>
      <Paper withBorder radius="md" className={cardStx("4rem")}>
        Card 3
      </Paper>
    </>
  );

  return (
    <Flex direction="column" gap="1rem">
      <Flex gap="1rem" justify="start" items="center" className={flexStx}>
        {cards}
      </Flex>
      <Flex gap="1rem" justify="center" items="start" className={flexStx}>
        {cards}
      </Flex>
      <Flex gap="1rem" justify="end" items="end" className={flexStx}>
        {cards}
      </Flex>
    </Flex>
  );
}
