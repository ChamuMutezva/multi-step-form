"use client";

import { useFormContext } from "../context/Formcontext";

export default function FormSteps() {
    const { currentStep } = useFormContext();

    const steps = [
        { number: 1, title: "Your Info" },
        { number: 2, title: "Select Plan" },
        { number: 3, title: "Add-ons" },
        { number: 4, title: "Summary" },
    ];

    return (
        <div className="flex flex-row sm:flex-col items-center justify-center gap-8">
            {steps.map((step) => (
                <div
                    key={step.number}
                    className="flex gap-4 items-center justify-items-start sm:w-full"
                >
                    <div
                        className={`h-8 w-8 flex justify-center items-center border-1 text-sm border-white  rounded-full font-bold
                        ${
                            currentStep === step.number
                                ? "bg-primary-foreground text-input"
                                : "bg-transparent text-white"
                        }`}
                    >
                        {step.number}
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-card-foreground font-normal text-xs uppercase">
                            Step {step.number}
                        </span>
                        <strong className="text-white text-sm font-bold uppercase">
                            {step.title}
                        </strong>
                    </div>
                </div>
            ))}
        </div>
    );
}
