import React from "react";
import Image from "next/image";

export function ThankYou() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-full p-8 text-center">
            <Image
                src="/assets/images/icon-thank-you.svg"
                alt="Thank You"
                width={56}
                height={56}
            />

            <h2 className="text-2xl font-bold leading-[1.2] text-[hsl(var(--blue-950))]">
                Thank You!
            </h2>
            <p className="text-base text-[hsl(var(--grey))] leading-[1.5]">
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
            </p>
        </div>
    );
}
