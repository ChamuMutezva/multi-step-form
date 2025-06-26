import React from 'react'
import Image from 'next/image'

export const plans = [
    {
        value: 'arcade',
        label: 'Arcade',
        monthlyPrice: 9,
        yearlyPrice: 90,
        promo: '2 months free',
        icon: (
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-100'>
                <Image
                    src='/assets/images/icon-arcade.svg'
                    alt='Arcade Icon'
                    width={40}
                    height={40}
                />
            </span>
        )
    },
    {
        value: 'advanced',
        label: 'Advanced',
        monthlyPrice: 12,
        yearlyPrice: 120,
        promo: '2 months free',
        icon: (
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-100'>
                <Image
                    src='/assets/images/icon-advanced.svg'
                    alt='Advanced Icon'
                    width={40}
                    height={40}
                />
            </span>
        )
    },
    {
        value: 'pro',
        label: 'Pro',
        monthlyPrice: 15,
        yearlyPrice: 150,
        promo: '2 months free',
        icon: (
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100'>
                <Image
                    src='/assets/images/icon-pro.svg'
                    alt='Pro Icon'
                    width={40}
                    height={40}
                />
            </span>
        )
    }
]
