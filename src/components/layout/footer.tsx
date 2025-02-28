export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
            <div className="container mx-auto px-6 text-center">
                <p className="mb-2">© {new Date().getFullYear()} Train Management System</p>
                <p className="text-sm">All rights reserved. Built with Next.js and Tailwind CSS.</p>
            </div>
        </footer>
    );
}