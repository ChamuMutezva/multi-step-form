"use client";
import React from "react";
import { PersonalInformation } from "./Step1";
import { PaymentsPlan } from "./Step2";
import { AddsOn } from "./Step3";
import { FinishingUp } from "./Step4";
import { useFormContext } from "@/context/Formcontext";

function StepWrapper() {
    const [step, setStep] = React.useState(1);
    const { currentStep } = useFormContext();

    const handleNextStep = () => {
        setStep((prevStep) => Math.min(prevStep + 1, 4));
        console.log("Next step:", step);
    };

    function renderStep(step: number, handleNextStep: () => void) {
        if (currentStep === 1) {
            return <PersonalInformation />;
        } else if (currentStep === 2) {
            return <PaymentsPlan />;
        } else if (currentStep === 3) {
            return <AddsOn />;
        } else if (currentStep === 4) {
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
