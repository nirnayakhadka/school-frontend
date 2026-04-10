import React from "react";
import { type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tw-merge";

function cn(...classes: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(classes));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80 shadow-lg hover:shadow-xl",
        variant === "secondary" &&
          "bg-primary text-white hover:bg-primary/90 active:bg-primary/80 shadow-lg hover:shadow-xl",
        variant === "outline" &&
          "border-2 border-secondary bg-transparent text-secondary hover:bg-secondary/10 active:bg-secondary/20",
        variant === "ghost" &&
          "bg-transparent hover:bg-secondary/10 text-secondary active:bg-secondary/20",
        size === "sm" && "h-10 px-4 py-2 text-sm",
        size === "md" && "h-12 px-6 text-base",
        size === "lg" && "h-14 px-8 text-lg",
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export { Button };
export type { ButtonProps };
