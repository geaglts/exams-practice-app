import { IconLockCog } from "@tabler/icons-react";
import styles from "../styles/input.module.scss";

export function Input({ Icon = IconLockCog, ...rest }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{<Icon size={22} />}</div>
      <input className={styles.input} {...rest} />
    </div>
  );
}
