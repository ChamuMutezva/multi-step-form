import React from 'react'

interface HeroProps {
    title: string
    description: string
}

function Hero({ title, description }: Readonly<HeroProps>) {
    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl leading-[1.2] font-bold text-[hsl(var(--blue-950))] lg:text-[2rem]'>
                {title}
            </h2>
            <p className='text-base leading-[1.5] text-[hsl(var(--grey))]'>
                {description}
            </p>
        </div>
    )
}

export default Hero
