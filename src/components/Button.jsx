import styles from "./button.module.scss";

export function Button({ children, ...props }) {
  return (
    <button {...props} className={styles.container}>
      {children}
    </button>
  );
}
