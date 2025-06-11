"use client";
import React from "react";
import { PersonalInformation } from "./Step1";

function StepWrapper() {
    const [step, setStep] = React.useState(0);

    const handleNextStep = () => {
        setStep((prevStep) => Math.min(prevStep + 1, 3));
        console.log("Next step:", step);
    };
    return (
        <div className="z-20 bg-[var(--primary)] w-full p-[var(--spacing-300)] rounded">
            <PersonalInformation handleNextStep={handleNextStep} />
        </div>
    );
}

export default StepWrapper;
