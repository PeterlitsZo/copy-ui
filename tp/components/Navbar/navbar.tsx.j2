import classnames from "classnames";
import type { FC } from "react";
import { Link } from "react-router";

import { useTheme } from "@/components/CopyUiProvider";
import { ScrollArea } from "@/components/ScrollArea";
import { Tag } from "@/components/Tag";

import { components } from "./components.codegen";
import styles from "./Navbar.module.scss";
import { utils } from "./utils.codegen";

interface NavbarProps {
  active: string;
}

export const Navbar: FC<NavbarProps> = ({ active }) => {
  const theme = useTheme();

  const computedStyles = {
    "--navbarLink-color": theme.colors.gray["700"],
    "--navbarLink-hover-bgColor": theme.colors.gray["050"],
    "--navbarLink-active-bgColor": theme.colors.blue["100"],
    "--navbarLink-active-color": theme.colors.blue["800"],
    "--navbar-bdColor": theme.colors.gray["300"],
  };

  const docs = [
    { name: "Get Started", path: "/v0/react/docs/get-started" },
    { name: "Colors", path: "/v0/react/docs/colors" },
  ];

  function isActive(
    kind: "doc" | "component" | "utils",
    pathOrComponentName: string,
  ) {
    if (kind === "doc") {
      return pathOrComponentName === active;
    } else if (kind === "component") {
      return `/v0/react/components/${pathOrComponentName}` === active;
    } else if (kind === "utils") {
      return `/v0/react/utils/${pathOrComponentName}` === active;
    }
    return false;
  }

  return (
    <ScrollArea>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <nav
            className={styles.navbar}
            style={computedStyles as React.CSSProperties}
          >
            <div className={styles.title}>DOCS</div>
            {docs.map((doc) => (
              <NavbarLink
                key={doc.name}
                to={doc.path}
                name={doc.name}
                active={isActive("doc", doc.path)}
              />
            ))}
            <div className={styles.title}>COMPONENTS</div>
            {components.map((component) => (
              <NavbarLink
                key={component.name}
                to={component.path}
                name={component.name}
                active={isActive("component", component.name)}
                wip={component.wip}
                deprecated={component.deprecated}
              />
            ))}
            <div className={styles.title}>UTILS</div>
            {utils.map((util) => (
              <NavbarLink
                key={util.name}
                to={util.path}
                name={util.name}
                active={isActive("utils", util.name)}
              />
            ))}
          </nav>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea>
  );
};

Navbar.displayName = "Navbar";

interface NavbarLinkProps {
  to: string;
  name: string;
  active: boolean;
  wip?: boolean;
  deprecated?: boolean;
}

const NavbarLink: FC<NavbarLinkProps> = (props) => {
  const { to, name, active, wip, deprecated } = props;

  return (
    <Link className={classnames(styles.link, active && styles.active)} to={to}>
      <span>{name}</span>
      {wip && (
        <Tag color="red" size="sm">
          WIP
        </Tag>
      )}
      {deprecated && (
        <Tag color="red" size="sm">
          Deprecated
        </Tag>
      )}
    </Link>
  );
};
