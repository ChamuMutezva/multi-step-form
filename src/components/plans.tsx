import React from "react";
import Image from "next/image";

export const plans = [
    {
        value: "arcade",
        label: "Arcade",
        price: "$90/yr",
        promo: "2 months free",
        icon: (
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
                <Image
                    src="/assets/images/icon-arcade.svg"
                    alt="Arcade Icon"
                    width={40}
                    height={40}
                />
            </span>
        ),
    },
    {
        value: "advanced",
        label: "Advanced",
        price: "$120/yr",
        promo: "2 months free",
        icon: (
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-100">
                <Image
                    src="/assets/images/icon-advanced.svg"
                    alt="Advanced Icon"
                    width={40}
                    height={40}
                />
            </span>
        ),
    },
    {
        value: "pro",
        label: "Pro",
        price: "$150/yr",
        promo: "2 months free",
        icon: (
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100">
                <Image
                    src="/assets/images/icon-pro.svg"
                    alt="Pro Icon"
                    width={40}
                    height={40}
                />
            </span>
        ),
    },
];
