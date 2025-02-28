import React from 'react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({
                                        value,
                                        onChange,
                                        placeholder = 'Search...',
                                        className = '',
                                    }: SearchInputProps) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full p-2 border rounded-md text-black ${className}`}
        />
    );
}