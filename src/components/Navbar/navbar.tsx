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
    "--navbarLink-hover-bgColor": theme.colors.gray["100"],
    "--navbarLink-active-bgColor": theme.colors.blue["000"],
    "--navbarLink-active-color-active": theme.colors.blue["900"],
    "--navbar-bdColor": theme.colors.gray["300"],
  };

  const docs = [{ name: "Get Started", path: "/v0/react/docs/get-started" }];

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
              <Link
                key={doc.name}
                className={classnames(
                  styles.link,
                  isActive("doc", doc.path) && styles.active,
                )}
                to={doc.path}
              >
                <span>{doc.name}</span>
              </Link>
            ))}
            <div className={styles.title}>COMPONENTS</div>
            {components.map((component) => (
              <Link
                key={component.name}
                className={classnames(
                  styles.link,
                  isActive("component", component.name) && styles.active,
                )}
                to={component.path}
              >
                <span>{component.name}</span>
                {component.wip && (
                  <Tag color="red" size="sm">
                    WIP
                  </Tag>
                )}
                {component.deprecated && (
                  <Tag color="red" size="sm">
                    Deprecated
                  </Tag>
                )}
              </Link>
            ))}
            <div className={styles.title}>UTILS</div>
            {utils.map((util) => (
              <Link
                key={util.name}
                className={classnames(
                  styles.link,
                  isActive("utils", util.name) && styles.active,
                )}
                to={util.path}
              >
                <span>{util.name}</span>
              </Link>
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
