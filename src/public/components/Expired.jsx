import React from 'react'

export default function Expired() {
    return (
        <div className="fixed z-99 w-full bg-amber-500 text-amber-950 px-4 py-2 text-center text-sm font-semibold tracking-wide shadow-md flex items-center justify-center gap-2 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span>Preview Mode — This website trial has expired</span>
        </div>
    )
}