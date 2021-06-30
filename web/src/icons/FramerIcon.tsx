import React from 'react';

export function FramerIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"/>
        </svg>
    );
}