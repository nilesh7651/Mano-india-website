import React from 'react';

export default function Input({ label, type = "text", className = "", variant = "default", error, ...props }) {
    const baseStyles = "w-full px-4 py-2.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-1";

    const variants = {
        default: "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-50 disabled:text-gray-500",
        dark: "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-900 disabled:text-gray-600"
    };

    return (
        <div className="w-full">
            {label && (
                <label className={`block text-sm font-medium mb-1.5 ${variant === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`
          ${baseStyles}
          ${variants[variant]}
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    );
}
