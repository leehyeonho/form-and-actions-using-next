import React, { ChangeEvent } from 'react';

interface LoginInputProps {
    type: string;
    id: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    errors?: string[];
    required?: boolean;
}

export function LoginInput({
    type,
    id,
    name,
    placeholder,
    value,
    onChange,
    icon,
    errors,
    required = true,
}: LoginInputProps) {
    const errorId = `${id}-error`;
    const hasError = errors && errors.length > 0;

    return (
        <>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {React.cloneElement(icon as React.ReactElement)}
                </span>
                <input
                    type={type}
                    id={id}
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    aria-describedby={hasError ? errorId : undefined}
                    className={`block w-full pl-10 px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-twitter
                                ${hasError ? 'ring-red-500 focus:ring-red-500' : ''}
                                `}
                />
            </div>
            {hasError && (
                errors.map(err => (
                    <p id={errorId} className="mt-1 text-xs text-red-600 pl-4">
                        {err}
                    </p>
                ))

            )}
        </>
    );
}