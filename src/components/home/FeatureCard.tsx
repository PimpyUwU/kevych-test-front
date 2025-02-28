import Link from "next/link";
import { ReactNode } from "react";

interface FeatureCardProps {
    href: string;
    title: string;
    icon: ReactNode;
    gradientFrom: string;
    gradientTo: string;
    borderColor: string;
    hoverBorderColor: string;
}

export default function FeatureCard({
                                        href,
                                        title,
                                        icon,
                                        gradientFrom,
                                        gradientTo,
                                        borderColor,
                                        hoverBorderColor,
                                    }: FeatureCardProps) {
    return (
        <Link
            href={href}
            className={`group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${borderColor} ${hoverBorderColor}`}
        >
            <div className={`absolute inset-0 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} opacity-30 group-hover:opacity-70 transition-opacity`}></div>
            <div className="relative flex flex-col items-center">
                {icon}
                <span className="text-lg font-bold text-gray-800">{title}</span>
            </div>
        </Link>
    );
}