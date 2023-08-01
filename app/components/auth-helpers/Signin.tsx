'use client';

import { signIn } from 'next-auth/react';
import React from 'react'

const Signin = () =>
{
    return (
        <button onClick={() => signIn()} className='bg-red-500 rounded-md p-6'>
            SignIn
        </button>
    )
}

export default Signin