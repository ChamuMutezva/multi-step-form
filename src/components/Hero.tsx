import React from 'react'

interface HeroProps {
    title: string
    description: string
}

function Hero({ title, description }: Readonly<HeroProps>) {
    return (
        <div className='flex flex-col gap-4' id='hero'>
            <h2 className='text-secondary-foreground text-2xl leading-[1.2] font-bold lg:text-[2rem]'>
                {title}
            </h2>
            <p className='text-accent text-base leading-[1.5]'>
                {description}
            </p>
        </div>
    )
}

export default Hero
