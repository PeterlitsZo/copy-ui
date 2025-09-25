import { useContext, type FC } from "react";
import { Link } from "react-router";
import classnames from "classnames";

import { ThemeContext } from "../ThemeProvider";

import { components } from "./components.codegen";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  active: string;
}

export const Navbar: FC<NavbarProps> = ({ active }) => {
  const theme = useContext(ThemeContext);

  const computedStyles = {
    '--navbar-link-bg-hover': theme.colors.gray['100'],
    '--navbar-link-bg-active': theme.colors.blue['000'],
    '--navbar-link-color-active': theme.colors.blue['900'],
    '--navbar-border-color': theme.colors.gray['200'],
  };

  return (
    <nav className={styles.navbar} style={computedStyles as React.CSSProperties}>
      {components.map(component => (
        <Link
          key={component.name}
          className={classnames(styles.link, component.name === active && styles.active)}
          to={component.path}
        >
          {component.name}
        </Link>
      ))}
    </nav>
  )
}

Navbar.displayName = "Navbar";
