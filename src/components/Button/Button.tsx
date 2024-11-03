/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type: string;
  bgColor: string;
  textColor: string;
  className: string;
}

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${textColor} ${bgColor}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
