import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  fullWidth?: boolean;
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  disabled,
  fullWidth,
}: ButtonProps) => {
  return (
    <button className={styles.button} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;