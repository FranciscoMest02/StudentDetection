'use client'

import React from 'react'
import LoginView from '@/app/componentes/LoginView';

function page() {
    return (
            <div className="h-screen grid place-items-center bg-gradient-to-tr from-blue-300 to-indigo-800">
            <LoginView/>
        </div>
    );
}

export default page