import React from 'react'
import Image from 'next/image'
import Hero from './Hero'
import { Button } from './ui/button'
import { useFormContext } from '@/context/Formcontext'

export function ThankYou() {
    const { reset } = useFormContext()
    return (
        <div className='flex h-full flex-col items-center justify-center gap-4 p-8 text-center'>
            <Image
                src='/assets/images/icon-thank-you.svg'
                alt='Thank You'
                width={56}
                height={56}
            />
            <Hero
                title='Thank You!'
                description='Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.'
            />
            <Button
                onClick={reset}
                variant='secondary'
                className='bg-secondary cursor-pointer text-[var(--primary)]'
            >
                Back to Home
            </Button>
        </div>
    )
}
