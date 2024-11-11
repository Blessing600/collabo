import React from "react";
import { RiLoader4Fill } from "react-icons/ri";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  label: string;
  secondary?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  color?: string;
  textColor?: string
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  label,
  secondary,
  isLoading,
  icon,
  className,
  color,
  textColor,
}) => {
  if (secondary) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="w-full rounded-lg border border-dark-blue bg-white py-2 text-center text-[14px] text-base text-dark-blue"
      >
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <RiLoader4Fill className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          label
        )}
      </button>
    );
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${disabled ? "bg-gray-300" : color ? color :"bg-dark-blue"} flex w-full items-center justify-center rounded-lg py-[16px] px-[96] text-[15px] ${textColor ? textColor : "text-white"} ${className}`}
    >
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <RiLoader4Fill className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          {icon && <span>{icon}</span>}
          <span>{label}</span>
        </div>
      )}
    </button>
  );
};

export default Button;
