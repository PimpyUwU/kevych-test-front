import { ReactNode } from "react";
import Link from "next/link";
import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={inter.variable}>
        <body className="bg-gray-50 font-sans">
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
                <nav className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-5 px-6">
                    <h1 className="text-3xl font-extrabold mb-4 sm:mb-0">
                        <span className="text-yellow-200">Train</span> Management
                    </h1>
                    <div className="flex space-x-6 text-lg">
                        <Link href="/" className="hover:text-yellow-200 transition duration-200 font-medium">
                            Home
                        </Link>
                        <Link href="/trains" className="hover:text-yellow-200 transition duration-200 font-medium">
                            Trains
                        </Link>
                        <Link href="/stations" className="hover:text-yellow-200 transition duration-200 font-medium">
                            Stations
                        </Link>
                        <Link href="/routes" className="hover:text-yellow-200 transition duration-200 font-medium">
                            Routes
                        </Link>
                        <Link href="/login" className="hover:text-yellow-200 transition duration-200 font-medium">
                            Login
                        </Link>
                        <Link href="/signup" className="hover:text-yellow-200 transition duration-200 font-medium">
                            Signup
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="flex-grow container mx-auto p-6 md:p-8 bg-gray-50">{children}</main>

            <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
                <div className="container mx-auto px-6 text-center">
                    <p className="mb-2">© {new Date().getFullYear()} Train Management System</p>
                    <p className="text-sm">All rights reserved. Built with Next.js and Tailwind CSS.</p>
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}