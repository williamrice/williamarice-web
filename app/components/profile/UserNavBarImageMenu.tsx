'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

const UserNavBarImageMenu = () =>
{
    const { data: session } = useSession()
    return (
        <>
            {session && (
                <div className="flex items center p-2 rounded-full cursor-pointer">
                    <Image
                        src={session.user?.image || '/images/blank-profile-picture.png'}
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt='user profile image'
                    ></Image>
                </div>
            )}

        </>
    )
}

export default UserNavBarImageMenu