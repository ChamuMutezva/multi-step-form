'use client'

import { useFormContext } from '../context/Formcontext'

export default function FormSteps() {
    const { currentStep } = useFormContext()

    const steps = [
        { number: 1, title: 'Your Info' },
        { number: 2, title: 'Select Plan' },
        { number: 3, title: 'Add-ons' },
        { number: 4, title: 'Summary' }
    ]

    return (
        <div className='flex flex-row items-center justify-center gap-8 sm:flex-col'>
            {steps.map(step => (
                <div
                    key={step.number}
                    className='flex items-center justify-items-start gap-4 sm:w-full'
                >
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-1 border-inherit text-sm font-bold ${
                            currentStep === step.number
                                ? 'bg-primary-foreground border-primary-foreground text-input'
                                : 'border-white bg-transparent text-white'
                        }`}
                    >
                        {step.number}
                    </div>
                    <div className='hidden flex-col sm:flex'>
                        <span className='text-card-foreground text-xs font-normal uppercase'>
                            Step {step.number}
                        </span>
                        <strong className='text-sm font-bold text-white uppercase'>
                            {step.title}
                        </strong>
                    </div>
                </div>
            ))}
        </div>
    )
}
