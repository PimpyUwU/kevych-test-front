import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export default function Button({
                                   variant = 'primary',
                                   size = 'md',
                                   children,
                                   className = '',
                                   ...props
                               }: ButtonProps) {
    const baseClasses = 'rounded-md font-medium transition-colors';

    const variantClasses = {
        primary: 'bg-orange-500 hover:bg-orange-600 text-white',
        secondary: 'bg-orange-200 hover:bg-orange-300 text-black',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        success: 'bg-green-600 hover:bg-green-700 text-white',
    };

    const sizeClasses = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
