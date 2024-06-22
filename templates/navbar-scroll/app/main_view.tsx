// main_view.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import Home from './_main_components/home';
import About from './_main_components/about';
import Portfolio from './_main_components/portfolio';
import Services from './_main_components/services';
import Testimonials from './_main_components/testimonials';

const Where = dynamic(() => import('./_main_components/where'), {
    ssr: false,
});

const components = [
    { id: 'home', component: Home },
    { id: 'portfolio', component: Portfolio },
    { id: 'where', component: Where },
    { id: 'services', component: Services },
    { id: 'testimonials', component: Testimonials },
    { id: 'about', component: About },
];

export default function MainView() {
    const searchParams = useSearchParams();
    const selectedComponent = searchParams.get('component');
    const refs = useRef(components.map(() => React.createRef<HTMLDivElement>()));

    useEffect(() => {
        if (selectedComponent) {
            const index = components.findIndex((item) => item.id === selectedComponent);
            if (index !== -1) {
                refs.current[index].current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
    }, [selectedComponent]);

    return (
        <div className="flex flex-col overflow-y-auto h-full">
            {components.map(({ id, component: Component }, index) => (
                <div key={id} ref={refs.current[index]} className="w-full h-auto bg-neutral-900">
                    <Component />
                </div>
            ))}
        </div>
    );
}
