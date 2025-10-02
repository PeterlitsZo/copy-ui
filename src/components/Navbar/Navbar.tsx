import classnames from "classnames";
import { type FC, useContext } from "react";
import { Link } from "react-router";
import { Tag } from "../Tag";
import { ThemeContext } from "../ThemeProvider";
import { components } from "./components.codegen";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  active: string;
}

export const Navbar: FC<NavbarProps> = ({ active }) => {
  const theme = useContext(ThemeContext);

  const computedStyles = {
    "--navbar-link-bg-hover": theme.colors.gray["100"],
    "--navbar-link-bg-active": theme.colors.blue["000"],
    "--navbar-link-color-active": theme.colors.blue["900"],
    "--navbar-border-color": theme.colors.gray["300"],
    "--navbar-link-color": theme.colors.gray["700"],
  };

  return (
    <nav
      className={styles.navbar}
      style={computedStyles as React.CSSProperties}
    >
      {components.map((component) => (
        <Link
          key={component.name}
          className={classnames(
            styles.link,
            component.name === active && styles.active,
          )}
          to={component.path}
        >
          <span>{component.name}</span>
          {component.wip && (
            <Tag color="red" height="1.25rem">
              WIP
            </Tag>
          )}
        </Link>
      ))}
    </nav>
  );
};

Navbar.displayName = "Navbar";
