import React from 'react';

export default function Card({ children, className = "", variant = "default", ...props }) {
    const variants = {
        default: "bg-white border-gray-100",
        dark: "bg-gray-900 border-gray-800 text-gray-100"
    };

    return (
        <div
            className={`rounded-xl shadow-sm border p-6 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
