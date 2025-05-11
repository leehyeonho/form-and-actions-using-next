import React from 'react';

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
    value?: string;
    className?: string;
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
    value= "",
    className= "",
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
                    defaultValue={value}
                    required={required}
                    placeholder={placeholder}
                    aria-describedby={hasError ? errorId : undefined}
                    className={`block w-full pl-10 px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-twitter
                                ${hasError ? 'ring-red-500 focus:ring-red-500' : ''}
                                ${className}
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