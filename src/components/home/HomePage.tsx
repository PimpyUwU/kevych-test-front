import FeatureCard from "@/components/home/FeatureCard";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50">
            <div className="max-w-3xl">
                <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">
                    Train Management System
                </h1>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                    This application allows you to manage trains, stations, and routes.
                    Use the menu for navigation and information viewing.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mx-auto">
                    <FeatureCard
                        href="/trains"
                        title="View Trains"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        }
                        gradientFrom="indigo-50"
                        gradientTo="indigo-100"
                        borderColor="border-indigo-100"
                        hoverBorderColor="hover:border-indigo-300"
                    />

                    <FeatureCard
                        href="/stations"
                        title="View Stations"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        }
                        gradientFrom="purple-50"
                        gradientTo="purple-100"
                        borderColor="border-purple-100"
                        hoverBorderColor="hover:border-purple-300"
                    />

                    <FeatureCard
                        href="/routes"
                        title="View Routes"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        }
                        gradientFrom="yellow-50"
                        gradientTo="yellow-100"
                        borderColor="border-yellow-100"
                        hoverBorderColor="hover:border-yellow-300"
                    />
                </div>
            </div>
        </div>
    );
}