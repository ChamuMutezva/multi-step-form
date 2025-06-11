import StepWrapper from "@/components/StepWrapper";
import React from "react";

export default function Home() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] place-items-center
            min-h-screen max-w-[56.75rem] p-4 pb-20 gap-16  font-[family-name:var(--font-ubuntu)]"
        >
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start sm:flex-row w-full">
                <div
                    className="z-10 bg-[url('/assets/images/bg-sidebar-mobile.svg')] 
                bg-no-repeat bg-cover w-full h-[10.75rem] sm:bg-[url('/assets/images/bg-sidebar-desktop.svg')] pt-8
                sm:w-[250px] sm:h-[400px] absolute top-0 left-0 sm:relative sm:flex sm:flex-col sm:items-center sm:justify-center"
                >
                    <div className="flex flex-row sm:flex-col items-center justify-center gap-4">
                        <span className="progress-indicator h-8 w-8 flex justify-center items-center bg-amber-100 rounded-full">
                            1
                        </span>
                        <span className="progress-indicator h-8 w-8 flex justify-center items-center bg-amber-100 rounded-full">
                            2
                        </span>
                        <span className="progress-indicator h-8 w-8 flex justify-center items-center bg-amber-100 rounded-full">
                            3
                        </span>
                        <span className="progress-indicator h-8 w-8 flex justify-center items-center bg-amber-100 rounded-full">
                            4
                        </span>
                    </div>
                </div>
                <StepWrapper />
            </main>
        </div>
    );
}
