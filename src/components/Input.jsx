import { useId } from "react";
import { IconLockCog } from "@tabler/icons-react";
import { classnames } from "../utils";
import styles from "./input.module.scss";

export function Input({ Icon = IconLockCog, customStyles = [], ...rest }) {
  const id = useId();
  return (
    <div className={classnames(styles.input, ...customStyles)}>
      <label htmlFor={id} className={styles.icon}>
        {<Icon size={22} />}
      </label>
      <input id={id} className={styles.input_form} {...rest} />
    </div>
  );
}

export function TextArea({ customStyles = [], ...props }) {
  return (
    <textarea
      className={classnames(styles.textarea, customStyles)}
      {...props}
    ></textarea>
  );
}
