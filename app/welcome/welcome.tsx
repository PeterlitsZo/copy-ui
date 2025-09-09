import { useContext } from "react";
import { Save, Send, Star, Trash } from "lucide-react";

import { SortIndicator, useSortIndicatorState } from "src/components/SortIndicator";
import { Button } from "src/components/Button";
import { ThemeContext, ThemeProvider } from "src/components/ThemeProvider";
import { TimeSelector } from "src/components/TimeSelector";
import { Popover } from "src/components/Popover";
import { IconButton } from "src/components/IconButton";
import { ButtonGroup } from "src/components/ButtonGroup";

import themeProviderFilesJson from "app/data/ThemeProvider.json";
import sortIndicatorFilesJson from "app/data/SortIndicator.json";
import buttonFilesJson from "app/data/Button.json";
import iconButtonFilesJson from "app/data/IconButton.json";
import timeSelectorFilesJson from "app/data/TimeSelector.json";
import popoverFilesJson from "app/data/Popover.json";
import buttonGroupFilesJson from "app/data/ButtonGroup.json";

import { Section } from "./Section";

import styles from "./welcome.module.scss";

export function Welcome() {
  return (
    <ThemeProvider>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <ThemeProviderSection />
        <SortIndicatorSection />
        <ButtonSection />
        <IconButtonSection />
        <ButtonGroupSection />
        <PopoverSection />
        <TimeSelectorSection />
      </div>
    </ThemeProvider>
  )
}

// ThemeProvider
// =============================================================================

function ThemeProviderSection() {
  return (
    <Section
      title="ThemeProvider"
      files={themeProviderFilesJson}
      changelog={'- 2025-09-05: Initial version.'}
    />
  )
}

// Button
// =============================================================================

const buttonCode = `\
<Button>Click Me</Button>
`;

const buttonChangelog = `\
- 2025-09-04: Initial version.
- 2025-09-05: Use ThemeProvider for theming, support the props \`leftSection\` and \`rightSection\`.
- 2025-09-08: Support the prop \`ref\`.
- 2025-09-09: Support the prop \`variant\`.
`;

function ButtonSection() {
  return (
    <Section
      title="Button"
      demoAndCode={[<Button>Click Me</Button>, buttonCode]}
      files={buttonFilesJson}
      changelog={buttonChangelog}
    />
  )
}

// IconButton
// =============================================================================

const iconButtonCode = `\
<IconButton>
  <Trash size={'1.25rem'} />
</IconButton>
`;

const iconButtonChangelog = `\
- 2025-09-09: Initial version.
`;

function IconButtonSection() {
  return (
    <Section
      title="IconButton"
      demoAndCode={[(
        <IconButton>
          <Trash size={'1.25rem'} />
        </IconButton>
      ), iconButtonCode]}
      files={iconButtonFilesJson}
      changelog={iconButtonChangelog}
    />
  )
}

// ButtonGroup
// =============================================================================

const buttonGroupCode = `\
<ButtonGroup>
  <IconButton>
    <Save size={'1.25rem'} />
  </IconButton>
  <IconButton>
    <Star size={'1.25rem'} />
  </IconButton>
  <IconButton>
    <Trash size={'1.25rem'} />
  </IconButton>
</ButtonGroup>
`;

const buttonGroupChangelog = `\
- 2025-09-09: Initial version.
`;

function ButtonGroupSection() {
  return (
    <Section
      title="ButtonGroup"
      demoAndCode={[(
        <ButtonGroup>
          <Button leftSection={<Send size={'1.25rem'} />}>
            Send
          </Button>
          <IconButton>
            <Save size={'1.25rem'} />
          </IconButton>
          <IconButton>
            <Star size={'1.25rem'} />
          </IconButton>
          <IconButton>
            <Trash size={'1.25rem'} />
          </IconButton>
        </ButtonGroup>
      ), buttonGroupCode]}
      files={buttonGroupFilesJson}
      changelog={buttonGroupChangelog}
    />
  )
}

// SortIndicator
// =============================================================================

const sortIndicatorCode = `\
const theme = useContext(ThemeContext);
const { direction, handleClick } = useSortIndicatorState('asc');

return (
  <button className={styles.sortIndicatorButton} onClick={handleClick}>
    <span>Volume</span>
    <SortIndicator
      style={{ color: theme.colors.gray['100'] }}
      size="1rem"
      direction={direction}
    />
  </button>
)
`;

const sortIndicatorChangelog = `\
- 2025-09-04: Initial version.
- 2025-09-05: Add the \`size\` prop.
`;

function SortIndicatorSection() {
  const theme = useContext(ThemeContext);
  const { direction, handleClick } = useSortIndicatorState('asc');

  const demo = (
    <button className={styles.sortIndicatorButton} onClick={handleClick}>
      <span>Volume</span>
      <SortIndicator
        style={{ color: theme.colors.gray['600'] }}
        size="1rem"
        direction={direction}
      />
    </button>
  )

  return (
    <Section
      title="SortIndicator"
      demoAndCode={[demo, sortIndicatorCode]}
      files={sortIndicatorFilesJson}
      changelog={sortIndicatorChangelog}
    />
  )
}

// PopoverSection
// =============================================================================

const popoverCode = `\
<Popover>
  <Popover.Trigger
    render={({ setRef, onClick }) => (
      <Button ref={(el) => setRef(el!)} onClick={onClick}>Open</Button>
    )}
  />
  <Popover.Portal
    render={({ setRef, isOpen, floatingStyles }) => (
      isOpen && (
        <div
          ref={(el) => setRef(el!)}
          style={floatingStyles}
          className={styles.popoverPortal}
        >
          You click to open me!
        </div>
      )
    )}
  />
</Popover>
`;

function PopoverSection() {
  const demo = (
    <Popover>
      <Popover.Trigger
        render={({ setRef, onClick }) => (
          <Button ref={(el) => setRef(el!)} onClick={onClick}>Open</Button>
        )}
      />
      <Popover.Portal
        render={({ setRef, isOpen, floatingStyles }) => (
          isOpen && (
            <div
              ref={(el) => setRef(el!)}
              style={floatingStyles}
              className={styles.popoverPortal}
            >
              You click to open me!
            </div>
          )
        )}
      />
    </Popover>
  )

  return (
    <Section
      title="Popover"
      demoAndCode={[demo, popoverCode]}
      files={popoverFilesJson}
      changelog={'- 2025-09-08: Initial version.'}
    />
  )
}

// TimeSelector
// =============================================================================

function TimeSelectorSection() {
  return (
    <Section
      title="TimeSelector"
      demoAndCode={[(
        <TimeSelector />
      ), '<TimeSelector />']}
      files={timeSelectorFilesJson}
      changelog={'TODO'}
    />
  )
}