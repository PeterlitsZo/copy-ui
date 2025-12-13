import { Card } from "@/components/Card";
import { useJss } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { Paper } from "@/components/Paper";
import { Popover } from "@/components/Popover";

export default function Demo() {
  const jss = useJss();

  const cardStx = jss.hash({
    width: "15rem",
  });

  const portalStx = jss.hash({
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem",
  });

  return (
    <Flex dir="column" gap="4rem" items="center">
      <Popover anchor="pointer" placement="bottom-start">
        <Popover.Trigger
          render={({ onOpen, onClose }) => (
            <Card
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              className={cardStx}
            >
              <Card.Content>Hover me to show popover at cursor</Card.Content>
            </Card>
          )}
        />
        <Popover.Portal
          render={({ setRef, isOpen, floatingStyles }) =>
            isOpen && (
              <Paper
                ref={(el) => setRef(el)}
                style={floatingStyles}
                withBorder
                className={portalStx}
              >
                I follow your mouse cursor!
              </Paper>
            )
          }
        />
      </Popover>
    </Flex>
  );
}
