import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

type ButtonStatus = 'main' | 'primary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status: ButtonStatus;
  onClick?: () => void;
}

const Button = ({ status, children, type, onClick, disabled }: ButtonProps) => {
  const matchStatus = () => {
    switch (status) {
      case 'main':
        return styles.main;
      case 'primary':
        return styles.primary;
      default:
        return styles.main;
    }
  };

  return (
    <button
      className={`${styles.btn} ${matchStatus()}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
