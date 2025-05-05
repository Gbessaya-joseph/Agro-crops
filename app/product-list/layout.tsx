'use client';
import { Button } from '@/components/ui/button';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar for Categories */}
            <aside 
                className='flex-none w-1/6 p-4 shadow-md md:block hidden'
            >
                <h3>Categories</h3>
                <ul>
                    <li>Category 1</li>
                    <li>Category 2</li>
                    <li>Category 3</li>
                </ul>
            </aside>
            <Button
                className='w-14 h-14 md:hidden block p-2 rounded-full m-1'
                onClick={() => alert('Menu toggled')}
            >
                <span className='text-2xl'>☰</span>
            {/* This button can be used to toggle the sidebar on mobile */}
            </Button>
            {/* Sidebar for Categories on mobile */}

            {/* Main Content for Products */}
            <main style={{ flex: 1, padding: '1rem' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;