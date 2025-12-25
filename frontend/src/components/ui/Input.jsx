import React from 'react';

export default function Input({ label, type = "text", className = "", error, ...props }) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`
          w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900
          placeholder:text-gray-400
          focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500
          transition-all duration-200
          disabled:bg-gray-50 disabled:text-gray-500
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
