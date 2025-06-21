import React from "react";

interface HeroProps {
    title: string;
    description: string;
}

function Hero({ title, description }: HeroProps) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold leading-[1.2] text-[hsl(var(--blue-950))]">
                {title}
            </h2>
            <p className="text-base text-[hsl(var(--grey))] leading-[1.5]">
                {description}
            </p>
        </div>
    );
}

export default Hero;
