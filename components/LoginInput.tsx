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

    console.log(errors);

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
                    className={`
            block w-full rounded-full border-0 py-3 pl-10 pr-3 text-gray-900
            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
            focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
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