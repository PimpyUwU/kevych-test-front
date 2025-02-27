import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50">
            <div className="max-w-3xl">
                <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">
                    Train Management System
                </h1>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed ">
                    This application allows you to manage trains, stations, and routes.
                    Use the menu for navigation and information viewing.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mx-auto">
                    <Link href="/trains"
                          className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-indigo-100 hover:border-indigo-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-indigo-100 opacity-30 group-hover:opacity-70 transition-opacity"></div>
                        <div className="relative flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-lg font-bold text-gray-800">View Trains</span>
                        </div>
                    </Link>

                    <Link href="/stations"
                          className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 opacity-30 group-hover:opacity-70 transition-opacity"></div>
                        <div className="relative flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-lg font-bold text-gray-800">View Stations</span>
                        </div>
                    </Link>

                    <Link href="/routes"
                          className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-100 hover:border-yellow-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-yellow-100 opacity-30 group-hover:opacity-70 transition-opacity"></div>
                        <div className="relative flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <span className="text-lg font-bold text-gray-800">View Routes</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}