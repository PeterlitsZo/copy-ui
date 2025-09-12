import { useContext } from "react";

import { ThemeContext } from "../ThemeProvider";

import { components } from "./components.codegen";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const theme = useContext(ThemeContext);

  const computedStyles = {
    '--navbar-link-bg-hover': theme.colors.gray['100'],
    '--navbar-border-color': theme.colors.gray['200'],
  };

  return (
    <nav className={styles.navbar} style={computedStyles as React.CSSProperties}>
      {components.map(component => (
        <a className={styles.link} key={component.name} href={component.path}>{component.name}</a>
      ))}
    </nav>
  )
}