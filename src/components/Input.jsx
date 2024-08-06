import { useId, forwardRef } from "react";
import { IconLockCog } from "@tabler/icons-react";
import { classnames } from "../utils";
import styles from "./input.module.scss";

export const Input = forwardRef(function (
  { Icon = IconLockCog, customStyles = [], ...rest },
  ref
) {
  const id = useId();
  return (
    <div className={classnames(styles.input, ...customStyles)}>
      <label htmlFor={id} className={styles.icon}>
        {<Icon size={22} />}
      </label>
      <input id={id} className={styles.input_form} {...rest} ref={ref} />
    </div>
  );
});

export function TextArea({ customStyles = [], ...props }) {
  return (
    <textarea
      className={classnames(styles.textarea, customStyles)}
      {...props}
    ></textarea>
  );
}
