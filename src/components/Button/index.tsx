import React from "react";
import styles from "./styles.module.scss";

interface IProps {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button = ({ title, onClick = undefined, disabled = false }: IProps) => {
  return (
    <button
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
      className={`${styles.btn} ${disabled ? styles.btn_disabled : ""}`}
    >
      {title}
    </button>
  );
};

export default Button;
