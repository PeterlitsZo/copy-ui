import { Search, X } from "lucide-react";
import { IbsBase } from "@/components/IbsBase";

export default function Demo() {
  return (
    <IbsBase size="md">
      <IbsBase.LeftSection>
        <Search size="1rem" />
      </IbsBase.LeftSection>
      <IbsBase.Wrapper>Content goes here</IbsBase.Wrapper>
      <IbsBase.RightSection>
        <X size="1rem" />
      </IbsBase.RightSection>
    </IbsBase>
  );
}
