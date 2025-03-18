import { useId, forwardRef, useState } from "react";
import { IconLockCog, IconEye, IconEyeClosed } from "@tabler/icons-react";
import { classnames } from "../utils";
import styles from "./input.module.scss";

export const Input = forwardRef(function Input(
  { Icon = IconLockCog, customStyles = [], label, type, ...rest },
  ref
) {
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const id = useId();

  const toggleOpenPassword = () => {
    setIsOpenPassword(!isOpenPassword);
  };

  return (
    <div className={classnames(styles.input, ...customStyles)}>
      <label htmlFor={id} className={styles.icon}>
        {<Icon size={22} />} {label}
      </label>
      <input
        id={id}
        className={styles.input_form}
        ref={ref}
        type={isOpenPassword ? "text" : type}
        {...rest}
      />
      {type === "password" && (
        <button
          className={styles.icon}
          onClick={toggleOpenPassword}
          type="button"
        >
          {isOpenPassword ? <IconEye /> : <IconEyeClosed />}
        </button>
      )}
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
