import type { FC } from "react";
import { Input } from "../Input";

export const DatePicker: FC = () => {
  return (
    <Input placeholder="Select date" />
  )
};

DatePicker.displayName = "DatePicker";
