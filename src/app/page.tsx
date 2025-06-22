import StepWrapper from "@/components/StepWrapper";
import FormSteps from "@/components/FormSteps";
import React from "react";

export default function Home() {
    return (
        <div
            className="grid  place-items-center
            min-h-screen w-full max-w-[58.75rem] p-4 pb-20 sm:px-[50px] lg:px-0 gap-16  font-[family-name:var(--font-ubuntu)]"
        >
            <main
                className="flex flex-col gap-[32px] row-start-2 items-center sm:flex-row sm:items-stretch sm:px-4
            sm:py-[var(--spacing-200)] sm:bg-primary rounded-2xl w-full"
            >
                <div
                    className="z-10 bg-[url('/assets/images/bg-sidebar-mobile.svg')] bg-no-repeat bg-cover w-full 
                    h-[10.75rem] sm:bg-[url('/assets/images/bg-sidebar-desktop.svg')] pt-8 sm:pt-8 overflow-hidden
                    sm:max-w-[200px] md:max-w-[275px] sm:min-h-[35.5rem] absolute top-0 left-0 sm:h-auto sm:relative sm:flex sm:flex-col 
                    sm:items-center sm:justify-start sm:rounded-2xl"
                >
                    <h1 className="sr-only">Promotional multi steps form</h1>
                    <FormSteps />
                </div>
                <StepWrapper />
            </main>
        </div>
    );
}
