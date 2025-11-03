import { ComponentTemplate } from "@/components/ComponentTemplate";
import { Section } from "@/components/Section";
import { useTheme } from "@/components/ThemeProvider";
import { Typography } from "@/components/Typography";

export function meta() {
  return [
    { title: "Get Started | Copy UI" },
    { name: "description", content: "Get started with Copy UI." },
  ];
}

export default function GetStartedPage() {
  return (
    <ComponentTemplate idx="/v0/docs/get-started">
      <Section.Root title="Get Started">
        <Typography.P>
          Copy UI is a simple and stupid collection of code - help you build
          your UI faster.
        </Typography.P>
        <Typography.P>
          For example, to build your Avatar component, you can just check the
          Copy UI's Avatar component document, copy its code and paste it into
          your own project. That's it.
        </Typography.P>
        <Typography.H2>Why Copy UI?</Typography.H2>
        <Typography.P>
          Code in Copy UI is stupid enough, so I think it is easy to read and
          change by yourself. I try to build it without any headless UI library,
          because - I know those libraries are good - headless UI libraries are
          hard to change for me (yes, I can fork it and modify it, but it is
          really hard to understand it).
        </Typography.P>
        <Typography.P>
          I like shadcn/ui, but it is build on top of Radix UI (or Base UI,
          React Aria). If you want to change its layout / logic, it is really
          hard sometime.
        </Typography.P>
        <Typography.P>
          Copy UI is inspired by shadcn/ui, but you can not only copy styles,
          but also logic. Another thing you need to know is, Copy UI does not
          use Tailwind CSS. Yes Tailwind CSS is good, but I like to write CSS
          Module more. I need to say that this project is heavily inspired by:
        </Typography.P>
        <Typography.Ul>
          <Typography.Li>shadcn/ui</Typography.Li>
          <Typography.Li>Mantine</Typography.Li>
          <Typography.Li>Radix UI</Typography.Li>
          <Typography.Li>Base UI</Typography.Li>
          <Typography.Li>Hero UI</Typography.Li>
          <Typography.Li>Naive UI</Typography.Li>
          <Typography.Li>MUI</Typography.Li>
        </Typography.Ul>
        <Typography.P>
          Maybe you can find some component looks like one of those projects -
          just because it looks really good. Those projects are under MIT
          License - so this project does the same thing.
        </Typography.P>
        <Typography.H2>Reset CSS</Typography.H2>
        <Typography.P>
          Copy UI use Tailwind CSS's preflight files. To use Copy UI, you need
          to copy this CSS file content into your project, name it like
          reset.css, and import it in your root file:
        </Typography.P>
        <Typography.CodeBlock
          title="reset.css"
          scrollAreaMaxHeight="35rem"
          code={resetCssCode}
          lang="css"
          withLineNumbers
        />
        <Typography.P>
          It is copied from Tailwind CSS, but I just remove some comments,
          replace some magic functions (its `--theme` function) to make it work.
          You can read{" "}
          <Link href="https://tailwindcss.com/docs/preflight">
            its documentation
          </Link>{" "}
          to know more about it.
        </Typography.P>
      </Section.Root>
    </ComponentTemplate>
  );
}

const Link = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const theme = useTheme();

  return (
    <a href={href} style={{ color: theme.colors.blue["600"] }}>
      {children}
    </a>
  );
};

Link.displayName = "Link";

const resetCssCode = `\
@layer base, components;

@layer base {
  :root {
    --font-sans:
      ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
    --font-mono:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
      monospace;
  }

  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }

  html,
  :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--font-sans);
    -webkit-tap-highlight-color: transparent;
  }

  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }

  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp,
  pre {
    font-family: var(--font-mono);
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }

  :-moz-focusring {
    outline: auto;
  }

  progress {
    vertical-align: baseline;
  }

  summary {
    display: list-item;
  }

  ol,
  ul,
  menu {
    list-style: none;
  }

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block;
    vertical-align: middle;
  }

  img,
  video {
    max-width: 100%;
    height: auto;
  }

  button,
  input,
  select,
  optgroup,
  textarea,
  ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }

  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }

  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }

  ::file-selector-button {
    margin-inline-end: 4px;
  }

  ::placeholder {
    opacity: 1;
  }

  @supports (not (-webkit-appearance: -apple-pay-button)) /* Not Safari */ or
    (contain-intrinsic-size: 1px) /* Safari 17+ */ {
    ::placeholder {
      color: color-mix(in oklab, currentcolor 50%, transparent);
    }
  }

  textarea {
    resize: vertical;
  }

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }

  ::-webkit-datetime-edit {
    display: inline-flex;
  }

  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }

  ::-webkit-datetime-edit,
  ::-webkit-datetime-edit-year-field,
  ::-webkit-datetime-edit-month-field,
  ::-webkit-datetime-edit-day-field,
  ::-webkit-datetime-edit-hour-field,
  ::-webkit-datetime-edit-minute-field,
  ::-webkit-datetime-edit-second-field,
  ::-webkit-datetime-edit-millisecond-field,
  ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }

  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }

  :-moz-ui-invalid {
    box-shadow: none;
  }

  button,
  input:where([type="button"], [type="reset"], [type="submit"]),
  ::file-selector-button {
    appearance: button;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }

  [hidden]:where(:not([hidden="until-found"])) {
    /* biome-ignore lint/complexity/noImportantStyles: Just ignore it. */
    display: none !important;
  }
}
`;
