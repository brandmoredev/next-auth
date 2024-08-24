import { ReactNode } from "react";

interface ButtonUIProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonUIProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={
        `px-8
        py-3
        bg-white
        font-semibold
        rounded-lg shadow-md
        hover:bg-blue-100
        focus:outline-none
        focus:ring-2
        focus:ring-blue-300
        transition
        duration-150
        ease-in-out
        flex
        justify-center
        ${className}`
      }
      >
      {children}
    </button>

  )
}

export default Button
