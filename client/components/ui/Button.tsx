import React from 'react';
import { motion } from 'motion/react';
import { Loader2, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, icon: Icon, fullWidth, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20',
      secondary: 'bg-primary-light text-primary hover:bg-primary/20',
      outline: 'bg-transparent border border-border text-text-primary hover:bg-bg-tertiary',
      ghost: 'bg-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary',
      danger: 'bg-danger text-white hover:bg-danger/90 shadow-md shadow-danger/20',
      success: 'bg-success text-white hover:bg-success/90 shadow-md shadow-success/20',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    return (
      <motion.button
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        ref={ref as any}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : Icon ? (
          <Icon className={cn('h-4 w-4', children ? 'mr-2' : '')} />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
