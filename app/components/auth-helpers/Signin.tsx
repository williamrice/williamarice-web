'use client';

import { signIn } from 'next-auth/react';
import React from 'react'

const Signin = () =>
{
    return (
        <button onClick={() => signIn()} className='bg-gray-800 hover:bg-gray-600 rounded-md p-3 mx-1'>
            Sign In
        </button>
    )
}

export default Signin