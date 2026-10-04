import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "emergency";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-primary text-primary-foreground hover:opacity-90 shadow-xs focus-visible:outline-primary",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-secondary",
      outline:
        "border border-border bg-card text-foreground hover:bg-muted focus-visible:outline-primary",
      ghost:
        "text-foreground hover:bg-muted focus-visible:outline-primary",
      emergency:
        "bg-emergency text-emergency-foreground hover:opacity-90 shadow-xs focus-visible:outline-emergency",
    };

    const sizeStyles = {
      sm: "min-h-[40px] px-3.5 py-1.5 text-xs rounded-md gap-1.5",
      md: "min-h-[44px] px-4 py-2.5 text-sm rounded-md gap-2",
      lg: "min-h-[48px] px-6 py-3 text-base rounded-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
