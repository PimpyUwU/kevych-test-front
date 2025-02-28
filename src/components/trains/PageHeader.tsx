import Link from 'next/link';
import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backUrl?: string;
    backText?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
                                                          title,
                                                          subtitle,
                                                          backUrl = '',
                                                          backText = 'Back'
                                                      }) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
                {subtitle && <p className="text-lg text-gray-600 mt-2">{subtitle}</p>}
            </div>
            {backUrl && (
                <Link
                    href={backUrl}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {backText}
                </Link>
            )}
        </div>
    );
};