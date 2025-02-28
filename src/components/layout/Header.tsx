import Link from "next/link";

export default function Header() {
    return (
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
    );
}