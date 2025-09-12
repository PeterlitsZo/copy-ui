import { useContext } from "react";
import { Button } from "src/components/Button";

import { SortIndicator, useSortIndicatorState } from "src/components/SortIndicator";
import { ThemeContext } from "src/components/ThemeProvider";

export function Demo() {
  const theme = useContext(ThemeContext);
  const { direction, handleClick } = useSortIndicatorState('asc');

  return (
    <Button
      rightSection={
        <SortIndicator
          style={{ color: theme.colors.gray['600'] }}
          size="1rem"
          direction={direction}
        />
      }
      onClick={handleClick}
    >
      <span>Volume</span>
    </Button>
  );
}
