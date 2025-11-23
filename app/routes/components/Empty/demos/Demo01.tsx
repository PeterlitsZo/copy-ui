import { Inbox } from "lucide-react";
import { Button } from "@/components/Button";
import { Empty } from "@/components/Empty";

export default function Demo() {
  return (
    <Empty>
      <Empty.Header>
        <Empty.Media>
          <Inbox />
        </Empty.Media>
        <Empty.Title>No Projects Found</Empty.Title>
        <Empty.Description>
          Try adjusting your search criteria or create a new project.
        </Empty.Description>
      </Empty.Header>
      <Empty.ContentFlex gap="0.5rem">
        <Button variant="filled" size="sm">
          Create Project
        </Button>
        <Button variant="light" size="sm">
          Import Projects
        </Button>
      </Empty.ContentFlex>
    </Empty>
  );
}
