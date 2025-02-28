import { ReactNode } from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";

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
            <Header />
            <main className="flex-grow container mx-auto p-6 md:p-8 bg-gray-50">
                {children}
            </main>
            <Footer />
        </div>
        </body>
        </html>
    );
}