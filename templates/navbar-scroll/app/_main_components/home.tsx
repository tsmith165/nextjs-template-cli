import React from 'react';

export default function Home() {
    return (
        <div className="flex flex-col w-full space-y-4 h-[calc(100dvh-50px)] justify-center items-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary via-secondary_light to-secondary_dark">
                Home
            </h1>
        </div>
    );
}
