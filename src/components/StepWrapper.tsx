"use client";
import React from "react";
import { PersonalInformation } from "./Step1";
import { PaymentsPlan } from "./Step2";
import { AddsOn } from "./Step3";
import { FinishingUp } from "./Step4";
import { ThankYou } from "./Step5";
import { useFormContext } from "@/context/Formcontext";

function StepWrapper() {
    const { currentStep } = useFormContext();

    function renderStep() {
        if (currentStep === 1) {
            return <PersonalInformation />;
        } else if (currentStep === 2) {
            return <PaymentsPlan />;
        } else if (currentStep === 3) {
            return <AddsOn />;
        } else if (currentStep === 4) {
            return <FinishingUp />;
        } else if (currentStep === 5) {
            return <ThankYou />;
        } else {
            return <div>Invalid Step</div>;
        }
    }

    return (
        <div className="z-20 bg-[var(--primary)] w-full h-auto px-[var(--spacing-300)] py-[var(--spacing-400)] sm:px-0 sm:py-8 rounded">
            {renderStep()}
        </div>
    );
}

export default StepWrapper;
