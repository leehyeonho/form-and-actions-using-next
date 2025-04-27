import React, { ChangeEvent } from 'react';

interface SubmitInputProps {
    type: string;
    id: string;
    name: string;
    placeholder: string;
    icon: React.ReactNode;
    errors?: string[];
    minLength?: number,
    maxLength?: number,
    required?: boolean;
}

export function SubmitInput({
    type,
    id,
    name,
    placeholder,
    icon,
    errors,
    minLength = 0,
    maxLength = 100,
    required = true,
}: SubmitInputProps) {
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