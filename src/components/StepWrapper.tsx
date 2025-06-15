"use client";
import React from "react";
import { PersonalInformation } from "./Step1";
import { PaymentsPlan } from "./Step2";
import { AddsOn } from "./Step3";
import { FinishingUp } from "./Step4";

function StepWrapper() {
    const [step, setStep] = React.useState(1);

    const handleNextStep = () => {
        setStep((prevStep) => Math.min(prevStep + 1, 4));
        console.log("Next step:", step);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 1));
        console.log("Previous step:", step);
    };

    function renderStep(step: number, handleNextStep: () => void) {
        if (step === 1) {
            return <PersonalInformation handleNextStep={handleNextStep} />;
        } else if (step === 2) {
            return (
                <PaymentsPlan
                    handleNextStep={handleNextStep}
                    handlePreviousStep={handlePreviousStep}
                />
            );
        } else if (step === 3) {
            return <AddsOn handleNextStep={handleNextStep} />;
        } else if (step === 4) {
            return <FinishingUp handleNextStep={handleNextStep} />;
        } else {
            return null; // Or a fallback component/message
        }
    }

    return (
        <div className="z-20 bg-[var(--primary)] w-full h-full px-[var(--spacing-300)] py-[var(--spacing-400)] sm:px-0 sm:py-0 rounded">
            {renderStep(step, handleNextStep)}
        </div>
    );
}

export default StepWrapper;
