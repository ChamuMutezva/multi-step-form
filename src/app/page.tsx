import StepWrapper from '@/components/StepWrapper'
import FormSteps from '@/components/FormSteps'
import React from 'react'

export default function Home() {
    return (
        <div className='grid min-h-screen w-full max-w-[58.75rem] place-items-center
            gap-16 p-4 pb-20 font-[family-name:var(--font-ubuntu)] sm:px-[50px] lg:px-0'>
            <main className='sm:bg-primary row-start-2 flex w-full flex-col items-center
                gap-[32px] rounded-2xl sm:flex-row sm:items-stretch sm:px-4 sm:py-[var(--spacing-200)]'>
                <div className="absolute top-0 left-0 z-10 h-[10.75rem] w-full overflow-hidden
                    bg-[url('/assets/images/bg-sidebar-mobile.svg')] bg-cover bg-no-repeat pt-8
                    sm:relative sm:flex sm:h-auto sm:min-h-[35.5rem] sm:flex-col sm:items-center
                    sm:justify-start sm:rounded-2xl sm:bg-[url('/assets/images/bg-sidebar-desktop.svg')]
                    md:max-w-[200px] lg:max-w-[275px]">
                    <h1 className='sr-only'>
                        Promotional multi steps form
                    </h1>
                    <FormSteps />
                </div>
                <StepWrapper />
            </main>
        </div>
    )
}
