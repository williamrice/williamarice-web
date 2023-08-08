'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '@/app/lib/utils/tailwind-helpers';

const UserNavBarImageMenu = () =>
{
    const { data: session } = useSession()
    return (
        <>
            {session && (

                <div className="flex items center p-2 rounded-full cursor-pointer">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ">
                                <Image
                                    src={session.user?.image || '/images/blank-profile-picture.png'}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                    alt='user profile image'

                                ></Image>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="/account-settings"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Account settings
                                            </a>
                                        )}
                                    </Menu.Item>



                                    <Menu.Item>
                                        {({ active }) => (
                                            <button

                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block w-full px-4 py-2 text-left text-sm'
                                                )}
                                                onClick={() => signOut()}
                                            >
                                                Sign out
                                            </button>
                                        )}
                                    </Menu.Item>

                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div >
            )}

        </>
    )
}

export default UserNavBarImageMenu