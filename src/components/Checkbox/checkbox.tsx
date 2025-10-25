import classNames from "classnames";
import { CheckIcon } from "lucide-react";
import { type FC, useState } from "react";
import { useJss } from "@/components/CopyUiProvider";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./checkbox.module.scss";

interface CheckboxProps {
  id?: string;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { id } = props;

  const theme = useTheme();
  const jss = useJss();

  const [checked, setChecked] = useState(false);

  const stx = jss.hash({
    "--checkbox-bg-color": "white",
    "--checkbox-border-color": theme.colors.gray["300"],
    "--checkbox-checked-bg-color": theme.colors.gray["700"],
    "--checkbox-checked-border-color": theme.colors.gray["700"],
    "--checkbox-mark-color": "white",
  });

  return (
    <button
      type="button"
      id={id}
      className={classNames(styles.checkbox, stx, checked && styles.checked)}
      onClick={() => setChecked(!checked)}
    >
      {checked && (
        <span className={styles.checkboxMark}>
          {<CheckIcon size={"100%"} />}
        </span>
      )}
    </button>
  );
};

export { Checkbox };
