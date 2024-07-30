import styles from "./button.module.scss";

export function Button({ children }) {
  return <button className={styles.container}>{children}</button>;
}
